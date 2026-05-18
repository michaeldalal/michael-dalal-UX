import { SearchIcon } from './icons.jsx';

export default function SearchBox({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`search-box${className ? ` ${className}` : ''}`}>
      <SearchIcon className="search-box-icon" />
      <input
        type="text"
        className="search-box-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
