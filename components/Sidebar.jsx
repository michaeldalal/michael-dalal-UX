import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  OpportunitiesIcon,
  AgentIcon,
  HeadphonesIcon,
  HistoryIcon,
  BookmarkIcon,
  FolderIcon,
  ClockIcon,
  PlusIcon,
} from './icons.jsx';

function SidebarItem({ icon: Icon, label, active, to, onClick, chevron }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) navigate(to);
    if (onClick) onClick();
  };
  return (
    <button
      type="button"
      className={`sidebar-item${active ? ' active' : ''}`}
      onClick={handleClick}
    >
      <Icon className="sidebar-item-icon" />
      <span className="sidebar-item-label">{label}</span>
      {chevron && <PlusIcon className="sidebar-item-chevron" />}
    </button>
  );
}

export default function Sidebar({ active, collapsed = false }) {
  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <SidebarItem icon={HomeIcon} label="New Session" />
      <SidebarItem
        icon={OpportunitiesIcon}
        label="Automation Opportunities"
        active={active === 'opportunities'}
        to="/automation-opportunities"
      />
      <SidebarItem
        icon={AgentIcon}
        label="AI Agent"
        active={active === 'ai-agent'}
        to="/ai-agent"
      />
      <SidebarItem icon={HeadphonesIcon} label="Agent" />
      <SidebarItem
        icon={HistoryIcon}
        label="Action History"
        active={active === 'history'}
        to="/actions-history"
      />

      <div className="sidebar-section">
        <SidebarItem icon={BookmarkIcon} label="Saved Dashboards" chevron />
        <div className="sidebar-nested">
          <button type="button" className="sidebar-nested-item">
            <FolderIcon className="sidebar-item-icon" />
            Customer Support Anal&hellip;
          </button>
          <div className="sidebar-nested">
            <button type="button" className="sidebar-nested-item">
              Customer Support Det&hellip;
            </button>
          </div>
          <button type="button" className="sidebar-nested-item">
            <FolderIcon className="sidebar-item-icon" />
            Product Insights
          </button>
          <button type="button" className="sidebar-nested-item">
            Weekly KPI Summary
          </button>
          <button type="button" className="sidebar-nested-item">
            Quarterly Board Deck Metrics
          </button>
          <button type="button" className="sidebar-nested-item">
            Monthly Business Review
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <SidebarItem icon={ClockIcon} label="Recent" />
        <div className="sidebar-nested">
          <button type="button" className="sidebar-nested-item">
            Why are users dropping off a&hellip;
          </button>
          <button type="button" className="sidebar-nested-item">
            Agent escalation trends this&hellip;
          </button>
          <button type="button" className="sidebar-nested-item">
            Knowledge Performance
          </button>
        </div>
      </div>
    </aside>
  );
}

export { SidebarItem };
