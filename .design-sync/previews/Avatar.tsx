import { Avatar } from 'contract-model-reference';

export const Small = () => (
  <Avatar alt="Ada Lovelace" src="https://i.pravatar.cc/150?img=5" size="sm" />
);

export const Medium = () => (
  <Avatar alt="Grace Hopper" src="https://i.pravatar.cc/150?img=45" size="md" />
);

export const Large = () => (
  <Avatar alt="Alan Turing" src="https://i.pravatar.cc/150?img=12" size="lg" />
);

export const Loading = () => (
  <Avatar alt="Katherine Johnson" size="md" loading />
);
