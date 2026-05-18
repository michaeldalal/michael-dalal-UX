import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import AIInsights from './components/AIInsights.jsx';
import OpportunityCard from './components/OpportunityCard.jsx';
import FilterButton from './components/FilterButton.jsx';
import { SettingsIcon } from './components/icons.jsx';

const STATS = [
  { label: 'Total Interactions', value: '26,666' },
  { label: 'Avg. Duration', value: '3:20' },
  { label: 'Avg. Sentiment', value: '4.67' },
  { label: 'Intents Identified', value: '191' },
  { label: 'Actions Identified', value: '536' },
  { label: 'Agents', value: '127' },
];

const TABS = ['Categories', 'Topics', 'Sub-topics'];

const FILTERS = [
  { label: 'Teams', value: 'All', options: ['Account Management', 'Billing & Payments', 'Customer Support', 'Fraud Prevention'] },
  { label: 'Skills', value: 'All', options: ['Conversational AI', 'Decision Trees', 'Knowledge Base', 'Process Automation'] },
  { label: 'Channel', value: 'All', options: ['Voice', 'Chat', 'Email', 'SMS'] },
  { label: 'Category', value: 'All', options: ['Billing & Payment', 'Card Services', 'Account Management', 'Technical Support'] },
  { label: 'Direction', value: 'All', options: ['Inbound', 'Outbound'] },
];

const billingActions = [
  { label: 'Caller Was Authenticated', percent: 100, value: '2,840' },
  { label: 'Billing Was Discussed', percent: 88.7, value: '2,520' },
  { label: 'Account Was Reviewed', percent: 66.5, value: '1,890' },
  { label: 'Assisted With Payment', percent: 59.2, value: '1,680' },
  { label: 'Agent Provided Information About…', percent: 44.4, value: '1,260' },
];

const billExplanationActions = [
  { label: 'Billing Was Discussed', percent: 100, value: '810' },
  { label: 'Agent Provided Information About…', percent: 88.9, value: '720' },
  { label: 'Account Was Reviewed', percent: 77.8, value: '630' },
];

const chargeBreakdownActions = [
  { label: 'Billing Was Discussed', percent: 100, value: '810' },
  { label: 'Agent Provided Information About…', percent: 88.9, value: '720' },
  { label: 'Account Was Reviewed', percent: 77.8, value: '630' },
];

const metric = (value, label, savings = false) => ({ value, label, savings });

const billingMetrics = [
  metric('45,000', 'Total Call (CC)'),
  metric('4,200', 'Category Volume'),
  metric('3,400', 'Automatable Volume'),
  metric('7.6%', 'Automatable % (CC)'),
  metric('3:45', 'Duration'),
  metric('3.5', 'Sentiment'),
  metric('$26K', 'Annual Savings', true),
];

const billExplanationMetrics = [
  metric('45,000', 'Total Call (CC)'),
  metric('1,800', 'Category Volume'),
  metric('1,620', 'Automatable Volume'),
  metric('3.6%', 'Automatable % (CC)'),
  metric('4:00', 'Duration'),
  metric('3.6', 'Sentiment'),
  metric('$13K', 'Annual Savings', true),
];

const subSubMetricsA = [
  metric('45,000', 'Total Call (CC)'),
  metric('900', 'Category Volume'),
  metric('855', 'Automatable Volume'),
  metric('1.9%', 'Automatable % (CC)'),
  metric('4:00', 'Duration'),
  metric('3.6', 'Sentiment'),
  metric('$7K', 'Annual Savings', true),
];

const subSubMetricsB = [
  metric('45,000', 'Total Call (CC)'),
  metric('600', 'Category Volume'),
  metric('522', 'Automatable Volume'),
  metric('1.2%', 'Automatable % (CC)'),
  metric('4:00', 'Duration'),
  metric('3.6', 'Sentiment'),
  metric('$4K', 'Annual Savings', true),
];

