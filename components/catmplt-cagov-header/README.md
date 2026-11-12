# CA.gov Header

## Custom Tag Usage

Use this component with its custom wrapper tag:

```html
<catmplt-cagov-header>
  <!-- component markup -->
</catmplt-cagov-header>
```

This component is the standard CA.gov header shell used to present official statewide branding, trust messaging, and core search functionality. It is included here for reference, implementation consistency, and structural understanding.

This component is not intended for modification. It should remain as-is because it represents official CA.gov branding and a primary CA.gov shell component. Do not restyle, restructure, rename regions, or swap core content patterns unless direction comes from the platform or branding owners.

## Purpose

Use this component when the experience needs the standard CA.gov global header treatment, including:

- official California government identification
- CA.gov navigation access
- CA.gov branding
- search

## High-Level Structure

The component is wrapped in:

```html
<div>
  <div id="catmplt-cagov-header__utility-bar">
    <!-- Utility / Trust Region -->
  </div>
  <div id="catmplt-cagov-header__branding">
    <!-- Branding / Search Region -->
  </div>
</div>
```

It is composed of two primary regions:

1. Utility / Trust Region
2. Branding / Search Region

## Region Breakdown

### 1. Utility / Trust Region

The first top-level region provides statewide trust messaging and access to the CA.gov menu.

Contained areas:

- Official California website disclosure button
- Official California website explanatory content
- CA.gov menu button
- CA.gov navigation content

This region helps users understand they are on an official California government website and provides quick access to core statewide destinations.

### 2. Branding / Search Region

The second top-level region contains the primary branded shell and search experience.

Contained areas:

- CA.gov logo/home link
- Search form

This region is the main branded interaction layer and should be preserved intact to maintain consistency with CA.gov.

## Structural Outline

```html
catmplt-cagov-header
  div
  div#catmplt-cagov-header__utility-bar  /* Utility / Trust Region */
    div
      div
        details  /* Official California website */
      details#catmplt-cagov-header__menu-toggle  /* CA.gov menu button */
      div#catmplt-cagov-header__menu-content    /* CA.gov navigation */
  div#catmplt-cagov-header__branding  /* Branding / Search Region */
    div
      a        /* CA.gov logo */
      div      /* Search form */
```

The utility and branding regions are selected by their IDs in CSS. Their inner wrappers use direct-child selectors to preserve the expected layout structure.

## Guidance

- Treat this as a protected shell component, not a customization surface.
- Do not alter the branding, logo treatment, labels, or region order.
- Do not repurpose the component as a local header variant.
- If a project needs different header behavior, create or use another component rather than editing this one.

## Files

- `cagov-header.html`: Markup and region structure
- `cagov-header.html.css`: Presentation and layout
