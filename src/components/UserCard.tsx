import { Avatar } from './Avatar';
import { Badge, type BadgeVariant } from './Badge';
import { Button } from './Button';

interface UserCardProps {
  name: string;
  avatarUrl?: string;
  status: BadgeVariant;
  onAction?: () => void;
  variant?: 'compact' | 'expanded';
  loading?: boolean;
}

// Mirrors contract/tokens.json as of the last contract-committer sync.
const GAP = '16px'; // spacing.md
const PADDING = '12px'; // spacing.sm
const RADIUS = '6px'; // radius.sm
const BORDER_COLOR = 'oklch(70% 0.02 260)'; // color.neutral

export function UserCard({ name, avatarUrl, status, onAction, variant = 'expanded', loading }: UserCardProps) {
  const compact = variant === 'compact';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: GAP,
        padding: PADDING,
        borderRadius: RADIUS,
        border: `1px solid ${BORDER_COLOR}`,
      }}
    >
      <Avatar alt={name} src={avatarUrl} size={compact ? 'sm' : 'md'} loading={loading} />
      <div style={{ flex: 1 }}>
        <div>{name}</div>
        <Badge label={status} variant={status} />
      </div>
      {!compact && <Button label="View profile" onClick={onAction} />}
    </div>
  );
}
