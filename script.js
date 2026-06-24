// ---- Live timecode in hero (purely decorative, runs like a playhead) ----
let frame = 0;
const timecodeEl = document.getElementById('timecode');
setInterval(() => {
  frame++;
  const totalSeconds = Math.floor(frame / 24);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  const f = String(frame % 24).padStart(2, '0');
  if (timecodeEl) timecodeEl.textContent = `${h}:${m}:${s}:${f}`;
}, 1000 / 24);

// ---- Work reel data ----
// Edit this array to add your real video projects.
// Set "video" to a real video URL/thumbnail if you have one, or leave hue for a placeholder card.
const projects = [
  { tag: 'Wedding · Highlight Reel', cat: 'wedding', dur: '03:42', hue: '#3a1f1f' },
  { tag: 'Reel · Travel Vlog', cat: 'reels', dur: '00:45', hue: '#1f2a2a' },
  { tag: 'Brand · Product Launch', cat: 'brand', dur: '01:58', hue: '#241f2a' },
  { tag: 'Music Video · Indie Pop', cat: 'music', dur: '03:15', hue: '#2a1f24' },
  { tag: 'Wedding · Teaser', cat: 'wedding', dur: '01:20', hue: '#332018' },
  { tag: 'Reel · Food Review', cat: 'reels', dur: '00:38', hue: '#1c2420' },
  { tag: 'Brand · Corporate Film', cat: 'brand', dur: '02:30', hue: '#201f24' },
  { tag: 'Music Video · Hip Hop', cat: 'music', dur: '03:50', hue: '#241c1c' },
  { tag: 'Wedding · Reception Cut', cat: 'wedding', dur: '04:05', hue: '#2c2018' }
];

const grid = document.getElementById('grid');

function renderGrid(filter) {
  grid.innerHTML = '';
  projects
    .filter(p => filter === 'all' || p.cat === filter)
    .forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'frame';
      div.style.background = `linear-gradient(150deg, ${p.hue}, #0a0a0c)`;
      div.innerHTML = `
        <div class="dur">${p.dur}</div>
        <div class="idx">0${i + 1}</div>
        <div class="play"></div>
        <div class="tag">${p.tag}</div>
      `;
      // If you add real video thumbnails, replace innerHTML above with an <img> tag, e.g.:
      // div.innerHTML = `<img src="thumbs/${p.thumb}" alt="${p.tag}"> ...`;
      grid.appendChild(div);
    });
}
renderGrid('all');

document.querySelectorAll('.filter button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.filter);
  });
});

// ---- Contact form ----
// NOTE: This is a front-end only demo. To actually receive enquiries,
// connect this form to a service like Formspree, EmailJS, or your own backend.
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  formMsg.textContent = `Nandri ${name || 'friend'}! Unga project details kitachu. Soon contact pannuven.`;
  form.reset();
});

// Keep floating labels correctly positioned for <select>, which doesn't
// support the :not(:placeholder-shown) trick used for inputs/textarea.
const projectSelect = document.getElementById('projectType');
if (projectSelect) {
  const field = projectSelect.closest('.field');
  projectSelect.addEventListener('change', () => {
    field.classList.toggle('filled', projectSelect.value !== '');
  });
}
