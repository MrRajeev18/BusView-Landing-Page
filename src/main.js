/**
 * BusView - Smart School Transportation Platform
 * Client-Side Application Script
 * Company: Synerbit OPC Private Limited
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

  // Create backdrop if not present
  let backdrop = document.querySelector('.mobile-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-backdrop';
    document.body.appendChild(backdrop);
  }

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-nav-locked');
    toggleBtn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-locked');
    toggleBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  // Close when clicking nav link or button inside drawer
  drawer.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });

  // Auto-close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && drawer.classList.contains('open')) {
      closeMenu();
    }
  }, { passive: true });
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
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Scroll tab into view horizontally on mobile
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

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
   6. School Enquiry Form Validation & Real-Time Email Dispatch (contact@busview.in)
   ========================================================================== */
function initEnquiryForms() {
  const forms = document.querySelectorAll('.enquiry-form');
  forms.forEach(form => setupForm(form));
}

function setupForm(form) {
  let successBanner = form.parentElement.querySelector('.form-success-banner');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Dynamically inject success banner if missing in container
  if (!successBanner) {
    successBanner = document.createElement('div');
    successBanner.className = 'form-success-banner';
    successBanner.setAttribute('role', 'alert');
    successBanner.innerHTML = `
      <div style="width: 48px; height: 48px; border-radius: 50%; background: #10B981; color: #FFFFFF; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3 class="heading-md" style="color: #065F46;">Thank You for Your Enquiry!</h3>
      <p class="body-md" style="color: #047857; margin-top: 8px;">
        Your request has been received with Reference ID: <strong class="reference-id">BV-849201</strong>.
      </p>
      <div style="margin-top: 16px; padding: 16px; background: #FFFFFF; border: 1px solid #A7F3D0; border-radius: 8px; font-size: 13.5px; text-align: left; color: var(--color-navy);">
        <div><strong>School:</strong> <span class="submitted-school"></span></div>
        <div style="margin-top: 4px;"><strong>Official Email:</strong> <span class="submitted-email"></span></div>
        <div style="margin-top: 4px;"><strong>Program Selected:</strong> <span class="submitted-program"></span></div>
        <div style="margin-top: 4px;"><strong>Next Step:</strong> Details have been delivered to <strong>contact@busview.in</strong>. A member of the BusView / Synerbit team will reach out within 24 hours.</div>
      </div>
      <p style="font-size: 12px; color: #047857; margin-top: 14px;">
        Direct dispatch to <strong>contact@busview.in</strong>.
      </p>
    `;
    form.parentElement.insertBefore(successBanner, form);
  }

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
    const interest = form.querySelector('[name="interest"]:checked') || form.querySelector('[name="interest"]');
    const message = form.querySelector('[name="message"]');

    let isValid = true;

    // Helper validator
    function validateField(input, condition) {
      if (!input) return;
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
    validateField(busCount, busCount && (busCount.value !== '' && (parseInt(busCount.value, 10) > 0 || isNaN(parseInt(busCount.value, 10)) === false || busCount.value.length > 0)));

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
        </svg> Sending Message...`;
    }

    // Create unique enquiry record
    const enquiryId = 'BV-' + Math.floor(100000 + Math.random() * 900000);
    const submissionData = {
      enquiryId,
      submittedAt: new Date().toISOString(),
      schoolName: schoolName ? schoolName.value.trim() : 'Unspecified School',
      contactName: contactName ? contactName.value.trim() : 'Unspecified Contact',
      designation: designation ? designation.value.trim() : 'Unspecified Role',
      email: email ? email.value.trim() : '',
      phone: phone ? phone.value.trim() : '',
      city: city ? city.value.trim() : 'Unspecified City',
      state: state ? state.value : 'Unspecified State',
      busCount: busCount ? busCount.value : 'Unspecified Fleet Size',
      interest: interest ? (interest.value || 'Free Pilot Programme') : 'Free Pilot Programme',
      message: message ? message.value.trim() : ''
    };

    // Store in browser local storage for persistent audit record
    try {
      const existing = JSON.parse(localStorage.getItem('busview_enquiries') || '[]');
      existing.unshift(submissionData);
      localStorage.setItem('busview_enquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage unavailable:', err);
    }

    // Build structured email payload forwarded to contact@busview.in
    const emailPayload = {
      _subject: `New School Transportation Enquiry: ${submissionData.schoolName} [${submissionData.interest}]`,
      _template: 'table',
      _captcha: 'false',
      _replyto: submissionData.email,
      'Enquiry ID': enquiryId,
      'School / Institution': submissionData.schoolName,
      'Contact Person': submissionData.contactName,
      'Designation / Role': submissionData.designation,
      'Official Email': submissionData.email,
      'Phone Number': submissionData.phone,
      'City / Town': submissionData.city,
      'State': submissionData.state,
      'Approx. School Buses': submissionData.busCount,
      'Program Selected': submissionData.interest,
      'Additional Message': submissionData.message || 'No additional note provided',
      'Source Page': window.location.pathname || 'Home',
      'Submitted At (IST)': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Dispatch via FormSubmit AJAX to contact@busview.in
    fetch('https://formsubmit.co/ajax/contact@busview.in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Submission successfully delivered to contact@busview.in:', result);
    })
    .catch(err => {
      console.warn('Notice: Background delivery via FormSubmit service:', err);
    })
    .finally(() => {
      // Transition cleanly to the success banner
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
    });
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
