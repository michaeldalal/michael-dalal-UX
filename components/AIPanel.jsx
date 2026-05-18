import { useEffect, useRef, useState } from 'react';
import { SparklesIcon, CloseLineIcon, ArrowUpIcon } from './icons.jsx';

const DEFAULT_SUGGESTIONS = [
  'What are the key insights here?',
  'What should I focus on first?',
  'What changed recently?',
  'What actions do you recommend?',
];

export default function AIPanel({ open, onClose, suggestions = DEFAULT_SUGGESTIONS }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleClose = () => {
    setValue('');
    onClose?.();
  };

  const handleSend = () => {
    const message = value.trim();
    if (!message) return;
    console.log('Sending:', message);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const disabled = !value.trim();

  return (
    <div className={`ai-panel${open ? ' open' : ''}`}>
      <div className="ai-panel-header">
        <div className="ai-panel-title">
          <SparklesIcon />
          New Chat
        </div>
        <button
          type="button"
          className="ai-panel-close-btn"
          aria-label="Close"
          onClick={handleClose}
        >
          <CloseLineIcon />
        </button>
      </div>
      <div className="ai-panel-content">
        <SparklesIcon className="ai-panel-icon" />
        <div className="ai-panel-greeting">How can I help you today?</div>
        <div className="ai-panel-subtitle">Ask anything about your&hellip;</div>
        <div className="ai-suggestions">
          {suggestions.map((s, i) => (
            <button
              type="button"
              key={i}
              className="ai-suggestion-btn"
              onClick={() => {
                setValue(s);
                inputRef.current?.focus();
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="ai-panel-input-wrapper">
        <div className="ai-panel-input-container">
          <textarea
            ref={inputRef}
            className="ai-panel-input"
            placeholder="Ask a question..."
            rows={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="ai-panel-send-btn"
            disabled={disabled}
            onClick={handleSend}
          >
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
