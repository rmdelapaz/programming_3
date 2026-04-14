/**
 * Code Tabs — Three-language tabbed code comparison
 * Designed for Programming Fundamentals: Three Language Approach
 *
 * Usage in HTML:
 * <div class="code-tabs" data-title="Optional Title">
 *   <div class="tab-panel" data-lang="python" data-label="Python">
 *     <pre><code class="language-python">print("Hello")</code></pre>
 *   </div>
 *   <div class="tab-panel" data-lang="javascript" data-label="JavaScript">
 *     <pre><code class="language-javascript">console.log("Hello");</code></pre>
 *   </div>
 *   <div class="tab-panel" data-lang="csharp" data-label="C#">
 *     <pre><code class="language-csharp">Console.WriteLine("Hello");</code></pre>
 *   </div>
 * </div>
 *
 * Features:
 * - Remembers last selected language across all tab groups on the page
 * - Persists preference in localStorage across sessions
 * - "Show All" button to display all three side by side
 * - Copy button per visible panel
 * - Keyboard accessible (arrow keys to switch tabs)
 * - Responsive: stacks vertically on mobile in "Show All" mode
 * - Dark mode aware via CSS variables
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'preferredLang';
    const LANG_ICONS = {
        python: '🐍',
        javascript: '⚡',
        csharp: '🔷'
    };

    document.addEventListener('DOMContentLoaded', initCodeTabs);

    function initCodeTabs() {
        const tabGroups = document.querySelectorAll('.code-tabs');
        if (!tabGroups.length) return;

        const savedLang = localStorage.getItem(STORAGE_KEY) || 'python';

        tabGroups.forEach((group, groupIndex) => {
            buildTabUI(group, groupIndex, savedLang);
        });
    }

    function buildTabUI(group, groupIndex, defaultLang) {
        const panels = Array.from(group.querySelectorAll('.tab-panel'));
        if (!panels.length) return;

        // Optional title
        const title = group.dataset.title;

        // Build tab bar
        const tabBar = document.createElement('div');
        tabBar.className = 'tab-bar';
        tabBar.setAttribute('role', 'tablist');
        tabBar.setAttribute('aria-label', 'Programming language tabs');

        // Title element (if present)
        if (title) {
            const titleEl = document.createElement('span');
            titleEl.className = 'tab-bar-title';
            titleEl.textContent = title;
            tabBar.appendChild(titleEl);
        }

        const tabButtons = [];

        panels.forEach((panel, i) => {
            const lang = panel.dataset.lang || `lang-${i}`;
            const label = panel.dataset.label || lang;
            const icon = LANG_ICONS[lang] || '';

            // Tab button
            const btn = document.createElement('button');
            btn.className = 'tab-button';
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', 'false');
            btn.setAttribute('aria-controls', `panel-${groupIndex}-${i}`);
            btn.setAttribute('data-lang', lang);
            btn.id = `tab-${groupIndex}-${i}`;
            btn.innerHTML = `${icon ? icon + ' ' : ''}${label}`;
            tabBar.appendChild(btn);
            tabButtons.push(btn);

            // Panel setup
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', `tab-${groupIndex}-${i}`);
            panel.id = `panel-${groupIndex}-${i}`;
            panel.style.display = 'none';

            // Add copy button to each panel
            addPanelCopyButton(panel);
        });

        // "Show All" button
        const showAllBtn = document.createElement('button');
        showAllBtn.className = 'tab-button tab-button-all';
        showAllBtn.textContent = '⊞ All';
        showAllBtn.setAttribute('role', 'tab');
        showAllBtn.setAttribute('aria-selected', 'false');
        showAllBtn.setAttribute('data-lang', 'all');
        showAllBtn.title = 'Show all three languages side by side';
        tabBar.appendChild(showAllBtn);
        tabButtons.push(showAllBtn);

        group.insertBefore(tabBar, group.firstChild);

        // Content wrapper for "show all" grid
        const contentWrap = document.createElement('div');
        contentWrap.className = 'tab-content';
        panels.forEach(p => contentWrap.appendChild(p));
        group.appendChild(contentWrap);

        // Tab click handler
        function activateTab(lang) {
            const isAll = lang === 'all';

            tabButtons.forEach(b => {
                const selected = b.dataset.lang === lang;
                b.classList.toggle('active', selected);
                b.setAttribute('aria-selected', selected ? 'true' : 'false');
            });

            contentWrap.classList.toggle('show-all', isAll);

            panels.forEach(p => {
                if (isAll) {
                    p.style.display = '';
                } else {
                    p.style.display = p.dataset.lang === lang ? '' : 'none';
                }
            });

            // Save preference (only for real languages, not "all")
            if (!isAll) {
                localStorage.setItem(STORAGE_KEY, lang);
                // Sync all tab groups on the page
                syncAllGroups(lang);
            }
        }

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => activateTab(btn.dataset.lang));
        });

        // Keyboard navigation
        tabBar.addEventListener('keydown', (e) => {
            const langButtons = tabButtons;
            const currentIdx = langButtons.findIndex(b => b === document.activeElement);
            if (currentIdx < 0) return;

            let nextIdx;
            if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % langButtons.length;
            else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + langButtons.length) % langButtons.length;
            else return;

            e.preventDefault();
            langButtons[nextIdx].focus();
            langButtons[nextIdx].click();
        });

        // Set initial tab
        const hasDefault = panels.some(p => p.dataset.lang === defaultLang);
        activateTab(hasDefault ? defaultLang : panels[0].dataset.lang);

        // Register this group for syncing
        group._activateTab = activateTab;
        group._panels = panels;
    }

    function syncAllGroups(lang) {
        document.querySelectorAll('.code-tabs').forEach(group => {
            if (!group._activateTab) return;
            const contentWrap = group.querySelector('.tab-content');
            // Only sync if not currently in "show all" mode
            if (contentWrap && !contentWrap.classList.contains('show-all')) {
                // Check if this group has a panel for this language
                const hasLang = group._panels.some(p => p.dataset.lang === lang);
                if (hasLang) {
                    group._activateTab(lang);
                }
            }
        });
    }

    function addPanelCopyButton(panel) {
        const pre = panel.querySelector('pre');
        if (!pre) return;

        const btn = document.createElement('button');
        btn.className = 'tab-copy-button';
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code to clipboard');

        btn.addEventListener('click', () => {
            const code = panel.querySelector('code');
            const text = code ? (code.textContent || code.innerText) : '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                    .then(() => copyFeedback(btn, true))
                    .catch(() => copyFallback(text, btn));
            } else {
                copyFallback(text, btn);
            }
        });

        // Wrap pre in relative container
        const wrap = document.createElement('div');
        wrap.className = 'tab-panel-inner';
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);
        wrap.appendChild(btn);
    }

    function copyFallback(text, btn) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        try { copyFeedback(btn, document.execCommand('copy')); }
        catch (_) { copyFeedback(btn, false); }
        document.body.removeChild(ta);
    }

    function copyFeedback(btn, ok) {
        const orig = btn.textContent;
        btn.textContent = ok ? '✓ Copied!' : '✗ Failed';
        btn.classList.add(ok ? 'copy-ok' : 'copy-fail');
        setTimeout(() => {
            btn.textContent = orig;
            btn.classList.remove('copy-ok', 'copy-fail');
        }, 2000);
    }
})();
