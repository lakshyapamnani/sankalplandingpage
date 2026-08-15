/* ==========================================================================
   Sankalp Academy - Interactive Script & WhatsApp Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      easing: 'ease-out-cubic'
    });
  }

  // 2. Sticky Header Effects
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer Controls
  const drawerToggleBtn = document.getElementById('mobileDrawerToggle');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-nav a');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  drawerToggleBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 3b. Web View Collapsible Portals Sidebar Controls
  const webPortalsToggleBtn = document.getElementById('webPortalsToggleBtn');
  const desktopNavPortalsBtn = document.getElementById('desktopNavPortalsBtn');
  const webPortalsEdgeToggle = document.getElementById('webPortalsEdgeToggle');
  const webPortalsCloseBtn = document.getElementById('webPortalsCloseBtn');
  const webPortalsBackdrop = document.getElementById('webPortalsBackdrop');
  const webPortalsSidebar = document.getElementById('webPortalsSidebar');

  function openWebPortalsSidebar() {
    webPortalsSidebar?.classList.add('open');
    webPortalsBackdrop?.classList.add('open');
    webPortalsToggleBtn?.classList.add('open');
    desktopNavPortalsBtn?.classList.add('active');
    webPortalsEdgeToggle?.classList.add('sidebar-active');
    document.body.style.overflow = 'hidden';
  }

  function closeWebPortalsSidebar() {
    webPortalsSidebar?.classList.remove('open');
    webPortalsBackdrop?.classList.remove('open');
    webPortalsToggleBtn?.classList.remove('open');
    desktopNavPortalsBtn?.classList.remove('active');
    webPortalsEdgeToggle?.classList.remove('sidebar-active');
    document.body.style.overflow = '';
  }

  function toggleWebPortalsSidebar() {
    if (webPortalsSidebar?.classList.contains('open')) {
      closeWebPortalsSidebar();
    } else {
      openWebPortalsSidebar();
    }
  }

  webPortalsToggleBtn?.addEventListener('click', toggleWebPortalsSidebar);
  desktopNavPortalsBtn?.addEventListener('click', toggleWebPortalsSidebar);
  webPortalsEdgeToggle?.addEventListener('click', toggleWebPortalsSidebar);
  webPortalsCloseBtn?.addEventListener('click', closeWebPortalsSidebar);
  webPortalsBackdrop?.addEventListener('click', closeWebPortalsSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && webPortalsSidebar?.classList.contains('open')) {
      closeWebPortalsSidebar();
    }
  });

  // 3c. Portal Links Redirection & Drawer Cleanup
  const portalLinks = document.querySelectorAll('a[href*="sankalpacademy.vercel.app"]');
  portalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.getAttribute('href');
      if (targetUrl) {
        closeWebPortalsSidebar();
        closeDrawer();
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // 4. Interactive Inquiry Modal Controls
  const modalOverlay = document.getElementById('inquiryModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTriggerBtns = document.querySelectorAll('[data-open-modal]');

  function openModal(courseGrade = '') {
    if (modalOverlay) {
      const selectElem = modalOverlay.querySelector('select[name="grade"]');
      if (selectElem && courseGrade) {
        selectElem.value = courseGrade;
      }
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  modalTriggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If button has a direct whatsapp href, let browser handle it or open modal
      if (btn.getAttribute('href') && btn.getAttribute('href').includes('wa.me')) {
        return; // Allow natural navigation to WhatsApp
      }
      e.preventDefault();
      const grade = btn.getAttribute('data-grade') || '';
      openModal(grade);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // 5. WhatsApp Integration on Inquiry Forms
  const inquiryForm = document.getElementById('inquiryForm');
  inquiryForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = inquiryForm.querySelector('input[type="text"]')?.value || 'Student';
    const gradeInput = inquiryForm.querySelector('select')?.value || 'Grade 5-10';
    const phoneInput = inquiryForm.querySelector('input[type="tel"]')?.value || '';

    const message = `Hello Sankalp Academy, my name is ${nameInput}. I want to inquire about ${gradeInput} coaching. Parent Contact: ${phoneInput}.`;
    const waUrl = `https://wa.me/919152837001?text=${encodeURIComponent(message)}`;

    closeModal();
    window.open(waUrl, '_blank');
    inquiryForm.reset();
  });

  const directForm = document.getElementById('inquiryFormDirect');
  directForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('directName')?.value || 'Student';
    const phoneInput = document.getElementById('directPhone')?.value || '';
    const gradeInput = document.getElementById('directGrade')?.value || 'Grade 5-10';

    const message = `Hello Sankalp Academy, my name is ${nameInput}. I want to inquire about ${gradeInput} coaching. Parent Contact: ${phoneInput}.`;
    const waUrl = `https://wa.me/919152837001?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank');
    directForm.reset();
  });

  // 6. Course Grade Filter Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 7. Section Scroll Observer (Header & Bottom Bar Sync)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a');
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

  function highlightActiveNav() {
    let scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        bottomNavItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);

  // 8. Counter Animation with IntersectionObserver
  const counterElements = document.querySelectorAll('.counter-val');
  let countersTriggered = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersTriggered) {
        countersTriggered = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let current = 0;
          const increment = Math.ceil(target / 40);

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = current;
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.3 });

  const statsRibbon = document.querySelector('.stats-ribbon');
  if (statsRibbon) counterObserver.observe(statsRibbon);
});