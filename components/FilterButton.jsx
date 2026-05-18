import { ChevronDownIcon } from './icons.jsx';

export default function FilterButton({ label, value, onClick, id, type = 'button' }) {
  return (
    <button className="filter-btn" type={type} id={id} onClick={onClick}>
      {label}: <span className="filter-btn-value">{value}</span>
      <ChevronDownIcon className="filter-chevron" />
    </button>
  );
}
