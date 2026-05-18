import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import Badge from './components/Badge.jsx';
import StatPill from './components/StatPill.jsx';
import IconButton from './components/IconButton.jsx';
import { EditIcon, ChevronDownIcon, PlusIcon, SkillIcon } from './components/icons.jsx';

const SKILLS = [
  {
    title: 'Charge Dispute & Refund',
    descriptions: [
      'Handles billing questions, invoice retrieval, and charge explanations.',
      'When a customer asks about their bill, charges, or statements, invoke this skill. Always verify the account before accessing…',
    ],
    toolsLabel: '4 Tools',
    tools: [
      { name: 'validate_charge', desc: 'Validates a charged transaction against the customer account.', params: 3 },
      { name: 'fetch_invoice', desc: 'Retrieves an invoice or statement by ID for review.', params: 2 },
      { name: 'open_dispute', desc: 'Opens a formal dispute case for a contested charge.', params: 4 },
      { name: 'log_refund', desc: 'Records a refund decision against the disputed charge.', params: 3 },
    ],
  },
  {
    title: 'charge-dispute',
    descriptions: [
      'Investigates disputed charges, validates transactions, initiates refunds.',
      'Use this skill when a customer disputes a charge or requests a refund. Validate the charge before initiating any refund or disput…',
    ],
    toolsLabel: '3 Tools',
    tools: [
      { name: 'validate_charge', desc: 'Validates a charged transaction against the customer account.', params: 3 },
      { name: 'open_dispute', desc: 'Opens a formal dispute case for a contested charge.', params: 4 },
      { name: 'log_refund', desc: 'Records a refund decision against the disputed charge.', params: 3 },
    ],
  },
  {
    title: 'payment-arrangement',
    descriptions: [
      'Creates and modifies instalment plans for customers who cannot pay in full.',
      'Invoke this skill when a customer cannot pay the full balance and requests a payment plan. Offer flexible instalment options based on th…',
    ],
    toolsLabel: '3 Tools',
    tools: [
      { name: 'get_billing_history', desc: 'Creates and modifies instalment plans for customers who cannot pay in full.', params: 3 },
      { name: 'get_billing_history', desc: 'Retrieves all charges, credits, and payments for a customer account within a date range.', params: 3 },
      { name: 'get_billing_history', desc: 'Retrieves all charges, credits, and payments for a customer account within a date range.', params: 3 },
    ],
  },
  {
    title: 'refund-processing',
    descriptions: [
      'Processes approved refunds, tracks status, and updates account credits.',
      'Use this skill to process approved refunds. Ensure a dispute case has been opened and authorised before calling process_refund.',
    ],
    toolsLabel: '1 Tools',
    tools: [
      { name: 'process_refund', desc: 'Processes an approved refund against the original transaction.', params: 1 },
    ],
  },
];

const ToolIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <path d="M22 14.34V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4.66" />
    <path d="M22 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2" />
    <path d="M2 13h20" />
    <path d="M14 13a2 2 0 0 1-4 0" />
    <path d="M9 7V3h6v4" />
  </svg>
);

