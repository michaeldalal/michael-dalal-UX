export default function IconButton({
  variant = 'shell',
  ariaLabel,
  onClick,
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const variantClass = {
    shell: 'shell-icon-btn',
    ghost: 'ghost-btn',
  }[variant] || 'shell-icon-btn';

  return (
    <button
      type={type}
      className={`${variantClass}${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
