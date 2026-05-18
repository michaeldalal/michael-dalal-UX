---
name: design-system
description: Cognigy / NICE design system component catalogue. Use this skill before building or modifying any UI in this workspace. It lists every component available in the system and how they fit together. For raw token values (spacing, color, typography, radius, shadows, motion) read .claude/tokens/tokens.md — this file deliberately does not duplicate token data.
---

# Cognigy / NICE Design System — Component Catalogue

This skill documents the component catalogue extracted from the Figma design system file (C26 Design System ⭐ Tali) and the working `styles.css` / `AI Agent.html` / `deployed-dashboard.html` reference implementations.

> **All components are now available as React JSX files in [`/components/`](../../../components/).** Build new UI as React components — not HTML. The CSS class documentation below remains the authoritative reference for the underlying styling vocabulary that each React component renders.

**For all design tokens — colors, typography, spacing, radius, shadows, motion — read [`.claude/tokens/tokens.md`](../../tokens/tokens.md). This file lists components only; do not duplicate token values here.**

---

## React Components

All components live in [`/components/`](../../../components/) and are the canonical building blocks for new UI. Default exports unless noted. Import paths assume the repo root.

| Component | Import | Main props |
| --- | --- | --- |
| **AIInsights** | `import AIInsights from '/components/AIInsights.jsx'` | `summary`, `insightList`, `recommendations`, `showMeta`, `generatedAgo` |
| **AIPanel** | `import AIPanel from '/components/AIPanel.jsx'` | `open`, `onClose`, `suggestions` |
| **ActionsDataTable** | `import ActionsDataTable from '/components/ActionsDataTable.jsx'` | `rows`, `visibleCount`, `totalCount` |
| **AppLayout** | `import AppLayout from '/components/AppLayout.jsx'` | `activeSidebar`, `breadcrumb`, `breadcrumbParts`, `bodyClassName`, `shellWrapperClass`, `aiSuggestions`, `children` |
| **Badge** | `import Badge from '/components/Badge.jsx'` | `variant` (`default` \| `secondary` \| `draft` \| `agent` \| etc.), `withCheck`, `className`, `children` |
| **FilterButton** | `import FilterButton from '/components/FilterButton.jsx'` | `label`, `value`, `onClick`, `id`, `type` |
| **IconButton** | `import IconButton from '/components/IconButton.jsx'` | `variant` (`shell` \| `ghost`), `ariaLabel`, `onClick`, `className`, `children` |
| **OpportunityCard** | `import OpportunityCard from '/components/OpportunityCard.jsx'` | `data`. Also named-exports `OpportunityMetrics`, `AgentActions`, `AgentActionsRow` |
| **SearchBox** | `import SearchBox from '/components/SearchBox.jsx'` | `value`, `onChange`, `placeholder`, `className` |
| **ShellTopBar** | `import ShellTopBar from '/components/ShellTopBar.jsx'` | `notificationCount`, `initials` |
| **Sidebar** | `import Sidebar from '/components/Sidebar.jsx'` | `active` (route key), `collapsed` |
| **StatPill** | `import StatPill from '/components/StatPill.jsx'` | `children`, `className` |
| **TopbarNavigation** | `import TopbarNavigation from '/components/TopbarNavigation.jsx'` | `breadcrumb`, `breadcrumbParts`, `onToggleSidebar`, `onAskAI`, `showSpacer` |
| **icons** | `import { SparklesIcon, HomeIcon, ... } from '/components/icons.jsx'` | Named exports for every SVG icon used across components |

`AppLayout` is the standard page shell — wrap new screens in it to inherit `ShellTopBar`, `Sidebar`, `TopbarNavigation`, and the `AIPanel` slide-over without re-wiring state.

---

## Component Catalogue (CSS classes)

The CSS class documentation below remains the source of truth for the underlying styling vocabulary that each React component renders. Refer to it when extending components, scoping page-specific overrides, or reading existing markup.

All components ship in `styles.css`. Reuse the existing class names — do not invent parallel BEM/utility versions.

### App shell
- **`.shell-top-bar`** — full-width shell header. Contains `.shell-top-bar-left` (logo + app name) and `.shell-top-bar-right` (icon buttons + profile).
- **`.shell-app-logo`** + **`.shell-app-icon`** + **`.shell-app-name`** — branded logo cluster.
- **`.shell-icon-btn`** — square transparent icon button. Supports a notification dot child.
- **`.shell-profile`** + **`.shell-profile-avatar`** — user pill with initials avatar.
- **`.body-container`** + **`.content-wrapper`** + **`.app-container`** — three-layer wrapping that gives the app a rounded surface card.
- **`.app-shell`** + **`.main-container`** — alternate names for the inner shell flex layout (sidebar + main column).

