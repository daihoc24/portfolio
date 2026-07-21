const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    document.querySelector('.reveal')?.classList.add('is-visible');
    document.querySelectorAll('.reveal').forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * .9) element.classList.add('is-visible');
    });
    links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }
}), { threshold: .25 });
sections.forEach((section) => observer.observe(section));

const scrollProgress = document.querySelector('#scroll-progress');
const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollProgress.style.transform = `scaleX(${Math.min(1, progress)})`;
};
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light-theme');
const updateThemeToggle = () => {
  const light = document.body.classList.contains('light-theme');
  themeToggle.querySelector('span').textContent = light ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
};
updateThemeToggle();
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  updateThemeToggle();
});

const backToTop = document.querySelector('#back-to-top');
const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 420);
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const emailCopy = document.querySelector('#email-copy');
const copyNote = document.querySelector('#copy-note');
emailCopy?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('hoangquy4874@gmail.com');
    copyNote.textContent = 'Email copied to clipboard';
    setTimeout(() => { copyNote.textContent = ''; }, 1800);
  } catch {
    copyNote.textContent = 'hoangquy4874@gmail.com';
  }
});

const typingTarget = document.querySelector('#typewriter');
const roles = ['Fullstack Developer', 'Frontend Developer', 'API Builder'];
let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;
function typeRole() {
  const currentRole = roles[roleIndex];
  typingTarget.textContent = currentRole.slice(0, characterIndex);
  if (!isDeleting && characterIndex < currentRole.length) {
    characterIndex += 1;
    setTimeout(typeRole, 75);
  } else if (!isDeleting) {
    isDeleting = true;
    setTimeout(typeRole, 1400);
  } else if (characterIndex > 0) {
    characterIndex -= 1;
    setTimeout(typeRole, 38);
  } else {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 260);
  }
}
if (typingTarget) {
  typingTarget.textContent = '';
  setTimeout(typeRole, 400);
}
