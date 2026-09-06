export type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  /** Kitchen-sink only. Not part of the Button contract's declared props. */
  previewState?: 'hover' | 'disabled';
}

// Mirrors contract/tokens.json as of the last contract-committer sync.
const VARIANT_STYLES: Record<ButtonVariant, { bg: string; hoverBg: string; fg: string }> = {
  primary: { bg: 'oklch(54.6% 0.245 262.881)', hoverBg: 'oklch(46% 0.22 262.881)', fg: 'oklch(100% 0 0)' },
  secondary: { bg: 'oklch(55% 0.01 260)', hoverBg: 'oklch(46% 0.01 260)', fg: 'oklch(100% 0 0)' },
  danger: { bg: 'oklch(57.7% 0.245 27.325)', hoverBg: 'oklch(49% 0.22 27.325)', fg: 'oklch(100% 0 0)' },
};
const PADDING = '12px 16px'; // spacing.sm spacing.md
const RADIUS = '6px'; // radius.sm

export function Button({ label, onClick, disabled, variant = 'primary', previewState }: ButtonProps) {
  const isDisabled = disabled || previewState === 'disabled';
  const isHoverPreview = previewState === 'hover';
  const s = VARIANT_STYLES[variant];
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{
        backgroundColor: isHoverPreview ? s.hoverBg : s.bg,
        color: s.fg,
        padding: PADDING,
        borderRadius: RADIUS,
        border: 'none',
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {label}
    </button>
  );
}
