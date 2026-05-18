import { InfoIcon, BellIcon } from './icons.jsx';
import IconButton from './IconButton.jsx';

export default function ShellTopBar({ notificationCount = 5, initials = 'JS' }) {
  return (
    <header className="shell-top-bar">
      <div className="shell-top-bar-left">
        <div className="shell-app-logo">
          <img
            src="https://new-analytics-ten.vercel.app/app-icon.svg"
            alt="Analytics"
            className="shell-app-icon"
          />
          <span className="shell-app-name">Analytics</span>
        </div>
      </div>
      <div className="shell-top-bar-right">
        <IconButton ariaLabel="Help">
          <InfoIcon />
        </IconButton>
        <IconButton ariaLabel="Notifications">
          <BellIcon />
          {notificationCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 16,
                height: 16,
                background: 'var(--color-red-notification, #bc2626)',
                borderRadius: 8,
                fontSize: 11,
                color: 'var(--color-bg-primary, white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--color-bg-primary, white)',
              }}
            >
              {notificationCount}
            </span>
          )}
        </IconButton>
        <div className="shell-profile">
          <div className="shell-profile-avatar">{initials}</div>
        </div>
      </div>
    </header>
  );
}
