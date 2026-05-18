import './auto-insight.css';

const AGENTS = [
  { title: 'get_transaction_detail', description: 'Retrieves and explains line-item bills, rate plans, and billing cycle details.', tools: '4 Tools', tag: 'Top' },
  { title: 'Billing Summary', description: 'Summarizes recent payments, outstanding balances, and recurring charges.', tools: '3 Tools', tag: 'Latest' },
  { title: 'Plan Recommendations', description: 'Suggests rate plan improvements and cost-saving options.', tools: '5 Tools', tag: 'Smart' },
];

export default function AutoInsight() {
  return (
    <div className="auto-insight-page">
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-icon">A</div>
            <div className="brand-title">Auto Insight</div>
          </div>

          <input className="search-box" type="search" placeholder="Search" aria-label="Search sidebar" />

          <div className="menu-group">
            <div className="menu-item active">Explore</div>
          </div>

          <div className="menu-group">
            <div className="menu-heading">Actions</div>
            <a className="menu-item" href="#">Action One</a>
            <a className="menu-item" href="#">Action Two</a>
          </div>

          <div className="menu-group">
            <div className="menu-heading">Dashboards</div>
            <a className="menu-item" href="#">Pinned</a>
            <a className="menu-item" href="#">Observability</a>
            <a className="menu-item" href="#">Saved</a>
          </div>

          <div className="footer-card">
            <div className="footer-title">Contact</div>
            <div className="footer-line">Alice</div>
            <div className="footer-line">alice@example.com</div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="breadcrumb">
              <span>Automation Opportunities</span>
              <span>&gt;</span>
              <span>New AI Agent</span>
            </div>
            <button type="button" className="action-button">Ask AI Assistant</button>
          </div>

          <section className="panel">
            <div className="panel-title">Intent: Billing & Payment Inquiries</div>

            <div className="meta-row">
              <div>Created By: <strong>Michael Dalal</strong></div>
              <div>Creation Date: <strong>Oct 30, 2025 4:24 PM</strong></div>
              <div className="meta-badge">Draft</div>
            </div>

            <div className="field-row">
              <div className="field-card">
                <label className="field-label">AI Agent Name</label>
                <div className="field-value">Ava Smith</div>
              </div>
              <div className="field-card">
                <label className="field-label">Job Description</label>
                <div className="field-value">Retrieves and explains line-item bills, rate plans, and billing cycle details.</div>
              </div>
            </div>

            <button type="button" className="field-button">Save Agent</button>
          </section>

          <section className="panel" style={{ marginTop: 24 }}>
            <div className="panel-title">AI Tools</div>
            <div className="grid-cards">
              {AGENTS.map((agent, i) => (
                <article key={i} className="agent-card">
                  <div>
                    <div className="agent-title">{agent.title}</div>
                    <p className="agent-description">{agent.description}</p>
                  </div>
                  <div className="agent-meta">
                    <span>{agent.tools}</span>
                    <span>{agent.tag}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
