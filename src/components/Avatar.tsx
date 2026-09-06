export type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  loading?: boolean;
}

// Mirrors contract/tokens.json as of the last contract-committer sync.
const SIZE_PX: Record<AvatarSize, number> = { sm: 24, md: 40, lg: 64 };
const BORDER_RADIUS = '9999px'; // radius.full
const BORDER_WIDTH = '8px'; // spacing.sm
const PLACEHOLDER_BG = 'oklch(70% 0.02 260)'; // color.neutral

export function Avatar({ src, alt, size = 'md', loading }: AvatarProps) {
  const px = SIZE_PX[size];
  return (
    <span
      role="img"
      aria-label={alt}
      style={{
        display: 'inline-flex',
        width: px,
        height: px,
        borderRadius: BORDER_RADIUS,
        border: `1px solid ${PLACEHOLDER_BG}`,
        padding: loading ? BORDER_WIDTH : 0,
        backgroundColor: loading ? PLACEHOLDER_BG : undefined,
        backgroundImage: !loading && src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        opacity: loading ? 0.6 : 1,
      }}
    />
  );
}
