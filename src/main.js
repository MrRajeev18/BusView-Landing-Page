/**
 * BusView - Smart School Transportation Platform
 * Client-Side Application Script
 * Company: Seniorbit OPC Private Limited
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initHeroMapSimulation();
  initShowcaseTabs();
  initFaqAccordion();
  initEnquiryForms();
  initModalTriggers();
  initInteractiveCounters();
});

/* ==========================================================================
   1. Sticky Header & Active State
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close when clicking nav link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. Live Hero Map Simulation (Real-time Bus Tracking Experience)
   ========================================================================== */
function initHeroMapSimulation() {
  const busMarker = document.getElementById('heroBusMarker');
  const busPulse = document.getElementById('heroBusPulse');
  const speedEl = document.getElementById('heroSpeedVal');
  const etaMinutesEl = document.getElementById('heroEtaMinutes');
  const nextStopEl = document.getElementById('heroNextStop');
  const pauseBtn = document.getElementById('heroPauseBtn');
  const switchBusBtn = document.getElementById('heroSwitchBusBtn');
  
  if (!busMarker) return;

  // Waypoints along simulated route (SVG coordinates)
  const routeWaypoints = [
    { x: 70, y: 180, stop: 'Greenwood Heights (Departed)', eta: 12 },
    { x: 140, y: 150, stop: 'St. Jude Crossroad', eta: 9 },
    { x: 220, y: 175, stop: 'Maple Oak Avenue', eta: 6 },
    { x: 290, y: 130, stop: 'Pinecrest Circle (Next Stop)', eta: 4 },
    { x: 370, y: 160, stop: 'Sunrise Gardens Main Gate', eta: 2 },
    { x: 440, y: 190, stop: 'Heritage Public School Campus', eta: 0 }
  ];

  let currentSegment = 0;
  let progress = 0;
  let isRunning = true;
  let simulatedSpeed = 32;

  function animateBus() {
    if (isRunning) {
      progress += 0.006;
      if (progress >= 1) {
        progress = 0;
        currentSegment = (currentSegment + 1) % (routeWaypoints.length - 1);
      }

      const p1 = routeWaypoints[currentSegment];
      const p2 = routeWaypoints[currentSegment + 1];

      // Interpolate position
      const curX = p1.x + (p2.x - p1.x) * progress;
      const curY = p1.y + (p2.y - p1.y) * progress;

      // Update bus marker
      busMarker.setAttribute('transform', `translate(${curX}, ${curY})`);
      if (busPulse) {
        busPulse.setAttribute('cx', curX);
        busPulse.setAttribute('cy', curY);
      }

      // Slightly fluctuate speed realistically
      if (Math.random() < 0.05) {
        simulatedSpeed = Math.floor(26 + Math.random() * 12);
        if (speedEl) speedEl.textContent = `${simulatedSpeed} km/h`;
      }

      // Update ETA and next stop
      if (etaMinutesEl) {
        const remainingEta = Math.max(1, Math.round(p1.eta - (p1.eta - p2.eta) * progress));
        etaMinutesEl.textContent = `${remainingEta} min`;
      }

      if (nextStopEl) {
        nextStopEl.textContent = p2.stop;
      }
    }

    requestAnimationFrame(animateBus);
  }

  requestAnimationFrame(animateBus);

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      pauseBtn.innerHTML = isRunning 
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause Tracking`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume Live Tracking`;
    });
  }

  if (switchBusBtn) {
    let currentBus = 'Bus #04';
    switchBusBtn.addEventListener('click', () => {
      if (currentBus === 'Bus #04') {
        currentBus = 'Bus #12';
        switchBusBtn.textContent = 'Showing: Bus #12 (Afternoon Return)';
      } else {
        currentBus = 'Bus #04';
        switchBusBtn.textContent = 'Showing: Bus #04 (Morning Run)';
      }
      currentSegment = 0;
      progress = 0;
    });
  }
}

/* ==========================================================================
   4. Product Interface Showcase Tabs
   ========================================================================== */
