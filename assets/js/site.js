(() => {
  'use strict';
  const cfg = window.TAPORAA_CONFIG || {};
  const clean = (value) => String(value || '').trim();
  const email = clean(cfg.contactEmail);
  const privacyEmail = clean(cfg.privacyEmail || cfg.contactEmail);
  const phone = clean(cfg.contactPhone);
  const legalName = clean(cfg.legalOperatorName);

  document.querySelectorAll('[data-current-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
  document.querySelectorAll('[data-operator-name]').forEach(el => { el.textContent = legalName || '[Add the legal operator\'s name in site-config.js]'; });
  document.querySelectorAll('[data-contact-email]').forEach(el => {
    if (email) { el.textContent = email; if (el.tagName === 'A') el.href = `mailto:${email}`; }
    else el.textContent = '[Add a monitored business email in site-config.js]';
  });
  document.querySelectorAll('[data-privacy-email]').forEach(el => { el.textContent = privacyEmail || '[Add a monitored privacy email in site-config.js]'; });

  const missing = [];
  if (!legalName) missing.push('legalOperatorName');
  if (!email) missing.push('contactEmail');
  if (!privacyEmail) missing.push('privacyEmail');
  const configNotice = document.getElementById('privacy-config-notice') || document.getElementById('terms-config-notice');
  if (configNotice && missing.length === 0) configNotice.hidden = true;

  const contactContainer = document.getElementById('contact-details');
  if (contactContainer) {
    if (email || phone || clean(cfg.postalAddress)) {
      contactContainer.innerHTML = '';
      if (email) {
        const p = document.createElement('p'); const a = document.createElement('a');
        a.href = `mailto:${email}`; a.textContent = email; p.append('Email: ', a); contactContainer.append(p);
      }
      if (phone) {
        const p = document.createElement('p'); const a = document.createElement('a');
        a.href = `tel:${phone.replace(/[^+\d]/g, '')}`; a.textContent = phone; p.append('Phone: ', a); contactContainer.append(p);
      }
      if (clean(cfg.postalAddress)) {
        const p = document.createElement('p'); p.textContent = `Business address: ${clean(cfg.postalAddress)}`; contactContainer.append(p);
      }
    }
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // This static contact form creates an email draft on the visitor's device; it does not store data on this site.
  const form = document.getElementById('mailto-contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    if (!email) {
      form.hidden = true;
      if (status) status.textContent = 'The contact form will be available after a business email is configured.';
    } else {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const name = clean(data.get('name'));
        const reply = clean(data.get('reply'));
        const topic = clean(data.get('topic'));
        const message = clean(data.get('message'));
        if (!name || !reply || !message) { if (status) status.textContent = 'Please complete the required fields.'; return; }
        const subject = encodeURIComponent(`Taporaa website enquiry: ${topic || 'General'}`);
        const body = encodeURIComponent(`Name: ${name}\nReply email: ${reply}\nTopic: ${topic || 'General'}\n\n${message}\n\nThis message was prepared using the Taporaa website contact form.`);
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        if (status) status.textContent = 'Your email application should open with the enquiry. Review and send it there.';
      });
    }
  }
})();
