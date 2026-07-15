Apply the tokens and design system rules to **all** project files:
- All `.html` files
- All `.css` files

When making any change, always follow the design tokens and guidelines defined in the above files.
If a file does not match the tokens or design system — update it automatically.

## Charts
Always use Apache ECharts for all charts and graphs.
ECharts CDN must be included in all HTML files.
Use examples from https://echarts.apache.org/examples/en/index.html
Apply design tokens from `.claude/tokens/tokens.md` to all charts (colors, fonts, spacing).
Always follow the ECharts guidelines in `.claude/skills/echarts/SKILL.md`

## Accessibility
Always follow the accessibility guidelines in `.claude/skills/accessibility/SKILL.md`
Apply accessibility rules to all HTML files.

## Shared JS
Always include before </body> in every HTML file:
<script src="/js/filter-keyboard.js"></script>

## UX Review
When I write "review UX [filename]" — run the full analysis:

### Persona
Operations Manager:
- Focused on ROI and efficiency metrics
- Needs to justify automation investments to leadership
- Limited time — wants insights in under 2 minutes
- Comfortable with dashboards but not with technical details

### Analysis 1 — Persona
From the perspective of an Operations Manager:
- Can they quickly identify the top automation opportunity?
- Is the Annual Savings figure immediately visible?
- Can they export or share findings easily?
- Are the next steps (Create AI Agent) clear and actionable?
- 3-5 urgent improvement points

### Analysis 2 — Visual Hierarchy
- What does the eye see first, second, third?
- Is Annual Savings the hero metric?
- Does the page guide toward a clear next action?
- Cognitive load score 1-10

### Analysis 3 — Accessibility WCAG 2.1
- Spelling errors in placeholders, buttons, labels
- Missing aria-labels
- Color contrast issues
- canvas/charts missing role=img

### Report Format
- Overall score 1-10
- Findings by priority: critical / warning / improvement
- Fix recommendation for each finding

### Output
Save the UX review report as a markdown file here:
/Users/michaelda/Documents/Claude/Projects/Agentic Analytics/UX Review/ux-report-[filename].md

The report must include:
- Overall score 1-10
- Analysis 1: Persona findings
- Analysis 2: Visual Hierarchy findings
- Analysis 3: WCAG Accessibility findings
- Priority list: critical / warning / improvement
- Fix recommendation for each finding

## Session Summaries
At the end of every session, automatically save a summary markdown file here:
/Users/michaelda/Documents/Claude/Projects/Agentic Analytics/Sessions/

File naming: session-[YYYY-MM-DD]-[topic].md

Each summary must include:
- Date and topic
- Key decisions made
- CSS/HTML changes applied
- Open issues or next steps