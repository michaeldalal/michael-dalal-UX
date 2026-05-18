export default function StatPill({ children, className = '' }) {
  return <span className={`stat-pill${className ? ` ${className}` : ''}`}>{children}</span>;
}
