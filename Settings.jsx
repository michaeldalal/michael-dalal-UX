import { useEffect, useRef, useState } from 'react';
import AppLayout from './components/AppLayout.jsx';
import { ChevronDownIcon, InfoIcon } from './components/icons.jsx';

const SETTINGS_SUGGESTIONS = [
  'How do I configure cost calculation?',
  'What does target containment mean?',
  'Where can I find my API key?',
  'How do I change the analyze period?',
];

const INITIAL = {
  bankName: 'ABS Bank',
  companyDescription:
    'ABS Bank is a modern financial institution providing secure, reliable banking services to individuals and businesses. It focuses on delivering seamless digital experiences, efficient operations, and trusted customer support.',
  analyzePeriod: 'Last 30 Days',
  callCost: '2',
  costPer: 'Minutes',
  chatCost: '2',
  targetContainment: '100%',
  apiKey: '',
  siteUrl: '',
};

export default function Settings() {
  const [values, setValues] = useState(INITIAL);
  const [saved, setSaved] = useState(INITIAL);
  const [verifyState, setVerifyState] = useState('idle');
  const verifyTimer = useRef(null);

  const dirty = JSON.stringify(values) !== JSON.stringify(saved);

  const update = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleCancel = () => setValues(saved);
  const handleSave = () => setSaved(values);

  const bothFilled = values.apiKey.trim() && values.siteUrl.trim();

  const runVerify = () => {
    if (!bothFilled) {
      setVerifyState('idle');
      return;
    }
    setVerifyState('verifying');
    if (verifyTimer.current) clearTimeout(verifyTimer.current);
    verifyTimer.current = setTimeout(() => setVerifyState('success'), 1500);
  };

  const resetVerify = () => {
    setVerifyState('idle');
    if (verifyTimer.current) clearTimeout(verifyTimer.current);
  };

  useEffect(() => () => {
    if (verifyTimer.current) clearTimeout(verifyTimer.current);
  }, []);

  return (
    <AppLayout
      activeSidebar="opportunities"
      bodyClassName="deployed-dashboard settings-page"
      breadcrumbParts={[
        { label: 'Automation Opportunities', to: '/automation-opportunities' },
        { label: 'Settings' },
      ]}
      aiSuggestions={SETTINGS_SUGGESTIONS}
    >
      <div className="opportunities-sticky-header">
        <div className="opportunities-page-header">
          <h1 className="opportunities-title">Settings</h1>
          <div className="settings-header-actions">
            <button
              className="settings-cancel-btn"
              type="button"
              onClick={handleCancel}
              disabled={!dirty}
            >
              Cancel
            </button>
            <button
              className="settings-save-btn"
              type="button"
              onClick={handleSave}
              disabled={!dirty}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="main-area">
        <div className="settings-container">
          <section className="settings-section">
            <h2 className="settings-section-title">Company Details</h2>
            <div className="settings-field">
              <label className="settings-label" htmlFor="bankName">Bank Name</label>
              <input
                className="settings-input"
                id="bankName"
                type="text"
                value={values.bankName}
                onChange={update('bankName')}
              />
            </div>
            <div className="settings-field">
              <label className="settings-label" htmlFor="companyDescription">Company Description</label>
              <textarea
                className="settings-input settings-textarea"
                id="companyDescription"
                rows={3}
                value={values.companyDescription}
                onChange={update('companyDescription')}
              />
            </div>
          </section>

          <section className="settings-section settings-section--narrow">
            <h2 className="settings-section-title">Automation Opportunities</h2>

            <div className="settings-field">
              <label className="settings-label" htmlFor="analyzePeriod">Analyze period</label>
              <div className="settings-select-wrapper">
                <select
                  className="settings-input settings-select"
                  id="analyzePeriod"
                  value={values.analyzePeriod}
                  onChange={update('analyzePeriod')}
                >
                  <option>Last 30 Days</option>
                  <option>Last 60 Days</option>
                  <option>Last 90 Days</option>
                  <option>This Year</option>
                </select>
                <ChevronDownIcon className="settings-select-chevron" />
              </div>
              <p className="settings-helper">Analyzes interactions from the past 30 days.</p>
            </div>

            <div className="settings-subsection">
              <div className="settings-subsection-title">
                Cost calculation
                <span
                  className="settings-info"
                  tabIndex={0}
                  aria-label="Cost calculation info"
                  data-tooltip="Represents the default cost associated with an interaction, which helps in ROI calculations. 'Target Containment' refers to the percentage of interactions expected to be fully resolved by the automated system without human intervention."
                >
                  <InfoIcon />
                </span>
              </div>

              <div className="settings-row">
                <div className="settings-field">
                  <label className="settings-label" htmlFor="callCost">Call cost (USD)</label>
                  <div className="settings-input-affix">
                    <input
                      className="settings-input"
                      id="callCost"
                      type="text"
                      value={values.callCost}
                      onChange={update('callCost')}
                    />
                    <span className="settings-input-suffix">$</span>
                  </div>
                </div>
                <div className="settings-field">
                  <label className="settings-label" htmlFor="costPer">PER</label>
                  <div className="settings-select-wrapper">
                    <select
                      className="settings-input settings-select"
                      id="costPer"
                      value={values.costPer}
                      onChange={update('costPer')}
                    >
                      <option>Minutes</option>
                      <option>Seconds</option>
                      <option>Hours</option>
                    </select>
                    <ChevronDownIcon className="settings-select-chevron" />
                  </div>
                </div>
              </div>

              <div className="settings-field">
                <label className="settings-label" htmlFor="chatCost">Chat Cost (USD)</label>
                <div className="settings-input-affix">
                  <input
                    className="settings-input"
                    id="chatCost"
                    type="text"
                    value={values.chatCost}
                    onChange={update('chatCost')}
                  />
                  <span className="settings-input-suffix">$</span>
                </div>
              </div>

              <div className="settings-field">
                <label className="settings-label" htmlFor="targetContainment">Target containment</label>
                <div className="settings-input-affix">
                  <input
                    className="settings-input"
                    id="targetContainment"
                    type="text"
                    value={values.targetContainment}
                    onChange={update('targetContainment')}
                  />
                  <span className="settings-input-suffix">%</span>
                </div>
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h2 className="settings-section-title">Cognigy AI Settings</h2>

            <div className="settings-row">
              <div className="settings-field">
                <label className="settings-label" htmlFor="apiKey">API key</label>
                <input
                  className="settings-input"
                  id="apiKey"
                  type="text"
                  placeholder="Enter Cognigy API Key. E.g: c4413fa830745ad47f0…"
                  value={values.apiKey}
                  onChange={(e) => {
                    update('apiKey')(e);
                    resetVerify();
                  }}
                  onBlur={runVerify}
                />
              </div>
              <div className="settings-field">
                <label className="settings-label" htmlFor="siteUrl">Site URL</label>
                <div className="settings-verify-row">
                  <input
                    className="settings-input"
                    id="siteUrl"
                    type="text"
                    placeholder="https://trial.cognigy.ai"
                    value={values.siteUrl}
                    onChange={(e) => {
                      update('siteUrl')(e);
                      resetVerify();
                    }}
                    onBlur={runVerify}
                  />
                  <div className="settings-verify-indicator" data-state={verifyState} aria-live="polite">
                    <svg className="settings-verify-loader-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <svg className="settings-verify-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span className="settings-verify-text">Verifying</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="settings-secondary-btn cognigy-edit-api-btn" type="button">
              Edit API Key
            </button>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
