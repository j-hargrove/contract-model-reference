## Using this design system

**No provider or wrapper needed.** Every component is a plain function component with zero context/theme dependencies - `Avatar`, `Badge`, `Button`, `UserCard` all render standalone. Just import from the package and use directly:

```tsx
import { Avatar, Badge, Button } from 'contract-model-reference';

<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
  <Avatar alt="Ada Lovelace" src="https://example.com/ada.jpg" size="md" />
  <span>Ada Lovelace</span>
  <Badge label="success" variant="success" />
  <Button label="View profile" variant="primary" />
</div>
```

**Styling idiom: none - components are closed and pre-styled.** This is not a utility-class system, not a token/CSS-variable system, and not a theme-prop system. Every color, spacing, and radius value is a literal baked directly into each component's source at build time (drawn from a separate DTCG token file this bundle does not ship). **No component accepts `className` or `style`** - there is no override surface. Don't invent one; don't pass Tailwind classes, inline styles, or a `theme` prop - none of it does anything. If a layout needs custom look, apply styling to a wrapping element, never expect the library components themselves to accept style props.

**Where the truth lives.** Each component's `.d.ts` is authoritative for its props (variant enums, required vs. optional). There is no separate stylesheet to inspect - `styles.css` in this bundle is an empty runtime-styles stub (`[CSS_RUNTIME]`): the actual colors are only visible by rendering the component. Trust the previews' colors/spacing as source-of-truth, not the (empty) CSS.

**Composition pattern - `UserCard` is the model for building composites.** It composes `Avatar` (leading visual, sized `sm` in `compact`/`md` in `expanded`), `Badge` (status indicator - `variant` is always set to the exact same string as the status value passed to `Badge`'s `label`, e.g. `<Badge label={status} variant={status} />`), and `Button` (trailing primary action, hidden entirely in the `compact` variant). Follow this same pattern - status text and status color always agree - when composing new status-bearing UI with these parts.
