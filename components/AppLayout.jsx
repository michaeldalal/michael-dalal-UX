import { useState } from 'react';
import ShellTopBar from './ShellTopBar.jsx';
import Sidebar from './Sidebar.jsx';
import TopbarNavigation from './TopbarNavigation.jsx';
import AIPanel from './AIPanel.jsx';

export default function AppLayout({
  activeSidebar,
  breadcrumb,
  breadcrumbParts,
  bodyClassName = 'deployed-dashboard',
  shellWrapperClass = 'app-shell',
  aiSuggestions,
  children,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // Apply body class once on mount
  if (typeof document !== 'undefined' && bodyClassName) {
    document.body.className = bodyClassName;
  }

  return (
    <>
      <ShellTopBar />
      <div className="body-container">
        <div className={`content-wrapper${aiOpen ? ' ai-open' : ''}`}>
          <div className="app-container">
            <div className={shellWrapperClass}>
              <Sidebar active={activeSidebar} collapsed={sidebarCollapsed} />
              <div className="main-content">
                <TopbarNavigation
                  breadcrumb={breadcrumb}
                  breadcrumbParts={breadcrumbParts}
                  onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
                  onAskAI={() => setAiOpen((v) => !v)}
                />
                {children}
              </div>
              <AIPanel
                open={aiOpen}
                onClose={() => setAiOpen(false)}
                suggestions={aiSuggestions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
