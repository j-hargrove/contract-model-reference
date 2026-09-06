import { Button } from 'contract-model-reference';

export const Primary = () => <Button label="Save changes" variant="primary" />;

export const Secondary = () => <Button label="Cancel" variant="secondary" />;

export const Danger = () => <Button label="Delete account" variant="danger" />;

export const Hover = () => <Button label="Save changes" variant="primary" previewState="hover" />;

export const Disabled = () => <Button label="Save changes" variant="primary" disabled />;
