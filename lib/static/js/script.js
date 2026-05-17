
    (function () {
      const root = document.documentElement;
      const toggle = document.querySelector('[data-theme-toggle]');
      const navToggle = document.querySelector('.nav-toggle');
      const nav = document.querySelector('.site-nav');
      const header = document.querySelector('.site-header');
      const navLinks = document.querySelectorAll('.site-nav a');
      const sections = [...document.querySelectorAll('main section[id]')];
      let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      function setTheme(nextTheme) {
        root.setAttribute('data-theme', nextTheme);
        theme = nextTheme;
        toggle.innerHTML = theme === 'dark'
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path></svg>';
        toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      }
      setTheme(theme);
      toggle.addEventListener('click', function () {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      });

      function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > 12);
      }
      updateHeader();
      window.addEventListener('scroll', updateHeader, { passive: true });

      navToggle.addEventListener('click', function () {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navToggle.setAttribute('aria-label', !expanded ? 'Close navigation' : 'Open navigation');
        nav.classList.toggle('open', !expanded);
      });

      navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open navigation');
        });
      });

      document.addEventListener('click', function (event) {
        const inside = nav.contains(event.target) || navToggle.contains(event.target);
        if (!inside) {
          nav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Open navigation');
        }
      });

      const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

      document.querySelectorAll('.reveal').forEach(function (el) {
        revealObserver.observe(el);
      });

      const activeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        });
      }, { threshold: 0.45 });

      sections.forEach(function (section) { activeObserver.observe(section); });
    })();
