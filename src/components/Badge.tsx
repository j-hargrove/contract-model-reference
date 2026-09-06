export type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  subtle?: boolean;
}

// Mirrors contract/tokens.json as of the last contract-committer sync.
const VARIANT_COLOR: Record<BadgeVariant, string> = {
  success: 'oklch(64.8% 0.15 149)',
  warning: 'oklch(79% 0.17 70)',
  danger: 'oklch(57.7% 0.245 27.325)',
  neutral: 'oklch(70% 0.02 260)',
};
const PADDING_X = '8px'; // spacing.sm
const RADIUS = '6px'; // radius.sm

export function Badge({ label, variant = 'neutral', subtle }: BadgeProps) {
  const color = VARIANT_COLOR[variant];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: `2px ${PADDING_X}`,
        borderRadius: RADIUS,
        backgroundColor: subtle ? 'transparent' : color,
        color: subtle ? color : 'white',
        border: subtle ? `1px solid ${color}` : 'none',
        fontSize: 12,
      }}
    >
      {label}
    </span>
  );
}
