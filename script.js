/* =========================================================
   SIRGPrice · GitHub Portfolio
   Fetches profile + repos from the public GitHub API.
   No tokens, no build step. Public, unauthenticated.
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
        Svelte: '#ff3e00',
        MDX: '#fcb32c',
        Astro: '#ff5d01'
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

    async function fetchJSON(url) {
        const res = await fetch(url, { headers: HEADERS });
        if (!res.ok) throw new Error(`GitHub API ${res.status} on ${url}`);
        return res.json();
    }

    async function loadProfile() {
        try {
            const data = await fetchJSON(`${API}/users/${USER}`);

            $('name').textContent = data.name || data.login;
            $('bio').textContent = data.bio || 'Building things on GitHub.';

            const avatar = $('avatar');
            if (data.avatar_url) avatar.src = data.avatar_url;

            const setMeta = (id, condition, value, link) => {
                const el = $(id);
                if (!condition) { el.hidden = true; return; }
                el.hidden = false;
                if (link) {
                    el.querySelector('a').href = link;
                    el.querySelector('a').textContent = value;
                } else {
                    el.querySelector('span:last-child').textContent = value;
                }
            };

            setMeta('meta-location', !!data.location, data.location);
            setMeta('meta-company', !!data.company, data.company);
            setMeta('meta-blog', !!data.blog, data.blog.startsWith('http') ? data.blog : `https://${data.blog}`, data.blog.startsWith('http') ? data.blog : `https://${data.blog}`);

            $('stat-repos').textContent = formatNumber(data.public_repos);
            $('stat-followers').textContent = formatNumber(data.followers);
            $('stat-following').textContent = formatNumber(data.following);

            document.title = `${data.name || data.login} · GitHub Portfolio`;
        } catch (err) {
            console.error('Profile load failed:', err);
            $('bio').textContent = 'Could not load profile. Visit GitHub for the latest.';
        }
    }

    async function loadTotalStars() {
        try {
            let stars = 0;
            let page = 1;
            const perPage = 100;
            while (page <= 5) {
                const data = await fetchJSON(`${API}/users/${USER}/repos?per_page=${perPage}&page=${page}&type=owner&sort=updated`);
                if (!data.length) break;
                data.forEach((r) => { stars += r.stargazers_count || 0; });
                if (data.length < perPage) break;
                page++;
            }
            $('stat-stars').textContent = formatNumber(stars);
        } catch (err) {
            console.warn('Stars load failed:', err);
            $('stat-stars').textContent = '–';
        }
    }

    function renderRepos(repos) {
        const grid = $('projects-grid');
        grid.innerHTML = '';

        if (!repos.length) {
            grid.innerHTML = '<p class="empty" style="color:var(--ink-dim);grid-column:1/-1;text-align:center;padding:32px;">No public repositories yet.</p>';
            return;
        }

        const sorted = repos
            .filter((r) => !r.fork)
            .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0) || new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 12);

        sorted.forEach((repo) => {
            const lang = repo.language;
            const langColor = (lang && LANG_COLORS[lang]) || '#888';
            const desc = repo.description || 'No description provided.';
            const updated = new Date(repo.pushed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

            const card = document.createElement('a');
            card.className = 'card glass';
            card.href = repo.html_url;
            card.target = '_blank';
            card.rel = 'noopener';
            card.innerHTML = `
                <div class="card-head">
                    <h3 class="card-title">${escapeHTML(repo.name)}</h3>
                    <span class="card-arrow" aria-hidden="true">↗</span>
                </div>
                <p class="card-desc">${escapeHTML(desc)}</p>
                <div class="card-foot">
                    ${lang ? `<span class="lang"><span class="lang-dot" style="background:${langColor}"></span>${escapeHTML(lang)}</span>` : ''}
                    <span class="metric" title="Stars"><span class="icon">★</span>${formatNumber(repo.stargazers_count)}</span>
                    <span class="metric" title="Forks"><span class="icon">⑂</span>${formatNumber(repo.forks_count)}</span>
                    <span class="metric" title="Last updated" style="margin-left:auto;">${updated}</span>
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
                <div class="card glass" style="grid-column:1/-1;text-align:center;color:var(--ink-dim);">
                    <p style="margin:0;">Couldn't load repositories right now.</p>
                    <p style="margin:8px 0 0;font-size:13px;">
                        <a href="https://github.com/${USER}?tab=repositories" target="_blank" rel="noopener" style="color:var(--ink);border-bottom:1px dashed var(--glass-border);">
                            Browse them on GitHub →
                        </a>
                    </p>
                </div>
            `;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadProfile();
        loadRepos();
        loadTotalStars();
    });
})();
