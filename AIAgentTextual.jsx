import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import Badge from './components/Badge.jsx';
import { SparklesIcon, ChevronDownIcon, ChevronUpIcon } from './components/icons.jsx';

const NAV = {
  agentDetails: [{ id: 'agent-overview', label: 'Agent Overview' }],
  skills: [
    { id: 'skill-routing', label: 'Routing AI Agent' },
    { id: 'skill-charge-refund', label: 'Charge & Refund Specialist' },
    { id: 'skill-payment-arrangement', label: 'Payment Arrangement Agent' },
    { id: 'skill-invoice-statement', label: 'Invoice & Statement Agent' },
  ],
};

const SKILL_INITIAL = {
  name: 'charge-dispute',
  description: 'Investigates disputed charges, validates transactions, initiates refunds.',
  instruction:
    'Use this skill when a customer disputes a charge or requests a refund. Validate the charge before initiating any refund or dispute process.',
};

const TOOLS_INITIAL = [
  {
    name: 'validate_charge',
    description: 'Cross-references a disputed charge against transaction records to determine its legitimacy.',
    params: [
      { name: 'accountNumber', desc: 'Customer’s unique account identifier' },
      { name: 'chargeId', desc: 'Start of the billing period to retrieve' },
      { name: 'refundAmount', desc: 'End of the billing period to retrieve' },
    ],
    open: true,
  },
  {
    name: 'initiate_refund',
    description: 'Submits a refund request to the payment gateway for an approved credit back to the customer.',
    params: [
      { name: 'accountNumber', desc: 'Customer’s unique account identifier' },
      { name: 'refundAmount', desc: 'Amount to refund to the customer' },
      { name: 'reason', desc: 'Reason code for the refund' },
    ],
    open: false,
  },
  {
    name: 'submit_dispute_case',
    description: 'Opens a formal dispute case in the billing system and assigns it a case number for tracking.',
    params: [
      { name: 'customerId', desc: 'Customer record identifier' },
      { name: 'chargeId', desc: 'ID of the disputed charge' },
      { name: 'caseNotes', desc: 'Free-text notes describing the dispute' },
    ],
    open: false,
  },
];

function CharCounter({ value, max }) {
  return (
    <div className="textual-counter">
      <span className="textual-chars">{value.length} characters</span>
      <span className="textual-remaining">{Math.max(0, max - value.length)} remaining</span>
    </div>
  );
}

