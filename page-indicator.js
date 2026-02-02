/**
 * Fixed page indicator – shows current page with sliding transition.
 * Pages: index, about, projects, services, skills, certificates, resume, contact
 */
(function () {
  const PAGES = [
    { id: 'index', href: 'index.html', label: 'Home' },
    { id: 'about', href: 'about.html', label: 'About' },
    { id: 'projects', href: 'projects.html', label: 'Projects' },
    { id: 'services', href: 'services.html', label: 'Services' },
    { id: 'skills', href: 'skills.html', label: 'Skills' },
    { id: 'certificates', href: 'certificates.html', label: 'Certificates' },
    { id: 'resume', href: 'resume.html', label: 'Resume' },
    { id: 'contact', href: 'contact.html', label: 'Contact' }
  ];

  function getCurrentPageId() {
    const path = window.location.pathname.replace(/^\//, '');
    const file = path.split('/').pop() || 'index.html';
    const match = PAGES.find(p => p.href === file);
    return match ? match.id : 'index';
  }

  function createIndicator() {
    const currentId = getCurrentPageId();
    const nav = document.createElement('nav');
    nav.className = 'page-indicator';
    nav.setAttribute('aria-label', 'Page position');
    nav.innerHTML = `
      <div class="page-indicator__track">
        <div class="page-indicator__slider" aria-hidden="true"></div>
        <ul class="page-indicator__list">
          ${PAGES.map(p => `
            <li class="page-indicator__item" data-page="${p.id}">
              <a href="${p.href}" class="page-indicator__link ${p.id === currentId ? 'is-active' : ''}" title="${p.label}">
                <span class="page-indicator__label">${p.label}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    document.body.appendChild(nav);

    const slider = nav.querySelector('.page-indicator__slider');
    const items = nav.querySelectorAll('.page-indicator__item');
    const links = nav.querySelectorAll('.page-indicator__link');

    function moveSliderTo(pageId) {
      const active = nav.querySelector(`[data-page="${pageId}"]`);
      if (!active || !slider) return;
      const isHorizontal = window.innerWidth <= 768;
      if (isHorizontal) {
        const left = active.offsetLeft;
        const width = active.offsetWidth;
        slider.style.transform = `translateX(${left}px)`;
        slider.style.width = `${width}px`;
        slider.style.height = '4px';
      } else {
        const top = active.offsetTop;
        const height = active.offsetHeight;
        slider.style.transform = `translateY(${top}px)`;
        slider.style.height = `${height}px`;
        slider.style.width = '4px';
      }
    }

    moveSliderTo(currentId);

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        const pageId = this.closest('[data-page]').getAttribute('data-page');
        links.forEach(l => l.classList.remove('is-active'));
        this.classList.add('is-active');
        moveSliderTo(pageId);
      });
    });

    // Update on popstate (back/forward)
    window.addEventListener('popstate', function () {
      const id = getCurrentPageId();
      links.forEach(l => {
        l.classList.toggle('is-active', l.closest('[data-page]').getAttribute('data-page') === id);
      });
      moveSliderTo(id);
    });

    // Reflow on resize
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => moveSliderTo(getCurrentPageId()), 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createIndicator);
  } else {
    createIndicator();
  }
})();
