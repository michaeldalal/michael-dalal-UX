import { Routes, Route, Navigate } from 'react-router-dom';
import AutomationOpportunities from './AutomationOpportunities.jsx';
import ActionsHistory from './ActionsHistory.jsx';
import AIAgent from './AIAgent.jsx';
import AIAgentTextual from './AIAgentTextual.jsx';
import AutoInsight from './AutoInsight.jsx';
import Settings from './Settings.jsx';
import NBADashboard from './NBADashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/automation-opportunities" replace />} />
      <Route path="/automation-opportunities" element={<AutomationOpportunities />} />
      <Route path="/actions-history" element={<ActionsHistory />} />
      <Route path="/ai-agent" element={<AIAgent />} />
      <Route path="/ai-agent-textual" element={<AIAgentTextual />} />
      <Route path="/auto-insight" element={<AutoInsight />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/nba-dashboard" element={<NBADashboard />} />
    </Routes>
  );
}
