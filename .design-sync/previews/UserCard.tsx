import { UserCard } from 'contract-model-reference';

export const Expanded = () => (
  <UserCard
    name="Ada Lovelace"
    avatarUrl="https://i.pravatar.cc/150?img=5"
    status="success"
    variant="expanded"
  />
);

export const Compact = () => (
  <UserCard
    name="Alan Turing"
    avatarUrl="https://i.pravatar.cc/150?img=12"
    status="danger"
    variant="compact"
  />
);

export const Warning = () => (
  <UserCard
    name="Grace Hopper"
    avatarUrl="https://i.pravatar.cc/150?img=45"
    status="warning"
    variant="expanded"
  />
);

export const Loading = () => (
  <UserCard name="Katherine Johnson" status="neutral" variant="expanded" loading />
);
