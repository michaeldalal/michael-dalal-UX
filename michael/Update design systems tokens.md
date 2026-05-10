# איך לעדכן את הדיזיין סיסטם

  

## צעדים לעדכון טוקנים וקומפוננטים

  

1. פתח טרמינל ב-VS Code

  

2. הרץ:

```bash

claude

```

  

3. כתוב בפרומפט:

```

fetch the latest components and tokens from the Figma design system and update .claude/skills/design-system/SKILL.md

```

  

זהו — Claude Code יעשה הכל אוטומטית.

  

---

  

## מה קורה מאחורי הקלעים

  

- Claude Code מתחבר ל-Figma MCP

- מושך את הקומפוננטים והטוקנים העדכניים

- מעדכן את הקובץ `.claude/skills/design-system/SKILL.md`

  

---

  

## הגדרות MCP (לפעם אחת בלבד)

  

אם Figma MCP לא מחובר:

```bash

claude mcp add --transport http figma https://mcp.figma.com/mcp --scope user

```

  

ואז בתוך Claude Code:

```

/mcp → בחר figma → Authenticate

```

  

---

  

## קישור לדיזיין סיסטם

  

https://www.figma.com/design/Ga2WCPmnL73jIUnMxgqOTd/C26---Design-System-⭐️--Tali-?node-id=10-68&t=IKGneoUivXgKrSND-1