const OPPORTUNITIES = [
  {
    title: 'Billing & Payment Inquiries',
    subtitle: '3 Related Topics',
    metrics: billingMetrics,
    details: {
      agentActions: billingActions,
      subTopics: [
        {
          title: 'Bill Explanation',
          subtitle: '3 Related sub-topics',
          metrics: billExplanationMetrics,
          details: {
            agentActions: billExplanationActions,
            subSubTopics: [
              { title: 'Charge Breakdown', metrics: subSubMetricsA, agentActions: chargeBreakdownActions },
              { title: 'Charge Breakdown', metrics: subSubMetricsB, agentActions: chargeBreakdownActions },
              { title: 'Charge Breakdown', metrics: subSubMetricsA, agentActions: chargeBreakdownActions },
            ],
          },
        },
        {
          title: 'Payment Methods',
          subtitle: '3 Related sub-topics',
          metrics: billExplanationMetrics,
          details: {
            agentActions: billExplanationActions,
            subSubTopics: [
              { title: 'Card Payment', metrics: subSubMetricsA, agentActions: chargeBreakdownActions },
              { title: 'Bank Transfer', metrics: subSubMetricsB, agentActions: chargeBreakdownActions },
              { title: 'Mobile Pay', metrics: subSubMetricsA, agentActions: chargeBreakdownActions },
            ],
          },
        },
        {
          title: 'Payment Issues',
          subtitle: '2 Related sub-topics',
          metrics: billExplanationMetrics,
          details: {
            agentActions: billExplanationActions,
            subSubTopics: [
              { title: 'Failed Payment', metrics: subSubMetricsA, agentActions: chargeBreakdownActions },
              { title: 'Disputed Charge', metrics: subSubMetricsB, agentActions: chargeBreakdownActions },
            ],
          },
        },
      ],
    },
  },
  {
    title: 'Card Services & Management',
    subtitle: '2 Related Topics',
    metrics: [
      metric('45,000', 'Total Call (CC)'),
      metric('3,800', 'Category Volume'),
      metric('3,420', 'Automatable Volume'),
      metric('7.6%', 'Automatable % (CC)'),
      metric('2:50', 'Duration'),
      metric('4.2', 'Sentiment'),
      metric('$18K', 'Annual Savings', true),
    ],
  },
  {
    title: 'Account Management & Support',
    subtitle: '4 Related Topics',
    metrics: [
      metric('45,000', 'Total Call (CC)'),
      metric('2,900', 'Category Volume'),
      metric('2,320', 'Automatable Volume'),
      metric('5.2%', 'Automatable % (CC)'),
      metric('6:00', 'Duration'),
      metric('3.8', 'Sentiment'),
      metric('$14K', 'Annual Savings', true),
    ],
  },
  {
    title: 'Technical Support & Troubleshooting',
    subtitle: '5 Related Topics',
    metrics: [
      metric('45,000', 'Total Call (CC)'),
      metric('2,500', 'Category Volume'),
      metric('1,750', 'Automatable Volume'),
      metric('3.9%', 'Automatable % (CC)'),
      metric('5:20', 'Duration'),
      metric('3.4', 'Sentiment'),
      metric('$11K', 'Annual Savings', true),
    ],
  },
  {
    title: 'Service Activation & Setup',
    subtitle: '3 Related Topics',
    metrics: [
      metric('45,000', 'Total Call (CC)'),
      metric('1,900', 'Category Volume'),
      metric('1,520', 'Automatable Volume'),
      metric('3.4%', 'Automatable % (CC)'),
      metric('4:10', 'Duration'),
      metric('4.0', 'Sentiment'),
      metric('$9K', 'Annual Savings', true),
    ],
  },
  {
    title: 'Plan Changes & Upgrades',
    subtitle: '3 Related Topics',
    metrics: [
      metric('45,000', 'Total Call (CC)'),
      metric('1,600', 'Category Volume'),
      metric('1,280', 'Automatable Volume'),
      metric('2.8%', 'Automatable % (CC)'),
      metric('3:50', 'Duration'),
      metric('3.9', 'Sentiment'),
      metric('$7K', 'Annual Savings', true),
    ],
  },
  {
    title: 'Loyalty & Rewards',
    subtitle: '2 Related Topics',
    metrics: [
      metric('45,000', 'Total Call (CC)'),
      metric('900', 'Category Volume'),
      metric('630', 'Automatable Volume'),
      metric('1.4%', 'Automatable % (CC)'),
      metric('2:40', 'Duration'),
      metric('4.4', 'Sentiment'),
      metric('$4K', 'Annual Savings', true),
    ],
  },
];

export default function AutomationOpportunities() {
  const [activeTab, setActiveTab] = useState('Categories');

  return (
    <AppLayout
      activeSidebar="opportunities"
      bodyClassName="deployed-dashboard automation-opportunities-page"
      breadcrumb="Automation Opportunities"
    >
      <div className="opportunities-sticky-header">
        <div className="opportunities-page-header">
          <h1 className="opportunities-title">Automation Opportunities</h1>
          <Link to="/settings" className="opportunities-settings" aria-label="Settings">
            <SettingsIcon />
          </Link>
        </div>

        <div className="filters opportunities-filters">
          <FilterButton label="Date range" value="01/07/25 – 31/07/25" />
          {FILTERS.map((f) => (
            <div key={f.label} className="filter-wrapper">
              <FilterButton label={f.label} value={f.value} />
            </div>
          ))}
          <button type="button" className="reset-filters-btn">↻ Reset Filters</button>
        </div>

        <div className="opportunities-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              className={`opportunities-tab${activeTab === tab ? ' active' : ''}`}
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="main-area">
        <AIInsights showMeta />

        <section className="opportunities-section">
          <div className="section-meta-row">
            <h2 className="section-meta-title">Analyzed Period</h2>
            <span className="section-meta-sub">/ Monthly Analysis: 1–31 Jul 2025</span>
          </div>
          <div className="stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stat-tile">
                <div className="stat-tile-label">{s.label}</div>
                <div className="stat-tile-value">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="opportunities-section">
          <div className="section-meta-row">
            <h2 className="section-meta-title">Top Opportunities</h2>
            <span className="section-meta-sub">/ Yearly Impact Projection: Aug 2025 – Jul 2026</span>
          </div>
          <div className="opportunity-list">
            {OPPORTUNITIES.map((opp, i) => (
              <OpportunityCard key={i} data={opp} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
