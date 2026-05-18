import { useEffect, useRef } from 'react';
import './nba-dashboard.css';

const CHAMPIONS = [
  { year: 2024, team: 'Boston Celtics', coach: 'Joe Mazzulla', wins: 4, losses: 1 },
  { year: 2023, team: 'Denver Nuggets', coach: 'Michael Malone', wins: 4, losses: 1 },
  { year: 2022, team: 'Golden State Warriors', coach: 'Steve Kerr', wins: 4, losses: 2 },
  { year: 2021, team: 'Milwaukee Bucks', coach: 'Mike Budenholzer', wins: 4, losses: 2 },
  { year: 2020, team: 'Los Angeles Lakers', coach: 'Frank Vogel', wins: 4, losses: 2 },
  { year: 2019, team: 'Toronto Raptors', coach: 'Nick Nurse', wins: 4, losses: 2 },
];

export default function NBADashboard() {
  const winsChartRef = useRef(null);
  const winsChartInstance = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.Chart || !winsChartRef.current) return;
    if (winsChartInstance.current) winsChartInstance.current.destroy();
    winsChartInstance.current = new window.Chart(winsChartRef.current, {
      type: 'bar',
      data: {
        labels: CHAMPIONS.map((c) => c.year),
        datasets: [{
          label: 'Finals Wins',
          data: CHAMPIONS.map((c) => c.wins),
          backgroundColor: '#9a6e00',
        }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
    return () => winsChartInstance.current?.destroy();
  }, []);

  return (
    <div className="nba-dashboard">
      <header>
        <span className="trophy" role="img" aria-label="trophy">🏆</span>
        <div>
          <h1>NBA Champions Dashboard</h1>
          <p>Browse recent NBA championship results</p>
        </div>
      </header>
      <main>
        <div className="stat-strip">
          <div className="stat-card"><div className="val">{CHAMPIONS.length}</div><div className="lbl">Recent Seasons</div></div>
          <div className="stat-card"><div className="val">{new Set(CHAMPIONS.map((c) => c.team)).size}</div><div className="lbl">Unique Champions</div></div>
          <div className="stat-card"><div className="val">{CHAMPIONS[0].year}</div><div className="lbl">Latest Title</div></div>
        </div>

        <div className="grid-2">
          <section className="panel">
            <h2>Finals Wins by Year</h2>
            <div className="chart-wrap">
              <canvas ref={winsChartRef} />
            </div>
          </section>
          <section className="panel">
            <h2>Champions</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Year</th><th>Team</th><th>Coach</th><th>W–L</th>
                  </tr>
                </thead>
                <tbody>
                  {CHAMPIONS.map((c) => (
                    <tr key={c.year}>
                      <td>{c.year}</td>
                      <td>{c.team}</td>
                      <td>{c.coach}</td>
                      <td>{c.wins}–{c.losses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
