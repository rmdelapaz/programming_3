# Programming Fundamentals: Three Language Approach — continue.md

## Project Overview
- **Location:** `\\wsl$\Ubuntu\home\practicalace\projects\programming`
- **Template Source:** `\\wsl$\Ubuntu\home\practicalace\projects\course_template`
- **Course:** Programming Fundamentals: Three Language Approach (Python, JavaScript, C#)
- **Audience:** True beginners, also usable by instructors in a classroom setting
- **Total Lessons:** 27 across 9 modules

## What's Been Built

### Infrastructure (Session 1 — 2026-04-13)
- [x] Folder structure: `styles/`, `js/`, `images/`, `assets/`
- [x] `course-config.json` — full 9-module, 27-lesson config
- [x] `styles/main.css` — template CSS + code-tabs CSS + instructor-note CSS + language accent colors
- [x] `js/clipboard.js` — from template (modified to skip .code-tabs blocks)
- [x] `js/course-enhancements.js` — from template (unchanged)
- [x] `js/code-tabs.js` — **NEW** custom tabbed code comparison component

### Custom Components
1. **Tabbed Code Viewer** (`code-tabs.js` + CSS in `main.css`)
   - Three language tabs (Python, JavaScript, C#) with icons
   - "Show All" button for side-by-side grid view
   - Language selection syncs across all tab groups on the page
   - Preference persisted in localStorage across sessions (key: `preferredLang`)
   - Per-panel copy buttons
   - Keyboard accessible (arrow keys)
   - Responsive: stacks vertically on mobile in "All" mode
   - Print: shows all panels with language labels
   - Language-specific accent colors on active tabs
   
2. **Instructor Notes** (CSS only, uses `<details>`)
   - Collapsible `<details class="instructor-note">` blocks
   - Dashed border, subtle gradient background
   - Delivery guidance visible to everyone (not walled off)

3. **Language Badge Classes** + **Comparison Table** styling

### Pages Built
- [x] `index.html` — Course homepage with all 9 modules
- [x] `lesson_01.html` — Welcome & Course Overview (MODEL LESSON)
- [x] `lesson_02.html` — Setting Up Your Environment
- [x] `lesson_03.html` — Hello World in Three Languages
- [x] `lesson_04.html` — Variables and Constants
- [x] `lesson_05.html` — Data Types: Numbers, Strings, Booleans
- [x] `lesson_06.html` — Type Conversion and Coercion
- [x] `lesson_07.html` — Conditionals: if, else, and switch
- [x] `lesson_08.html` — Loops: for and while
- [x] `lesson_09.html` — Logical Operators and Truthiness
- [x] `lesson_10.html` — Defining and Calling Functions
- [x] `lesson_11.html` — Parameters, Arguments, and Return Values
- [x] `lesson_12.html` — Scope and Closures
- [x] `lesson_13.html` — Arrays and Lists
- [x] `lesson_14.html` — Dictionaries, Objects, and Maps
- [x] `lesson_15.html` — Iterating Over Collections
- [x] `lesson_16.html` — Classes and Objects
- [x] `lesson_17.html` — Properties, Methods, and Constructors
- [x] `lesson_18.html` — Inheritance and Polymorphism
- [x] `lesson_19.html` — Try, Catch, and Finally
- [x] `lesson_20.html` — Custom Errors and Exceptions
- [x] `lesson_21.html` — Debugging Strategies
- [x] `lesson_22.html` — Reading and Writing Files
- [x] `lesson_23.html` — Working with JSON
- [x] `lesson_24.html` — Making API Requests

### Lessons Completed: 24 of 27

## HTML Patterns

### Code Tabs
```html
<div class="code-tabs" data-title="Optional Title">
  <div class="tab-panel" data-lang="python" data-label="Python">
    <pre><code class="language-python">print("Hello")</code></pre>
  </div>
  <div class="tab-panel" data-lang="javascript" data-label="JavaScript">
    <pre><code class="language-javascript">console.log("Hello");</code></pre>
  </div>
  <div class="tab-panel" data-lang="csharp" data-label="C#">
    <pre><code class="language-csharp">Console.WriteLine("Hello");</code></pre>
  </div>
</div>
```

### Instructor Notes
```html
<details class="instructor-note">
    <summary>🎓 Instructor Note: Delivery Guidance</summary>
    <div class="note-content">
        <p>Guidance text here.</p>
    </div>
</details>
```

### Standard Lesson HTML Head (copy for each new lesson)
```html
<script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    window.__mermaid = mermaid;
    const isDark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    mermaid.initialize({
        startOnLoad: true,
        theme: isDark ? 'dark' : 'default',
        themeVariables: isDark
            ? { primaryColor: '#334155', primaryTextColor: '#e2e8f0', primaryBorderColor: '#6366f1', lineColor: '#94a3b8', secondaryColor: '#1e293b', tertiaryColor: '#0f172a' }
            : { primaryColor: '#eff6ff', primaryTextColor: '#1e293b', primaryBorderColor: '#3b82f6', lineColor: '#64748b', secondaryColor: '#f8fafc', tertiaryColor: '#f1f5f9' }
    });
</script>
```

### Standard Lesson JS Footer (copy for each new lesson)
```html
<script src="js/clipboard.js"></script>
<script src="js/code-tabs.js"></script>
<script src="js/course-enhancements.js"></script>
```

## What's Left to Build

### Lessons Remaining (9 of 27)
- [x] lesson_16.html — Classes and Objects ✅
- [x] lesson_17.html — Properties, Methods, and Constructors ✅
- [x] lesson_18.html — Inheritance and Polymorphism ✅
- [x] lesson_19.html — Try, Catch, and Finally ✅
- [x] lesson_20.html — Custom Errors and Exceptions ✅
- [x] lesson_21.html — Debugging Strategies ✅
- [x] lesson_22.html — Reading and Writing Files ✅
- [x] lesson_23.html — Working with JSON ✅
- [x] lesson_24.html — Making API Requests ✅
- [ ] lesson_25.html — Project Planning and Design
- [ ] lesson_26.html — Building Your Project
- [ ] lesson_27.html — Code Review and Next Steps

### Other
- [ ] favicon.png (needs design/creation)
- [ ] Review and test all interactive components in browser
- [ ] Verify prev/next navigation links across all lessons

## Key Decisions
- Blue branding (kept from template)
- Tabbed code display with "Show All" option
- Instructor notes = delivery guidance, visible to everyone
- True beginner audience
- Lesson format: objectives → concept → code comparison → exercises → quiz → summary
- C# uses `dotnet` CLI / VS Code
- JS/C# share syntax patterns (semicolons, //, {}) — call this out as a recurring theme
- Python booleans are capitalized (True/False) — call out as common gotcha
- String interpolation introduced early (f"", `${}`, $"") for use in exercises

## Lesson Content Notes for Next Session
