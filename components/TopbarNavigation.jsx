import { Link } from 'react-router-dom';
import { SidebarToggleIcon, SparklesIcon, ChevronRightIcon } from './icons.jsx';

export default function TopbarNavigation({
  breadcrumb,
  breadcrumbParts,
  onToggleSidebar,
  onAskAI,
  showSpacer = true,
}) {
  return (
    <div className="topbar-navigation">
      <button
        type="button"
        className="topbar-back-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <SidebarToggleIcon />
      </button>
      <div className="topbar-breadcrumb">
        {breadcrumbParts ? (
          breadcrumbParts.map((part, i) => {
            const isLast = i === breadcrumbParts.length - 1;
            return (
              <span key={i}>
                {part.to && !isLast ? (
                  <Link to={part.to} className="breadcrumb-link">
                    {part.label}
                  </Link>
                ) : isLast ? (
                  <span className="breadcrumb-current">{part.label}</span>
                ) : (
                  part.label
                )}
                {!isLast && <ChevronRightIcon className="breadcrumb-separator" />}
              </span>
            );
          })
        ) : (
          breadcrumb
        )}
      </div>
      {showSpacer && <div className="topbar-spacer" />}
      <button type="button" className="topbar-ask-ai-btn" onClick={onAskAI}>
        <SparklesIcon />
        Ask AI
      </button>
    </div>
  );
}