### Navigation
- **`.sidebar`** — fixed-width left navigation. Collapses to icon-only via `.sidebar.collapsed`.
- **`.sidebar-section`** + **`.sidebar-section-label`** — grouped section with optional uppercase label.
- **`.sidebar-item`** — left-aligned text+icon row. Variants: `.active` (highlighted state), hover.
- **`.sidebar-item-icon`** / **`.sidebar-item-label`** / **`.sidebar-item-chevron`** — slot elements; the icon stays visible when collapsed, labels/chevrons hide.
- **`.sidebar-nested`** + **`.sidebar-nested-item`** — indented sub-items connected by a vertical line and small horizontal stubs. Can nest a second level for deeper hierarchies.
- **`.sidebar-toggle-btn`** — auto-pinned-to-bottom collapse/expand control with rotating icon.
- **`.topbar-navigation`** — app-level top bar with bottom border. Slots `.topbar-back-btn`, `.topbar-breadcrumb`, optional `.topbar-spacer`, and `.topbar-ask-ai-btn`.
- **`.topbar-ask-ai-btn`** — outlined button with leading sparkle icon for opening the AI panel.

### Page header
- **`.sticky-section`** — sticky page header that hosts title, filters, and metadata.
- **`.section-title`** / **`.main-title`** — page-level heading.
- **`.main-description`** — small subtitle / page description.
- **`.table-row-count`** — "Showing X of Y" indicator above a data table.
- **`.main-sticky-header`** — sticky filters band (used on the dashboard page).
- **`.form-row`** — flex row that aligns form controls and a primary action.
- **`.metadata-row`** — flex row that pairs metadata with view-toggles.
- **`.metadata-group`** + **`.metadata-item`** — items separated by a right border, last child unstyled.
- **`.metadata-label`** + **`.metadata-value`** — label / value pair.

### Forms
- **`.form-group`** — fixed-width form column.
- **`.form-label`** — block label above a control.
- **`.form-input`** / **`.form-select`** — full-width single-line inputs.
- **`.publish-btn`** — outlined primary action button.
- **`.button-group`** + **`.button-group-item`** — segmented toggle group inside a single rounded border. `.active` item gets the primary fill.

### Filters & search (dashboard)
- **`.filters`** — flex row that groups search and filter controls.
- **`.search-box`** + **`.search-box-input`** + **`.search-box-icon`** — search input with leading icon.
- **`.filter-btn`** + **`.filter-btn-value`** — generic filter trigger button (e.g. date range, status).
- **`.reset-filters-btn`** — soft tinted secondary button.
- **`.filter-wrapper`** + **`.filter-dropdown`** + **`.filter-dropdown-item`** — popover dropdown anchored under a filter button.

### Badges
- **`.badge`** — base pill.
- **`.badge-draft`** — outlined primary draft badge.
- **`.badge-agent`** — solid primary badge.
- **`.badge-agent-secondary`** — soft violet badge.
- **`.badge-tool`** — outlined violet badge for tool nodes.
- **`.badge-default`** — solid primary status badge (e.g. Published). Renders as a pill when scoped under `.deployed-dashboard`. Accepts an inline check-icon SVG.
- **`.badge-secondary`** — soft tinted secondary badge.
- **`.badge-in-progress`** — solid amber badge for in-progress states (legacy; new statuses prefer `.badge-default`).
- **`.badge-skill`** — soft amber/orange badge used in agent flow contexts (legacy; AI Agent page now uses `.badge-default` for "Agent" / "Skill" labels).

### Stats / pills
- **`.agent-stats`** — flex container for one or more `.stat-pill` items, used inside agent flow cards.
- **`.stat-pill`** — outlined rounded-full pill for counts (e.g. "4 Skills", "11 Tools", "$33K annual savings"). Also used as `.ai-recommendation-pill` in the AI Insights cards.

### Data table (dashboard)
- **`.table-container`** — bordered, internally-scrollable table wrapper with sticky thead.
- **`.sb-argstableBlock`** + **`.sb-argstableBlock-head`** + **`.sb-argstableBlock-body`** — the table, header, and body.
- **`.action-name`** + **`.action-description`** — primary cell content (title + secondary line).
- **`.date-cell`** — muted nowrap date column.
- **`.impact-cell`** — muted impact column with a leading trending-up icon (drawn via `::before`).
- **`.action-menu`** + **`.action-menu-popover`** + **`.action-menu-item`** — kebab-trigger row menu.
- **`.no-data`** — centered empty state.
- **`.load-indicator`** + **`.loader-icon`** — bottom-of-table "loading more" spinner. Hidden by default via the `[hidden]` attribute.
- **`.ghost-btn`** — circular icon-only ghost button used inside table cells.