function ToolCard({ index, tool, onChange }) {
  return (
    <section className="textual-card">
      <div className="textual-card-header">
        <h2 className="textual-card-title">Tools {index + 1}:</h2>
        <button type="button" className="textual-card-action" aria-label="AI assist">
          <SparklesIcon />
        </button>
      </div>
      <div className="textual-card-body">
        <div className="textual-field">
          <label className="textual-label">Tool Name:</label>
          <input
            className="textual-input"
            type="text"
            value={tool.name}
            onChange={(e) => onChange({ ...tool, name: e.target.value })}
          />
        </div>
        <div className="textual-field">
          <label className="textual-label">Tool Description:</label>
          <textarea
            className="textual-input textual-textarea"
            rows={3}
            maxLength={300}
            value={tool.description}
            onChange={(e) => onChange({ ...tool, description: e.target.value })}
          />
          <CharCounter value={tool.description} max={300} />
        </div>
        <div className="textual-params" data-open={tool.open ? 'true' : 'false'}>
          {tool.open && (
            <div className="textual-params-table">
              <div className="textual-params-header">
                <span>Parameter Name</span>
                <span>Description</span>
              </div>
              {tool.params.map((param, i) => (
                <div key={i} className="textual-param-row">
                  <input
                    className="textual-input"
                    type="text"
                    value={param.name}
                    onChange={(e) => {
                      const next = [...tool.params];
                      next[i] = { ...param, name: e.target.value };
                      onChange({ ...tool, params: next });
                    }}
                  />
                  <input
                    className="textual-input"
                    type="text"
                    value={param.desc}
                    onChange={(e) => {
                      const next = [...tool.params];
                      next[i] = { ...param, desc: e.target.value };
                      onChange({ ...tool, params: next });
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            className="textual-params-toggle"
            onClick={() => onChange({ ...tool, open: !tool.open })}
          >
            {tool.open ? <ChevronUpIcon className="textual-params-chevron" /> : <ChevronDownIcon className="textual-params-chevron" />}
            <span className="textual-params-toggle-text">
              {tool.open ? 'Hide' : 'View'} Parameters ({tool.params.length})
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function AIAgentTextual() {
  const [skill, setSkill] = useState(SKILL_INITIAL);
  const [tools, setTools] = useState(TOOLS_INITIAL);
  const [activeNav, setActiveNav] = useState('skill-charge-refund');

  const initial = useMemo(() => ({ skill: SKILL_INITIAL, tools: TOOLS_INITIAL }), []);
  const dirty =
    JSON.stringify(skill) !== JSON.stringify(initial.skill) ||
    JSON.stringify(tools) !== JSON.stringify(initial.tools);

  return (
    <AppLayout activeSidebar="ai-agent" breadcrumb="Ava Smith › Textual View">
      <section className="sticky-section">
        <div className="section-title-row">
          <h1 className="section-title">Intent: Billing &amp; Payment Inquiries</h1>
          <div className="textual-header-actions">
            <button
              type="button"
              className="settings-cancel-btn"
              disabled={!dirty}
              onClick={() => {
                setSkill(SKILL_INITIAL);
                setTools(TOOLS_INITIAL);
              }}
            >
              Cancel
            </button>
            <button type="button" className="settings-save-btn" disabled={!dirty}>
              Save
            </button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Project Name:</label>
            <select className="form-select">
              <option>Project Alpha</option>
            </select>
          </div>
          <button type="button" className="publish-btn">Publish AI Agent</button>
        </div>

        <div className="metadata-row">
          <div className="metadata-group">
            <div className="metadata-item">
              <span className="metadata-label">Created By:</span>
              <span className="metadata-value">Michael Ofeal</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Creation Date:</span>
              <span className="metadata-value">Oct 30, 2025, 4:29 PM</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Status:</span>
              <Badge variant="draft">Draft</Badge>
            </div>
          </div>
          <div className="button-group">
            <button type="button" className="button-group-item active">Textual View</button>
            <Link to="/ai-agent" className="button-group-item">Flow View</Link>
          </div>
        </div>
      </section>

      <div className="textual-area">
        <div className="textual-layout">
          <aside className="textual-nav">
            <div className="textual-nav-group">
              <div className="textual-nav-title">Agent Details</div>
              {NAV.agentDetails.map((item) => (
                <a
                  key={item.id}
                  className={`textual-nav-item${activeNav === item.id ? ' active' : ''}`}
                  href={`#${item.id}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="textual-nav-group">
              <div className="textual-nav-title">Skills</div>
              {NAV.skills.map((item) => (
                <a
                  key={item.id}
                  className={`textual-nav-item${activeNav === item.id ? ' active' : ''}`}
                  href={`#${item.id}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </aside>

          <div className="textual-content">
            <section className="textual-card" id="skill-charge-refund">
              <div className="textual-card-header">
                <h2 className="textual-card-title">Skill</h2>
                <button type="button" className="textual-card-action" aria-label="AI assist">
                  <SparklesIcon />
                </button>
              </div>
              <div className="textual-card-body">
                <div className="textual-field">
                  <label className="textual-label" htmlFor="t-skill-name">Skill Name:</label>
                  <input
                    className="textual-input"
                    id="t-skill-name"
                    type="text"
                    value={skill.name}
                    onChange={(e) => setSkill({ ...skill, name: e.target.value })}
                  />
                  <p className="textual-helper">Must contain only lowercase alphanumeric characters and hyphens</p>
                </div>
                <div className="textual-field">
                  <label className="textual-label" htmlFor="t-skill-desc">Description</label>
                  <textarea
                    className="textual-input textual-textarea"
                    id="t-skill-desc"
                    rows={3}
                    maxLength={300}
                    value={skill.description}
                    onChange={(e) => setSkill({ ...skill, description: e.target.value })}
                  />
                  <CharCounter value={skill.description} max={300} />
                </div>
                <div className="textual-field">
                  <label className="textual-label" htmlFor="t-skill-instruction">Instruction</label>
                  <textarea
                    className="textual-input textual-textarea"
                    id="t-skill-instruction"
                    rows={3}
                    maxLength={300}
                    value={skill.instruction}
                    onChange={(e) => setSkill({ ...skill, instruction: e.target.value })}
                  />
                  <CharCounter value={skill.instruction} max={300} />
                </div>
              </div>
            </section>

            {tools.map((tool, i) => (
              <ToolCard
                key={i}
                index={i}
                tool={tool}
                onChange={(next) => {
                  const updated = [...tools];
                  updated[i] = next;
                  setTools(updated);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