function ToolCard({ tool }) {
  return (
    <div className="agent-column">
      <div className="connector-line" />
      <div className="agent-card-small tool">
        <div className="agent-card-view">
          <div className="agent-card-header">
            <span className="skill-avatar" aria-hidden>
              <ToolIcon />
            </span>
            <div className="agent-info">
              <div className="agent-title-row">
                <h4 className="agent-title">{tool.name}</h4>
                <button type="button" className="edit-btn" aria-label="Edit tool" style={{ width: 24, height: 24 }}>
                  <EditIcon />
                </button>
              </div>
              <Badge variant="success">Tool</Badge>
            </div>
          </div>
          <p className="agent-description">{tool.desc}</p>
          <div className="agent-stats">
            <StatPill>{tool.params} params</StatPill>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill, active, onClick }) {
  return (
    <div className="agent-column">
      <div className="connector-line" />
      <div
        className={`agent-card-small skill-card${active ? ' is-active' : ''}`}
        onClick={onClick}
      >
        <div className="agent-card-view">
          <div className="agent-card-header">
            <span className="skill-avatar" aria-hidden>
              <SkillIcon />
            </span>
            <div className="agent-info">
              <div className="agent-title-row">
                <h4 className="agent-title">{skill.title}</h4>
                <button
                  type="button"
                  className="edit-btn"
                  aria-label="Edit skill"
                  style={{ width: 24, height: 24 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <EditIcon />
                </button>
              </div>
              <Badge variant="warning">Skill</Badge>
            </div>
          </div>
          {skill.descriptions.map((d, i) => (
            <p key={i} className="agent-description">{d}</p>
          ))}
          <div className="agent-stats">
            <StatPill>{skill.toolsLabel}</StatPill>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIAgent() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [zoom, setZoom] = useState(100);

  const ZOOM_MIN = 20;
  const ZOOM_MAX = 200;
  const ZOOM_STEP = 10;

  const adjustZoom = (delta) => setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z + delta)));

  const activeTools = activeSkill != null ? SKILLS[activeSkill].tools : [];

  return (
    <AppLayout activeSidebar="ai-agent" breadcrumb="Automation Opportunities">
      <section className="sticky-section">
        <h1 className="section-title">Intent: Billing &amp; Payment Inquiries</h1>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Project Name:</label>
            <select className="form-select">
              <option>Project Alpha</option>
            </select>
          </div>
          <button type="button" className="publish-btn">Publish to Cognigy AI</button>
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
            <Link to="/ai-agent-textual" className="button-group-item">Textual View</Link>
            <button type="button" className="button-group-item active">Flow View</button>
          </div>
        </div>
      </section>

      <section className="screen-content">
        <div className="flow-fullscreen-header">
          <h2 className="flow-fullscreen-title">Intent: Billing &amp; Payment Inquiries</h2>
        </div>
        <div className="flow-controls">
          <button
            type="button"
            className="flow-control-btn"
            aria-label="Zoom out"
            disabled={zoom <= ZOOM_MIN}
            onClick={() => adjustZoom(-ZOOM_STEP)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
            </svg>
          </button>
          <span className="flow-zoom">{zoom}%</span>
          <button
            type="button"
            className="flow-control-btn"
            aria-label="Zoom in"
            disabled={zoom >= ZOOM_MAX}
            onClick={() => adjustZoom(ZOOM_STEP)}
          >
            <PlusIcon />
          </button>
          <button
            type="button"
            className="flow-control-btn"
            aria-label="Reset zoom"
            onClick={() => setZoom(100)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              <circle cx="12" cy="12" r="1" />
            </svg>
          </button>
          <button type="button" className="flow-control-btn" aria-label="Full screen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              <path d="m14 10 7-7" />
              <path d="m3 21 7-7" />
              <path d="M21 8V3h-5" />
              <path d="M3 16v5h5" />
            </svg>
          </button>
        </div>

        <div className="flow-container">
          <div
            className="flow-canvas"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <div className="flow-header">
              <div className="agent-card">
                <div className="agent-card-view">
                  <div className="agent-card-header">
                    <div className="agent-avatar" aria-label="Ava Smith">
                      <img src="images/ava-smith.png" alt="Ava Smith" />
                    </div>
                    <div className="agent-info">
                      <div className="agent-title-row">
                        <h3 className="agent-title">Ava Smith</h3>
                        <button type="button" className="edit-btn" aria-label="Edit agent">
                          <EditIcon />
                        </button>
                      </div>
                      <p className="agent-subtitle">Billing_Payment_Inquiries_1698624240</p>
                      <Badge variant="default">Agent</Badge>
                    </div>
                  </div>
                  <p className="agent-description">
                    You are a billing and payment customer service agent. Greet the customer warmly and invoke the most relevant skill: billing-inquiry for invoice questions, charge-dispute for disputed
                  </p>
                  <div className="agent-stats">
                    <StatPill>4 Skills</StatPill>
                    <StatPill>11 Tools</StatPill>
                  </div>
                </div>
              </div>
            </div>

            <div className="connector-line" />

            <div className="flow-row">
              {SKILLS.map((skill, i) => (
                <SkillCard
                  key={i}
                  skill={skill}
                  active={activeSkill === i}
                  onClick={() => setActiveSkill((cur) => (cur === i ? null : i))}
                />
              ))}
            </div>

            {activeSkill == null ? (
              <div className="flow-divider">
                <span className="flow-divider-label">Skills — click a skill to explore its tools</span>
              </div>
            ) : (
              <div className="flow-row tools-row">
                {activeTools.map((tool, i) => (
                  <ToolCard key={i} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
