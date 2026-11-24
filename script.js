const btn = document.querySelector('.menu-btn'), body = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = body.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
body.addEventListener('click', e => {
  if (e.target.closest('nav a')) { body.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
});
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// Contact form validation
const form = document.getElementById('form');
const status = document.getElementById('status');
if (form) {
const rules = {
  name: v => v.trim().length < 2 ? 'Enter your name (at least 2 characters).' : '',
  email: v => !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Enter a valid email, like name@example.com.' : '',
  subject: v => v.trim().length < 3 ? 'Enter a subject (at least 3 characters).' : '',
  message: v => v.trim().length < 10 ? 'Write a message of at least 10 characters.' : ''
};
const names = Object.keys(rules);
const check = f => {
  const m = rules[f.name](f.value);
  document.getElementById(f.id + '-err').textContent = m;
  f.setAttribute('aria-invalid', m ? 'true' : 'false');
  return !m;
};
names.forEach(n => {
  const f = form.elements[n];
  f.addEventListener('blur', () => check(f));
  f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') check(f); });
});
form.addEventListener('submit', e => {
  e.preventDefault();
  status.className = 'formstatus'; status.textContent = '';
  names.forEach(n => check(form.elements[n]));
  const bad = names.find(n => form.elements[n].getAttribute('aria-invalid') === 'true');
  if (bad) { form.elements[bad].focus(); return; }
  if (form.elements.website.value) return; // honeypot
  // TODO: send to a real endpoint (Formspree, EmailJS or your own API).
  status.className = 'formstatus ok';
  status.textContent = 'Thanks, your message was validated. Connect a form service to deliver it.';
  form.reset();
});
}
