const treatments = {
  glasses: {
    name: 'ZEISS SMILE® PRO',
    description: 'Explore small-incision laser vision correction for myopia and astigmatism, subject to a full eye assessment.',
    alternatives: 'ZEISS SMILE, CLEAR Max, Femto-LASIK, ASA/TESA, ICL',
    service: 'SMILE PRO / Laser vision correction',
    background: '#e9e3ff',
  },
  reading: {
    name: 'PRESBYOND',
    description: 'Ask about a laser vision option designed to address age-related difficulty focusing up close. An assessment will determine whether it fits your needs.',
    alternatives: 'Reading glasses, lens-based options to discuss with your specialist',
    service: 'PRESBYOND / Reading vision',
    background: '#ffe6da',
  },
  cloudy: {
    name: 'FLACS cataract surgery',
    description: 'Cloudiness or glare deserves an eye examination. If cataracts are diagnosed, ask about laser-assisted surgery and lens choices.',
    alternatives: 'Comprehensive eye assessment, premium intraocular lenses',
    service: 'FLACS / Cataract',
    background: '#ffefbc',
  },
  child: {
    name: "Children's eye care",
    description: 'Start with an age-appropriate eye examination. Your specialist can guide your family through vision development and myopia management.',
    alternatives: 'Myopia control, Ortho-K, RGP lenses',
    service: "Children's eye care",
    background: '#d8f4e6',
  },
  check: {
    name: 'Comprehensive eye screening',
    description: 'A thorough eye check is a sensible starting point for a new concern, a routine review or peace of mind.',
    alternatives: 'Glaucoma screening, specialist-led follow-up as needed',
    service: 'Eye screening / Check-up',
    background: '#dcedfc',
  },
};

const concernButtons = [...document.querySelectorAll('[data-concern]')];
const resultTitle = document.getElementById('resultTitle');
const resultText = document.getElementById('resultText');
const resultAlternatives = document.getElementById('resultAlternatives');
const resultCount = document.getElementById('resultCount');
const finderAnswer = document.getElementById('finderAnswer');
const serviceSelect = document.getElementById('serviceSelect');
const finderBook = document.getElementById('finderBook');
let currentConcern = 'glasses';

function selectConcern(key) {
  const treatment = treatments[key];
  if (!treatment) return;
  currentConcern = key;
  concernButtons.forEach((button, index) => {
    const selected = button.dataset.concern === key;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
    if (selected) resultCount.textContent = `${String(index + 1).padStart(2, '0')} / 05`;
  });
  resultTitle.textContent = treatment.name;
  resultText.textContent = treatment.description;
  resultAlternatives.textContent = treatment.alternatives;
  finderAnswer.style.background = treatment.background;
}
concernButtons.forEach(button => button.addEventListener('click', () => selectConcern(button.dataset.concern)));
finderBook.addEventListener('click', () => {
  serviceSelect.value = treatments[currentConcern].service;
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
function closeMenu() {
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
}
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});

const heroPhoto = document.querySelector('.hero-photo-frame img');
if (heroPhoto) heroPhoto.addEventListener('error', () => heroPhoto.classList.add('is-broken'));

const bookingForm = document.getElementById('bookingForm');
const successPanel = document.getElementById('successPanel');
const startOver = document.getElementById('startOver');
const whatsappFollowup = document.getElementById('whatsappFollowup');
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  // DEMO ONLY: this website has no backend and never transmits or stores form input.
  const service = bookingForm.elements.service.value;
  const branch = bookingForm.elements.branch.value;
  // Only non-personal choices go into the optional WhatsApp link.
  const msg = `Hello OPTIMAX, I would like to enquire about a free eye check. Preferred branch: ${branch}. Service: ${service}.`;
  whatsappFollowup.href = `https://wa.me/60109091201?text=${encodeURIComponent(msg)}`;
  bookingForm.hidden = true;
  successPanel.hidden = false;
  successPanel.querySelector('h4').focus?.();
});
startOver.addEventListener('click', () => {
  bookingForm.reset();
  successPanel.hidden = true;
  bookingForm.hidden = false;
  bookingForm.querySelector('input').focus();
});
document.getElementById('currentYear').textContent = String(new Date().getFullYear());
