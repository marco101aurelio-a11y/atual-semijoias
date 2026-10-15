// ============================================================
// ATUAL SEMIJOIAS - INTERACTIONS & DYNAMICS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initTiltCards();
  initProfitCalculator();
  initFaqAccordion();
});

// 1. Sticky Navbar Effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// 2. Mobile Burger Menu
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// 3. Scroll Reveal Animations (Smooth Fade & Zoom)
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translate(0, 0) scale(1)';
        }, delay);
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    const effect = el.getAttribute('data-reveal');
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.opacity = '0';
    if (effect === 'fade-up') {
      el.style.transform = 'translateY(35px)';
    } else if (effect === 'zoom-in') {
      el.style.transform = 'scale(0.92)';
    }
    observer.observe(el);
  });
}

// 4. 3D Tilt Card Effect
function initTiltCards() {
  // Only apply tilt on non-touch devices
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }
}

// 5. Interactive Profit Calculator
function initProfitCalculator() {
  const slider = document.getElementById('piecesSlider');
  const valDisplay = document.getElementById('sliderValDisplay');
  const monthlyDisplay = document.getElementById('monthlyProfitDisplay');
  const ctaBtn = document.getElementById('calcCtaBtn');

  if (!slider || !valDisplay || !monthlyDisplay) return;

  const averageTicket = 110.0; // R$ 110 por semijoia média
  const commissionRate = 0.40; // 40% comissão líquida
  const weeksPerMonth = 4.0;

  function update() {
    const piecesPerWeek = parseInt(slider.value, 10);
    valDisplay.textContent = `${piecesPerWeek} ${piecesPerWeek === 1 ? 'peça/sem' : 'peças/sem'}`;

    const monthlySales = piecesPerWeek * weeksPerMonth * averageTicket;
    const monthlyProfit = monthlySales * commissionRate;

    monthlyDisplay.textContent = monthlyProfit.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    if (ctaBtn) {
      const msg = encodeURIComponent(`Olá! Fiz a simulação de ${piecesPerWeek} peças por semana no site da Atual Semijoias (lucro estimado de R$ ${monthlyProfit.toFixed(2)}) e quero garantir minha maleta consignada!`);
      ctaBtn.href = `https://wa.me/556792574305?text=${msg}`;
    }
  }

  slider.addEventListener('input', update);
  update();
}

// 6. FAQ Accordion
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      items.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-content').style.maxHeight = null;
        other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
