// Universal Theme System for Service Human

(() => {
    const html = document.documentElement;
    const toggle = document.getElementById('themeToggle');

    // 1) Apply saved manual choice (if any)
    const saved = localStorage.getItem('theme'); // "light" | "dark" | null
    if (saved === 'light' || saved === 'dark') {
        html.classList.remove('light', 'dark');
        html.classList.add(saved);
        if (toggle) toggle.setAttribute('aria-pressed', saved === 'dark' ? 'true' : 'false');
    }

    // Helper to compute the current theme
    const currentMode = () =>
        html.classList.contains('light') ? 'light' :
        html.classList.contains('dark') ? 'dark' :
        (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    // 2) Manual toggle (persisted)
    toggle?.addEventListener('click', () => {
        const next = currentMode() === 'light' ? 'dark' : 'light';
        html.classList.remove('light', 'dark');
        html.classList.add(next);
        localStorage.setItem('theme', next);
        toggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    });

    // 3) If user never made a choice, follow OS preference
    const mq = matchMedia('(prefers-color-scheme: light)');
    mq.addEventListener('change', e => {
        if (localStorage.getItem('theme')) return; // manual choice wins
        html.classList.remove('light', 'dark');
        html.classList.add(e.matches ? 'light' : 'dark');
        toggle.setAttribute('aria-pressed', e.matches ? 'false' : 'true');
    });
})();