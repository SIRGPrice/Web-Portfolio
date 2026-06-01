/* =========================================================
   AI Engineering Portfolio
   Renders the open-source projects grid from the public
   GitHub REST API. No tokens, no build step.
   ========================================================= */

(function () {
    'use strict';

    const USER = 'SIRGPrice';
    const API = 'https://api.github.com';
    const HEADERS = { Accept: 'application/vnd.github+json' };

    const LANG_COLORS = {
        JavaScript: '#f1e05a',
        TypeScript: '#3178c6',
        Python: '#3572A5',
        Java: '#b07219',
        Kotlin: '#A97BFF',
        Swift: '#F05138',
        Go: '#00ADD8',
        Rust: '#dea584',
        C: '#555555',
        'C++': '#f34b7d',
        'C#': '#178600',
        PHP: '#4F5D95',
        Ruby: '#701516',
        HTML: '#e34c26',
        CSS: '#563d7c',
        SCSS: '#c6538c',
        Shell: '#89e051',
        Bash: '#89e051',
        PowerShell: '#012456',
        Dart: '#00B4AB',
        Lua: '#000080',
        Elixir: '#6e4a7e',
        Haskell: '#5e5086',
        Scala: '#c22d40',
        R: '#198CE7',
        Jupyter: '#DA5B0B',
        Dockerfile: '#384d54',
        Makefile: '#427819',
        Vue: '#41b883',
        Svelte: '#ff3e00'
    };

    const $ = (id) => document.getElementById(id);

    function escapeHTML(str) {
        return String(str ?? '').replace(/[&<>"']/g, (c) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    function formatNumber(n) {
        if (n == null || isNaN(n)) return '–';
        if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'k';
        return String(n);
    }

    function ghIcon() {
        return `<svg class="gh" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.76.12 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
        </svg>`;
    }

    function arrow() {
        return `<span class="card-arrow" aria-hidden="true">↗</span>`;
    }

    async function fetchJSON(url) {
        const res = await fetch(url, { headers: HEADERS });
        if (!res.ok) throw new Error(`GitHub API ${res.status} on ${url}`);
        return res.json();
    }

    function renderRepos(repos) {
        const grid = $('projects-grid');
        grid.innerHTML = '';

        if (!repos.length) {
            grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:2rem;">No public repositories.</p>';
            return;
        }

        const sorted = repos
            .filter((r) => !r.fork)
            .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
                          || new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 6);

        sorted.forEach((repo) => {
            const lang = repo.language;
            const langColor = (lang && LANG_COLORS[lang]) || '#888';
            const desc = repo.description || 'No description provided.';
            const updated = new Date(repo.pushed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

            const card = document.createElement('a');
            card.className = 'card';
            card.href = repo.html_url;
            card.target = '_blank';
            card.rel = 'noopener';
            card.innerHTML = `
                <div class="card-head">
                    <h3 class="card-title">${ghIcon()}<span>${escapeHTML(repo.name)}</span></h3>
                    ${arrow()}
                </div>
                <p class="card-desc">${escapeHTML(desc)}</p>
                <div class="card-foot">
                    ${lang ? `<span class="lang"><span class="lang-dot" style="background:${langColor}"></span>${escapeHTML(lang)}</span>` : ''}
                    <span class="metric" title="Stars"><span class="icon">★</span>${formatNumber(repo.stargazers_count)}</span>
                    <span class="metric" title="Forks"><span class="icon">⑂</span>${formatNumber(repo.forks_count)}</span>
                    <span class="updated">${updated}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    async function loadRepos() {
        try {
            const data = await fetchJSON(`${API}/users/${USER}/repos?per_page=100&type=owner&sort=updated`);
            renderRepos(data);
        } catch (err) {
            console.error('Repos load failed:', err);
            const grid = $('projects-grid');
            grid.innerHTML = `
                <a class="card" href="https://github.com/${USER}?tab=repositories" target="_blank" rel="noopener"
                   style="grid-column:1/-1;text-align:center;color:var(--muted);align-items:center;justify-content:center;">
                    <p style="margin:0;">Repository list unavailable.</p>
                    <p style="margin:0.5rem 0 0;font-size:0.85rem;color:var(--ink);">Browse on GitHub →</p>
                </a>`;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadRepos();
        const y = new Date().getFullYear();
        const fy = $('footer-year'); if (fy) fy.textContent = y;
        const hy = $('hero-year');   if (hy) hy.textContent = y;
    });
})();
