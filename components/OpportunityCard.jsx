import { useState } from 'react';
import IconButton from './IconButton.jsx';
import { MoreVerticalIcon, ShareIcon, ChevronDownIcon } from './icons.jsx';

function Metric({ value, label, isSavings }) {
  return (
    <div className="opportunity-metric">
      <div className={`opportunity-metric-value${isSavings ? ' savings' : ''}`}>{value}</div>
      <div className="opportunity-metric-label">{label}</div>
    </div>
  );
}

export function OpportunityMetrics({ metrics, sub = false }) {
  return (
    <div className={`opportunity-metrics${sub ? ' opportunity-sub-metrics' : ''}`}>
      {metrics.map((m, i) => (
        <Metric key={i} value={m.value} label={m.label} isSavings={m.savings} />
      ))}
    </div>
  );
}

export function AgentActionsRow({ label, percent, value }) {
  return (
    <div className="agent-action-row">
      <span className="agent-action-label">{label}</span>
      <div className="agent-action-bar">
        <div className="agent-action-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="agent-action-value">{value}</span>
    </div>
  );
}

export function AgentActions({ title, rows, inline = false }) {
  const sectionClass = inline ? 'agent-actions-inline' : 'agent-actions';
  const titleClass = inline ? 'agent-actions-inline-title' : 'agent-actions-title';
  const TitleEl = inline ? 'h5' : 'h4';
  return (
    <section className={sectionClass}>
      <TitleEl className={titleClass}>{title}</TitleEl>
      {rows.map((r, i) => (
        <AgentActionsRow key={i} {...r} />
      ))}
    </section>
  );
}

export default function OpportunityCard({ data }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`opportunity-card${expanded ? ' expanded' : ''}`}>
      <header className="opportunity-card-header" onClick={() => setExpanded((v) => !v)}>
        <div>
          <h3 className="opportunity-card-title">{data.title}</h3>
          <p className="opportunity-card-subtitle">{data.subtitle}</p>
        </div>
        <div className="opportunity-card-actions" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="opportunity-create-btn">
            Create AI Agent
          </button>
          <IconButton variant="ghost" ariaLabel="Share">
            <ShareIcon />
          </IconButton>
          <IconButton variant="ghost" ariaLabel="More options">
            <MoreVerticalIcon />
          </IconButton>
        </div>
      </header>
      <OpportunityMetrics metrics={data.metrics} />
      {expanded && data.details && (
        <div className="opportunity-details">
          {data.details.agentActions && (
            <AgentActions
              title="Agent Actions in This Category"
              rows={data.details.agentActions}
            />
          )}
          {data.details.subTopics && (
            <div className="opportunity-sub-list">
              {data.details.subTopics.map((sub, i) => (
                <SubTopicCard key={i} data={sub} />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function SubTopicCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className={`opportunity-sub-card${expanded ? ' expanded' : ''}`}>
      <header className="opportunity-sub-card-header">
        <button
          type="button"
          className="opportunity-sub-toggle"
          aria-label="Toggle sub-topic"
          onClick={() => setExpanded((v) => !v)}
        >
          <ChevronDownIcon />
        </button>
        <div className="opportunity-sub-card-info">
          <h4 className="opportunity-sub-card-title">{data.title}</h4>
          <p className="opportunity-sub-card-subtitle">{data.subtitle}</p>
        </div>
        <div className="opportunity-card-actions">
          <button type="button" className="opportunity-create-btn">
            Create AI Agent
          </button>
        </div>
      </header>
      <OpportunityMetrics metrics={data.metrics} sub />
      {expanded && data.details && (
        <div className="opportunity-sub-details">
          {data.details.agentActions && (
            <AgentActions
              title="Agent Actions for This Topic"
              rows={data.details.agentActions}
              inline
            />
          )}
          {data.details.subSubTopics && (
            <div className="opportunity-sub-sub-list">
              {data.details.subSubTopics.map((sub, i) => (
                <SubSubTopicCard key={i} data={sub} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function SubSubTopicCard({ data, index }) {
  return (
    <article className="opportunity-sub-sub-card">
      <header className="opportunity-sub-sub-card-header">
        <span className="opportunity-numbered-badge">{index}</span>
        <h5 className="opportunity-sub-sub-card-title">{data.title}</h5>
        <IconButton variant="ghost" ariaLabel="More options">
          <MoreVerticalIcon />
        </IconButton>
      </header>
      <OpportunityMetrics metrics={data.metrics} sub />
      {data.agentActions && (
        <AgentActions
          title="Agent Actions in This Sub-topic"
          rows={data.agentActions}
          inline
        />
      )}
      <button type="button" className="deterministic-btn">
        Create Deterministic Process
      </button>
    </article>
  );
}
