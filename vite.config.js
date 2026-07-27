import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mock backend for the Actions page's live KPI row — a real, addressable
// HTTP endpoint backed by server-owned state that mutates on its own timer
// (agent status flips, realized-value accrual, ahead/behind pace shifts).
// The client only ever polls and renders what this returns; it never
// generates any of these numbers itself. This is a stand-in for a real
// metrics service — swap the tick()/state logic for a real data source
// (or point the client at a real API) without touching the client's
// polling/rendering code.
function actionsMetricsMock() {
  const HISTORY_LEN = 20;
  const TICK_MS = 3000;

  // Seeded from the same totals Actions-history-P2.html computes from its
  // own allRows dataset (41 agents / 24 live / 17 draft / 17 actions), so
  // the live feed starts in sync with the static numbers already on screen.
  // hoursRun seeds a plausible existing runtime for agents already live
  // (deterministic from index, not random) — draft agents haven't run yet.
  const agents = [
    ...Array.from({ length: 24 }, (_, i) => ({ status: 'live', hoursRun: 40 + ((i * 17) % 200) })),
    ...Array.from({ length: 17 }, () => ({ status: 'draft', hoursRun: 0 })),
  ];

  function dayKey(date) { return date.toISOString().slice(0, 10); }
  function totalHoursRun() { return agents.reduce((s, a) => s + a.hoursRun, 0); }

  // Daily snapshot for the "+X today" delta — captured once, real, against
  // this server process's own start time. It resets automatically the
  // first time a day boundary is crossed while the server keeps running.
  // (There's no durable store here, so a server restart re-baselines the
  // day — same limitation as the rest of this in-memory mock state.)
  const dailySnapshot = { day: dayKey(new Date()), hoursAtStart: totalHoursRun() };
  function rolloverDailySnapshotIfNeeded() {
    const today = dayKey(new Date());
    if (today !== dailySnapshot.day) {
      dailySnapshot.day = today;
      dailySnapshot.hoursAtStart = totalHoursRun();
    }
  }

  const actions = Array.from({ length: 17 }, (_, i) => {
    const projected = 45000 + Math.round(((i * 37) % 11) * 18000);
    return {
      id: i,
      projected,
      realized: Math.round(projected * (0.2 + ((i * 53) % 10) / 20)),
      daysTracked: 20 + ((i * 29) % 300),
    };
  });

  function paceIsAhead(action) {
    const pct = action.projected ? (action.realized / action.projected) * 100 : 0;
    if (pct >= 100) return true;
    const expectedPace = action.daysTracked / 365;
    const ratio = expectedPace > 0 ? (pct / 100) / expectedPace : 1;
    return ratio > 1.05;
  }

  function snapshot() {
    rolloverDailySnapshotIfNeeded();
    const totalAgents = agents.length;
    const liveAgents = agents.filter((a) => a.status === 'live').length;
    const totalProjected = actions.reduce((s, a) => s + a.projected, 0);
    const totalRealized = actions.reduce((s, a) => s + a.realized, 0);
    const aheadCount = actions.filter(paceIsAhead).length;
    const totalHours = totalHoursRun();
    return {
      totalAgents,
      liveAgents,
      draftAgents: totalAgents - liveAgents,
      totalActions: actions.length,
      totalRealized: Math.round(totalRealized),
      totalProjected: Math.round(totalProjected),
      aheadCount,
      behindCount: actions.length - aheadCount,
      totalHours: Math.round(totalHours),
      hoursDeltaToday: Math.round(totalHours - dailySnapshot.hoursAtStart),
    };
  }

  const history = { agents: [], liveDraft: [], realized: [], ahead: [] };
  for (let i = 0; i < HISTORY_LEN; i++) {
    history.agents.push(0);
    history.liveDraft.push(0);
    history.realized.push(0);
    history.ahead.push(0);
  }
  function pushHistory(key, value) {
    history[key].push(value);
    if (history[key].length > HISTORY_LEN) history[key].shift();
  }

  function tick() {
    const before = snapshot();
    let agentEvent = 0;
    let realizedEvent = 0;

    // Real-money accrual on a random live action — the dominant, most
    // frequent event, same as automations continuously banking savings.
    if (Math.random() < 0.75) {
      const candidates = actions.filter((a) => a.realized < a.projected * 1.2);
      if (candidates.length) {
        const a = candidates[Math.floor(Math.random() * candidates.length)];
        const delta = Math.round(a.projected * (0.001 + Math.random() * 0.004));
        a.realized += delta;
        realizedEvent = delta;
      }
    }

    // Occasional agent status flip (draft promoted to live, or rolled back).
    if (Math.random() < 0.2 && agents.length) {
      const idx = Math.floor(Math.random() * agents.length);
      agents[idx].status = agents[idx].status === 'live' ? 'draft' : 'live';
      agentEvent = 1;
    }

    // Time marches on — lets an action's pace classification actually
    // drift (an action can fall behind again, not just catch up).
    actions.forEach((a) => { a.daysTracked += TICK_MS / 86400000; });

    // Every currently-live agent has genuinely been running for this whole
    // tick — not a probabilistic event, deterministic for every agent that's
    // live right now. Paced for demo visibility (same accelerated-demo pace
    // as the $ realized-value accrual above), not literal wall-clock hours.
    const HOURS_PER_TICK_PER_LIVE_AGENT = 0.05;
    agents.forEach((a) => { if (a.status === 'live') a.hoursRun += HOURS_PER_TICK_PER_LIVE_AGENT; });

    const after = snapshot();
    const aheadEvent = after.aheadCount !== before.aheadCount ? 1 : 0;

    pushHistory('agents', agentEvent);
    pushHistory('liveDraft', agentEvent);
    pushHistory('realized', realizedEvent);
    pushHistory('ahead', aheadEvent);
  }

  let timer = null;

  return {
    name: 'actions-metrics-mock',
    configureServer(server) {
      timer = setInterval(tick, TICK_MS);
      server.httpServer?.once('close', () => clearInterval(timer));
      server.middlewares.use('/api/actions-metrics', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify({ ...snapshot(), history }));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), actionsMetricsMock()],
  server: { port: 5173, open: true },
});
