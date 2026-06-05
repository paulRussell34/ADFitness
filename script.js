document.body.style.opacity = '';
document.body.style.transition = '';
history.scrollRestoration = 'manual';
window.addEventListener('load', () => window.scrollTo(0, 0));

window.addEventListener('hashchange', () => {
  document.body.style.opacity = '1';
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Back to top button
const backToTop = document.getElementById('backToTop');
const footer = document.querySelector('.footer');
(function checkScroll() {
  const scrollY = window.scrollY;
  const footerTop = footer.getBoundingClientRect().top;
  if (scrollY > 10 && footerTop > 80) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  requestAnimationFrame(checkScroll);
})();
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll-triggered fade-in animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  function switchTab(tabId) {
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.hidden = panel.id !== 'tab-' + tabId;
    });
  }
  tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  if (window.location.hash === '#faq') switchTab('faq');
}

// Contact form — AJAX submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formSuccess = document.getElementById('formSuccess');
  const formNote = document.getElementById('formNote');
  const submitBtn = document.getElementById('submitBtn');
  const formReset = document.getElementById('formReset');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        contactForm.style.display = 'none';
        formNote.style.display = 'none';
        formSuccess.style.display = 'block';
        contactForm.reset();
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        alert('Something went wrong. Please try again or call directly.');
      }
    } catch {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      alert('Something went wrong. Please try again or call directly.');
    }
  });

  formReset.addEventListener('click', () => {
    formSuccess.style.display = 'none';
    formNote.style.display = 'block';
    contactForm.style.display = 'flex';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  });
}


// Fade out on page navigation
document.querySelectorAll('a').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.includes('#') || href.startsWith('mailto') || href.startsWith('http')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    document.body.style.transition = 'opacity 0.2s ease';
    document.body.style.opacity = '0';
    setTimeout(() => { window.location.href = href; }, 200);
  });
});
