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
  initCatalogCarousel();
  initJewelryModal();
});

// 1. Sticky Navbar Effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
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
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
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

  const averageTicket = 110.0;
  const commissionRate = 0.40;
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
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      items.forEach(other => {
        other.classList.remove('active');
        const otherContent = other.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
        const otherTrigger = other.querySelector('.faq-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// 7. Catalog Carousel Navigation
function initCatalogCarousel() {
  const container = document.getElementById('catalogCarousel');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');

  if (!container || !prevBtn || !nextBtn) return;

  function getStep() {
    const firstSlide = container.querySelector('.catalog-slide');
    if (!firstSlide) return 340;
    // Calculate full width of slide + gap
    const style = window.getComputedStyle(firstSlide);
    const margin = parseFloat(style.marginRight) || 0;
    return firstSlide.getBoundingClientRect().width + 24;
  }

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const step = getStep();
    if (container.scrollLeft <= 15) {
      // Loop smoothly to end
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -step, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const step = getStep();
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 20) {
      // Loop smoothly to beginning
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: step, behavior: 'smooth' });
    }
  });

  // Smooth drag-to-scroll support for desktop
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let dragged = false;

  container.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDown = true;
    dragged = false;
    startX = e.pageX - container.offsetLeft;
    scrollStart = container.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    setTimeout(() => { dragged = false; }, 50);
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - container.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 6) {
      dragged = true;
      container.scrollLeft = scrollStart - walk;
    }
  });

  // Prevent opening modal if user was dragging
  container.querySelectorAll('.catalog-slide').forEach(slide => {
    slide.addEventListener('click', (e) => {
      if (dragged) {
        e.stopImmediatePropagation();
      }
    }, true);
  });
}

// 8. Jewelry Modal Lightbox with Arrows & Keyboard support
function initJewelryModal() {
  const modal = document.getElementById('jewelryModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const prevBtn = document.getElementById('modalPrevBtn');
  const nextBtn = document.getElementById('modalNextBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCounter = document.getElementById('modalCounter');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCta = document.getElementById('modalWhatsAppCta');

  const slides = document.querySelectorAll('.catalog-slide');
  if (!modal || !slides.length) return;

  let currentIndex = 0;

  function loadSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    const slide = slides[currentIndex];
    const title = slide.getAttribute('data-title') || '';
    const badge = slide.getAttribute('data-badge') || '';
    const desc = slide.getAttribute('data-desc') || '';
    const img = slide.getAttribute('data-img') || '';

    if (modalImg) {
      modalImg.src = img;
      modalImg.alt = title;
    }
    if (modalTitle) modalTitle.textContent = title;
    if (modalBadge) modalBadge.textContent = badge;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalCounter) modalCounter.textContent = `${currentIndex + 1} de ${slides.length}`;

    if (modalCta) {
      const msg = encodeURIComponent(`Olá! Vi a peça "${title}" no site da Atual Semijoias e gostaria de saber se ela está disponível na maleta consignada!`);
      modalCta.href = `https://wa.me/556792574305?text=${msg}`;
    }
  }

  function openModal(index) {
    loadSlide(index);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  slides.forEach((slide, idx) => {
    slide.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });
  if (prevBtn) prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    loadSlide(currentIndex - 1);
  });
  if (nextBtn) nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    loadSlide(currentIndex + 1);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') loadSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') loadSlide(currentIndex + 1);
  });
}
