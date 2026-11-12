# Template Header Full Component

## Custom Tag Usage

Use this component with its custom wrapper tag:

```html
<catmplt-header>
  <!-- component markup -->
</catmplt-header>
```

The Template Header Full component provides a complete, responsive header solution including a utility bar (CA.gov branding) and a main branding bar with site-specific logo, search, and navigation.

It utilizes a "classless" internal CSS architecture where styling is driven by the HTML structure and direct descendant selectors (`>`) rather than deep BEM nesting.

## Initial Structure

The component's HTML structure must remain consistent, as the CSS utilizes direct descendant selectors (`>`) based on this exact nesting to apply styles.

```html
<div>
  <!-- Utility Bar (CA.gov Branding) -->
  <div id="catmplt-header-full__utility-bar">
    <div>
      <!-- CA.gov Logo & Official Text -->
      <div>...</div>
      <!-- Utility Links -->
      <div>...</div>
    </div>
  </div>

  <!-- Branding Bar (Site Specific) -->
  <div id="catmplt-header-full__branding">
    <div>
      <!-- Site Logo -->
      <div>...</div>

      <!-- Search Trigger (Mobile) -->
      <details name="...">...</details>

      <!-- Search Form -->
      <div>...</div>

      <!-- Menu Trigger (Mobile) -->
      <details name="...">...</details>

      <!-- Main Navigation -->
      <div>
        <nav>...</nav>
      </div>
    </div>
  </div>
</div>
```

## CSS Parent-to-Children Selector Method

The utility and branding bars are targeted by their IDs, rather than by their position as the first or last child. The CSS selectors `> div#catmplt-header-full__utility-bar` and `> div#catmplt-header-full__branding` select those direct children of the component's root wrapper. This keeps the bar-level styling tied to each bar's explicit identifier if sibling elements are added or reordered.

Within each bar, the stylesheet uses direct-child selectors such as `> div` and `> nav` to target the internal structure. Keep the documented nesting in the HTML example consistent with those selectors.

### Benefits

- **Explicit Bar Targeting**: IDs identify the utility and branding bars independently of their sibling order.
- **Structural Integrity**: Direct-child selectors target the expected internal structure, which helps maintain accessibility and design standards.
- **Scoped Styling**: All internal element styles are strictly scoped to the header root, preventing leakage.

### Implementation Details

- **Utility Bar**: Targeted via `> div#catmplt-header-full__utility-bar`.
- **Branding Bar**: Targeted via `> div#catmplt-header-full__branding`.
- **Containers**: Inner wrappers use width constraints and flexbox layout, targeted via direct-child selectors such as `> div`.
- **Interactive Elements**: Search and Menu triggers use the native `<details>` element, with styles applied via `> details`.

## Responsive Behavior

- **Mobile (< 992px)**: Search and Navigation menus are hidden behind `<details>` triggers.
- **Desktop (>= 992px)**: Search form and Navigation menu are displayed inline.
- **Official Branding**: The "Official website" text visibility is managed based on screen width.