### Agent flow (canvas)
- **`.screen-content`** — canvas-style scroll area with a subtle dotted background pattern.
- **`.flow-container`** — centered canvas with horizontal padding.
- **`.flow-header`** — slot for the lead `.agent-card`.
- **`.agent-card`** — wide top-level agent card. Holds `.agent-avatar`, `.agent-info` (title row + subtitle + badge), description, and `.agent-stats`.
- **`.agent-card-small`** + **`.skill-card`** — narrow child cards under the lead agent. Modifiers: `.selected` adds an emphasized border, `.tool` styles tool variants.
- **`.skill-avatar`** — violet square icon avatar used inside skill cards.
- **`.agent-avatar`** — image/initial avatar used by the lead agent card.
- **`.agent-info`** + **`.agent-title-row`** + **`.agent-title`** + **`.agent-subtitle`** — header column inside an agent card.
- **`.edit-btn`** — inline pencil icon button.
- **`.agent-description`** — body copy inside an agent card.
- **`.flow-row`** + **`.flow-second-row`** + **`.agent-column`** — flex layout for sibling cards. `.flow-row::before` draws the horizontal connector across the row.
- **`.connector-line`** / **`.connector`** — short vertical connector segments above and between cards.
- **`.flow-divider`** + **`.flow-divider-label`** — dashed horizontal rule with a centered text label below the row of cards.
- **`.flow-controls`** + **`.flow-controls-text`** + **`.flow-controls-buttons`** + **`.flow-control-btn`** + **`.flow-zoom`** — floating top-right pan/zoom control pill.

### AI assistant panel
- **`.ai-panel`** — right-side slide-over panel. Animates via width transition. `.open` reveals it.
- **`.ai-panel-header`** + **`.ai-panel-title`** + **`.ai-panel-close-btn`** — header with sparkle icon title and close button.
- **`.ai-panel-content`** — empty state hosting greeting, subtitle, and suggestion buttons.
- **`.ai-panel-icon`** / **`.ai-panel-greeting`** / **`.ai-panel-subtitle`** — empty-state pieces.
- **`.ai-suggestions`** + **`.ai-suggestion-btn`** — vertical stack of suggested prompt chips.
- **`.ai-panel-input-wrapper`** + **`.ai-panel-input-container`** + **`.ai-panel-input`** + **`.ai-panel-send-btn`** — bottom-pinned input + send button.

### AI Insights panel (dashboard)
- **`.ai-insights`** — full-width AI Insights panel above the data table. Collapses via `.ai-insights.collapsed`.
- **`.ai-insights-header`** + **`.ai-insights-toggle`** + **`.ai-insights-sparkles`** + **`.ai-insights-title`** — collapsible panel header with chevron, sparkle icon, and title.
- **`.ai-insights-content`** — wrapper for the collapsible body sections.
- **`.ai-insights-section`** + **`.ai-insights-section-header`** + **`.ai-insights-section-icon`** + **`.ai-insights-section-title`** — generic section pattern (used for "Generated Summary" and "Recommended actions").
- **`.ai-insights-bolt`** — amber lightning-bolt icon variant used by the recommendations section.
- **`.ai-insights-dismiss`** — bell + "Dismiss" link used to remove a section.
- **`.ai-insights-summary`** — body paragraph copy.
- **`.ai-insights-list`** — bulleted summary list with bold leads.
- **`.ai-recommendations`** — three-column grid of recommendation cards.
- **`.ai-recommendation`** + **`.ai-recommendation-title`** + **`.ai-recommendation-text`** + **`.ai-recommendation-pill`** — individual recommendation card with title, body, and outlined value pill.

### Right-side slide-over panel (dashboard)
- **`.narrow-panel`** — secondary right-side slide-over for inline details.
- **`.panel-toggle-btn`** + **`.panel-toggle-icon`** — toggle control for opening / closing the panel.
- **`.top-nav-breadcrumb`** — breadcrumb cluster used inside the panel header.

---

## Usage Rules

1. **All new UI must be built in React JSX — not HTML.** Import components from `/components/`. Never write raw HTML files. The existing HTML files (`AI Agent.html`, `index.html`, etc.) are legacy reference implementations only.
2. **Always link `styles.css`** in any page that hosts the React tree — do not redefine styles locally.
3. **Tokens are sourced from [`.claude/tokens/tokens.md`](../../tokens/tokens.md).** Read that file first whenever you need a value. Never hardcode hex colors, pixel sizes, or other raw literals — reference the appropriate CSS variable instead.
4. **Reach for an existing component first.** If the React catalogue above covers the need, import it. If only the CSS class catalogue covers it, extend or compose a JSX component around those classes — don't drop back to raw HTML.
5. **Scope page-specific overrides under a body-class selector.** The deployed dashboard uses `.deployed-dashboard` to scope its variants of shared shell classes; follow the same pattern for any new page (pass via `AppLayout`'s `bodyClassName` prop).
6. **Match the established surface stack and motion language** as documented in `tokens.md`. Do not introduce shadows, gradients, or transition timings that break the system.
