import { notFound } from 'next/navigation';
import type { ComponentProps, ReactNode } from 'react';
import contracts from '../../../contract/contracts.json';
import { Avatar, type AvatarSize } from '@/components/Avatar';
import { Badge, type BadgeVariant } from '@/components/Badge';
import { Button, type ButtonVariant } from '@/components/Button';
import { UserCard } from '@/components/UserCard';

const BUTTON_LABELS: Record<string, string> = {
  primary: 'Save changes',
  secondary: 'Cancel',
  danger: 'Delete account',
};

const ISOLATED_RENDERERS: Record<string, (variant: string, state: string) => ReactNode> = {
  Button: (variant, state) => (
    <Button
      variant={variant as ButtonVariant}
      label={BUTTON_LABELS[variant] ?? variant}
      disabled={state === 'disabled'}
      previewState={state === 'hover' ? 'hover' : state === 'disabled' ? 'disabled' : undefined}
    />
  ),
  Avatar: (variant, state) => (
    <Avatar
      alt="Sample user"
      src={state === 'loading' ? undefined : 'https://i.pravatar.cc/150?img=12'}
      size={variant as AvatarSize}
      loading={state === 'loading'}
    />
  ),
  Badge: (variant, state) => (
    <Badge label={variant} variant={variant as BadgeVariant} subtle={state === 'subtle'} />
  ),
};

const USER_CARD_SAMPLES: Array<ComponentProps<typeof UserCard>> = [
  { name: 'Ada Lovelace', avatarUrl: 'https://i.pravatar.cc/150?img=5', status: 'success', variant: 'expanded' },
  { name: 'Grace Hopper', avatarUrl: 'https://i.pravatar.cc/150?img=45', status: 'warning', variant: 'expanded' },
  { name: 'Alan Turing', avatarUrl: 'https://i.pravatar.cc/150?img=12', status: 'danger', variant: 'compact' },
  { name: 'Katherine Johnson', status: 'neutral', variant: 'expanded', loading: true },
];

type Contracts = Record<
  string,
  { variants: string[]; states: string[]; composition?: Record<string, unknown> }
>;
const typedContracts = contracts as Contracts;

export default function KitchenSinkPage() {
  if (process.env.NODE_ENV === 'production' && process.env.KITCHEN_SINK_ENABLED !== 'true') {
    notFound();
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Kitchen Sink</h1>

      <h2>Isolated components</h2>
      {Object.entries(typedContracts).map(([name, contract]) => {
        const render = ISOLATED_RENDERERS[name];
        if (!render || contract.composition) return null;
        return (
          <section key={name}>
            <h3>{name}</h3>
            <table>
              <tbody>
                {contract.variants.map((variant) => (
                  <tr key={variant}>
                    {contract.states.map((state) => (
                      <td key={state} style={{ padding: 16 }}>
                        {render(variant, state)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}

      <h2>Composed: UserCard</h2>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {USER_CARD_SAMPLES.map((sample) => (
          <UserCard key={sample.name} {...sample} />
        ))}
      </section>
    </main>
  );
}