function initShowcaseTabs() {
  const tabs = document.querySelectorAll('.showcase-tab-btn');
  const panels = document.querySelectorAll('.showcase-tab-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      // Update active tab buttons
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Switch panels
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === targetId) {
          p.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   5. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other items for neat UX
      items.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   6. School Enquiry Form Validation & Realistic Submission
   ========================================================================== */
function initEnquiryForms() {
  const forms = document.querySelectorAll('.enquiry-form');
  forms.forEach(form => setupForm(form));
}

function setupForm(form) {
  const successBanner = form.parentElement.querySelector('.form-success-banner');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Radio selection styling
  const radioCards = form.querySelectorAll('.radio-card');
  radioCards.forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    if (!radio) return;

    card.addEventListener('click', () => {
      radio.checked = true;
      radioCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Fields to validate
    const schoolName = form.querySelector('[name="schoolName"]');
    const contactName = form.querySelector('[name="contactName"]');
    const designation = form.querySelector('[name="designation"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const city = form.querySelector('[name="city"]');
    const state = form.querySelector('[name="state"]');
    const busCount = form.querySelector('[name="busCount"]');
    const interest = form.querySelector('[name="interest"]:checked');
    const message = form.querySelector('[name="message"]');

    let isValid = true;

    // Helper validator
    function validateField(input, condition) {
      const group = input.closest('.form-group');
      if (!condition) {
        input.classList.add('invalid');
        if (group) group.classList.add('has-error');
        isValid = false;
      } else {
        input.classList.remove('invalid');
        if (group) group.classList.remove('has-error');
      }
    }

    validateField(schoolName, schoolName && schoolName.value.trim().length >= 3);
    validateField(contactName, contactName && contactName.value.trim().length >= 2);
    validateField(designation, designation && designation.value.trim().length >= 2);
    
    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(email, email && emailRegex.test(email.value.trim()));

    // Phone check (at least 8-15 digits)
    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    validateField(phone, phone && phoneRegex.test(phone.value.trim()));

    validateField(city, city && city.value.trim().length >= 2);
    validateField(state, state && state.value !== '');
    validateField(busCount, busCount && parseInt(busCount.value, 10) > 0);

    if (!isValid) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Submit state animation
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg> Submitting Enquiry...`;
    }

    // Create record
    const enquiryId = 'BV-' + Math.floor(100000 + Math.random() * 900000);
    const submissionData = {
      enquiryId,
      submittedAt: new Date().toISOString(),
      schoolName: schoolName.value.trim(),
      contactName: contactName.value.trim(),
      designation: designation.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      city: city.value.trim(),
      state: state.value,
      busCount: busCount.value,
      interest: interest ? interest.value : 'Free Pilot Programme',
      message: message ? message.value.trim() : ''
    };

    // Store in browser local storage for realistic persistence without fake backend
    try {
      const existing = JSON.parse(localStorage.getItem('busview_enquiries') || '[]');
      existing.unshift(submissionData);
      localStorage.setItem('busview_enquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage unavailable:', err);
    }

    setTimeout(() => {
      form.style.display = 'none';
      if (successBanner) {
        successBanner.classList.add('active');
        const refIdSpan = successBanner.querySelector('.reference-id');
        if (refIdSpan) refIdSpan.textContent = enquiryId;

        const schoolNameSpan = successBanner.querySelector('.submitted-school');
        if (schoolNameSpan) schoolNameSpan.textContent = submissionData.schoolName;

        const emailSpan = successBanner.querySelector('.submitted-email');
        if (emailSpan) emailSpan.textContent = submissionData.email;

        const programSpan = successBanner.querySelector('.submitted-program');
        if (programSpan) programSpan.textContent = submissionData.interest;
      }
    }, 600);
  });
}

/* ==========================================================================
   7. Modal Controller (Request Demo & Pilot Application)
   ========================================================================== */
function initModalTriggers() {
  const modal = document.getElementById('enquiryModal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('[data-open-modal="enquiry"]');
  const closeButtons = modal.querySelectorAll('[data-close-modal]');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const defaultInterest = btn.getAttribute('data-interest') || 'Product Demonstration';
      
      // Preselect radio if specified
      const targetRadio = modal.querySelector(`input[name="interest"][value="${defaultInterest}"]`);
      if (targetRadio) {
        targetRadio.checked = true;
        const parentCard = targetRadio.closest('.radio-card');
        if (parentCard) {
          modal.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
          parentCard.classList.add('selected');
        }
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   8. Stats Counter Animation
   ========================================================================== */
function initInteractiveCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
        }, 25);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}
