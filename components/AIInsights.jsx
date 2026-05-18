import { useState } from 'react';
import {
  SparklesIcon,
  ListIcon,
  BoltIcon,
  BellOffIcon,
  ChevronUpIcon,
  ClockIcon,
  RefreshIcon,
} from './icons.jsx';

const DEFAULT_RECOMMENDATIONS = [
  {
    title: 'Prioritize Billing & Payment Inquiries category',
    text: 'Automating this category will deliver $33K annual savings (63% of total ROI) and handle the majority of high-volume customer inquiries across billing topics.',
    pill: '$33K annual savings',
  },
  {
    title: 'Prioritize Billing & Payment Inquiries category',
    text: 'Automating this category will deliver $33K annual savings (63% of total ROI) and handle the majority of high-volume customer inquiries across billing topics.',
    pill: '$33K annual savings',
  },
  {
    title: 'Prioritize Billing & Payment Inquiries category',
    text: 'Automating this category will deliver $33K annual savings (63% of total ROI) and handle the majority of high-volume customer inquiries across billing topics.',
    pill: '$33K annual savings',
  },
];

const DEFAULT_SUMMARY = [
  <>I analyzed 143,000 interactions across 3 major categories and identified opportunities to automate 3% of your workload, saving $38K annually.</>,
  <>Here's what I found:</>,
];

const DEFAULT_LIST = [
  <>
    <strong>Billing &amp; Payment Inquiries leads automation potential:</strong> This category accounts for 68% of total automatable volume with $33K in annual savings.<br />
    This category includes high-volume topics like Bill Explanation, Payment Arrangement, and Refund Requests.
  </>,
  <>
    <strong>Card Services &amp; Management shows high efficiency:</strong> With a 90% automation rate and 4.2/5 sentiment score, this category demonstrates that card-related inquiries are well-suited for AI automation with positive customer experiences.
  </>,
  <>
    <strong>Account Management &amp; Support offers steady opportunity:</strong> While smaller in volume, this category maintains consistent automation rates and handles critical account operations with 6m average handle times.
  </>,
];

export default function AIInsights({
  summary = DEFAULT_SUMMARY,
  insightList = DEFAULT_LIST,
  recommendations = DEFAULT_RECOMMENDATIONS,
  showMeta = false,
  generatedAgo = '12m ago',
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [dismissed, setDismissed] = useState([]);

  const visible = recommendations.filter((_, i) => !dismissed.includes(i));

  return (
    <section className="ai-insights" aria-label="AI Insights">
      <header className="ai-insights-header">
        <button
          type="button"
          className="ai-insights-toggle"
          aria-label={collapsed ? 'Expand AI Insights' : 'Collapse AI Insights'}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((v) => !v)}
        >
          <ChevronUpIcon />
        </button>
        <SparklesIcon className="ai-insights-sparkles" />
        <h2 className="ai-insights-title">AI Insights</h2>
        {showMeta && (
          <>
            <span className="ai-insights-meta">
              <ClockIcon />
              Generated {generatedAgo}
            </span>
            <button type="button" className="ai-insights-refresh" aria-label="Refresh insights">
              <RefreshIcon />
            </button>
          </>
        )}
      </header>

      {!collapsed && (
        <div className="ai-insights-content">
          <div className="ai-insights-section">
            <div className="ai-insights-section-header">
              <ListIcon className="ai-insights-section-icon" />
              <h3 className="ai-insights-section-title">Generated Summary</h3>
            </div>
            {summary.map((line, i) => (
              <p key={i} className="ai-insights-summary">{line}</p>
            ))}
            <ul className="ai-insights-list">
              {insightList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ai-insights-section">
            <div className="ai-insights-section-header">
              <BoltIcon className="ai-insights-section-icon ai-insights-bolt" />
              <h3 className="ai-insights-section-title">Recommended actions</h3>
              <button
                type="button"
                className="ai-insights-dismiss"
                onClick={() => setDismissed(recommendations.map((_, i) => i))}
              >
                <BellOffIcon />
                Dismiss
              </button>
            </div>
            <div className="ai-recommendations">
              {visible.map((rec, i) => (
                <article key={i} className="ai-recommendation">
                  <h4 className="ai-recommendation-title">{rec.title}</h4>
                  <p className="ai-recommendation-text">{rec.text}</p>
                  <span className="ai-recommendation-pill">{rec.pill}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
