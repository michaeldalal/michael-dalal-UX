import { CheckIcon } from './icons.jsx';

export default function Badge({ variant = 'default', children, withCheck = false, className = '' }) {
  const classes = `badge badge-${variant}${className ? ` ${className}` : ''}`;
  return (
    <span className={classes}>
      {withCheck && <CheckIcon />}
      {children}
    </span>
  );
}
