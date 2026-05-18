import { useMemo, useState } from 'react';
import AppLayout from './components/AppLayout.jsx';
import AIInsights from './components/AIInsights.jsx';
import ActionsDataTable from './components/ActionsDataTable.jsx';
import SearchBox from './components/SearchBox.jsx';
import FilterButton from './components/FilterButton.jsx';

const ALL_ROWS = [
  { name: 'Automate Bill Payment', description: 'Handles one-time bill payments, faster transaction recovery, and payment method updates without agent involvement.', type: 'AI Agent', status: 'Published', triggeredBy: 'John Doe', date: 'Feb 20, 2026', impact: 'Automates 28,080 interactions annually Projected annual savings of $219,800' },
  { name: 'Automate Plan Upgrade', description: 'Guides customers through upgrades via compression, eligibility checks, and instant tier charges without requiring a live agent.', type: 'Deterministic Process', status: 'Published', triggeredBy: 'Emily Rodriguez', date: 'Feb 20, 2026', impact: 'Automates 13,440 interactions annually Projected annual savings of $64,480' },
  { name: 'Automate Password Reset', description: 'Verifies customer identity via unique SMS and walks them through a secure self-service password reset end-to-end.', type: 'AI Agent', status: 'Published', triggeredBy: 'Sarah Johnson', date: 'Feb 20, 2026', impact: 'Automates 37,440 interactions annually Projected annual savings of $150,280' },
  { name: 'Automate Appointment Booking', description: 'Lets customers self-schedule, reschedule, or cancel service appointments using real-time slot availability.', type: 'Deterministic Process', status: 'Published', triggeredBy: 'Michael Chen', date: 'Feb 20, 2026', impact: 'Automates 10,880 interactions annually Projected annual savings of $46,920' },
  { name: 'Automate Service Status Check', description: 'Delivers real-time outage info, estimated resolution notifications to customers in affected areas.', type: 'Deterministic Process', status: 'Published', triggeredBy: 'John Doe', date: 'Feb 20, 2026', impact: 'Automates 18,720 interactions annually Projected annual savings of $81,120' },
  { name: 'Automate Refund Status Check', description: 'Tracks refunds in real-time from payment processing, confirming issuance, fully without handoff.', type: 'AI Agent', status: 'Created', triggeredBy: 'David Kim', date: 'Feb 20, 2026', impact: 'Automates 22,440 interactions annually Projected annual savings of $112,680' },
  { name: 'Automate Billing Inquiry', description: 'Provides instant invoice lookups, payment status updates, and next-step guidance.', type: 'AI Agent', status: 'Published', triggeredBy: 'Aisha Patel', date: 'Feb 21, 2026', impact: 'Automates 9,600 interactions annually Projected annual savings of $42,400' },
  { name: 'Automate Plan Cancellation', description: 'Handles cancellation requests with eligibility checks, retention options, and confirmation flow.', type: 'Deterministic Process', status: 'Published', triggeredBy: 'Daniel Lee', date: 'Feb 21, 2026', impact: 'Automates 8,320 interactions annually Projected annual savings of $36,720' },
  { name: 'Automate Account Verification', description: 'Verifies customer identity automatically and enables secure account operations.', type: 'AI Agent', status: 'Published', triggeredBy: 'Priya Singh', date: 'Feb 21, 2026', impact: 'Automates 16,700 interactions annually Projected annual savings of $67,200' },
  { name: 'Automate Shipping Update', description: 'Notifies customers with tracking updates and expected delivery times automatically.', type: 'Deterministic Process', status: 'Published', triggeredBy: 'Lisa Carter', date: 'Feb 21, 2026', impact: 'Automates 12,200 interactions annually Projected annual savings of $54,880' },
  { name: 'Automate Subscription Renewal', description: 'Handles renewal reminders, payment collection, and confirmation without manual follow-up.', type: 'AI Agent', status: 'Created', triggeredBy: 'Marcus Green', date: 'Feb 21, 2026', impact: 'Automates 14,500 interactions annually Projected annual savings of $59,600' },
  { name: 'Automate Fraud Check', description: 'Flags suspicious activity and triggers verification workflows with minimal friction.', type: 'Deterministic Process', status: 'Published', triggeredBy: 'Elena Martinez', date: 'Feb 21, 2026', impact: 'Automates 11,960 interactions annually Projected annual savings of $52,780' },
  { name: 'Automate Chat Routing', description: 'Directs customers to the right support channel based on intent and queue availability.', type: 'AI Agent', status: 'Published', triggeredBy: 'Jason Wu', date: 'Feb 21, 2026', impact: 'Automates 19,340 interactions annually Projected annual savings of $83,400' },
  { name: 'Automate Contact Update', description: 'Updates customer contact details safely through verification and confirmation flows.', type: 'Deterministic Process', status: 'Published', triggeredBy: 'Olivia Banks', date: 'Feb 21, 2026', impact: 'Automates 7,680 interactions annually Projected annual savings of $34,560' },
  { name: 'Automate Policy Escalation', description: 'Escalates policy exceptions with automatic documentation and follow-up actions.', type: 'AI Agent', status: 'Published', triggeredBy: 'Sofia Ivanov', date: 'Feb 21, 2026', impact: 'Automates 9,760 interactions annually Projected annual savings of $45,200' },
  { name: 'Automate Feedback Collection', description: 'Collects post-interaction feedback and creates a summarized quality score automatically.', type: 'Deterministic Process', status: 'Created', triggeredBy: 'Noah Kim', date: 'Feb 21, 2026', impact: 'Automates 6,540 interactions annually Projected annual savings of $28,320' },
  { name: 'Automate Delivery Confirmation', description: 'Sends delivery confirmations automatically once orders are marked shipped.', type: 'Deterministic Process', status: 'Published', triggeredBy: 'Noah Kim', date: 'Feb 22, 2026', impact: 'Automates 11,200 interactions annually Projected annual savings of $50,320' },
];

export default function ActionsHistory() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [statusOpen, setStatusOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_ROWS.filter((row) => {
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (!q) return true;
      const text = `${row.name} ${row.description} ${row.type} ${row.status} ${row.triggeredBy} ${row.date} ${row.impact}`.toLowerCase();
      return text.includes(q);
    });
  }, [search, statusFilter]);

  return (
    <AppLayout
      activeSidebar="history"
      breadcrumb="History"
    >
      <div className="main-sticky-header">
        <h1 className="main-title">Actions History</h1>

        <div className="filters">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search actions..."
          />
          <FilterButton label="Date range" value="01/07/25 – 31/07/25" />
          <div className="filter-wrapper">
            <FilterButton
              label="Status"
              value={statusFilter}
              onClick={(e) => {
                e.stopPropagation();
                setStatusOpen((v) => !v);
              }}
            />
            <div className={`filter-dropdown${statusOpen ? ' visible' : ''}`}>
              {['All', 'Draft', 'Published'].map((v) => (
                <button
                  type="button"
                  key={v}
                  className="filter-dropdown-item"
                  onClick={() => {
                    setStatusFilter(v);
                    setStatusOpen(false);
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <FilterButton label="Type" value="All" />
          <button type="button" className="reset-filters-btn" onClick={() => { setSearch(''); setStatusFilter('All'); }}>
            ↻ Reset Filters
          </button>
        </div>
      </div>

      <div className="main-area">
        <AIInsights />
        <p className="main-description">Track your actions and their projected impact</p>
        <ActionsDataTable rows={filtered} totalCount={ALL_ROWS.length} />
      </div>
    </AppLayout>
  );
}
