(function() {

  // Determine which nav link is active based on current page
  const page = location.pathname.split('/').pop() || 'index.html';
  const params = new URLSearchParams(location.search);
  const currentType = params.get('type');

 

const navLinks = [
    { href: 'index.html#top', i18n: 'nav.top', text: 'Top 10' },
    { href: 'index.html#new', i18n: 'nav.new', text: 'Newest' },
    { href: 'index.html#genres', i18n: 'nav.genres', text: 'Genres' },
    { href: 'index.html#years', i18n: 'nav.years', text: 'Years' },
  ];

 function buildNavLinks() {
   return navLinks.map(l =>
     `<a href="${l.href}" data-i18n="${l.i18n}">${l.text}</a>`
   ).join('');
 }

  // HEADER
  const headerHTML = `
<header class="header">
  <div class="container">
    <a href="index.html" class="header-logo">
      <div class="header-logo-icon"><svg><use href="#icon-play"/></svg></div>
      <span class="header-logo-text">CINEMAONAIR</span>
    </a>

    <nav class="header-nav">
      ${buildNavLinks()}
    </nav>

    <div class="header-actions">
      <button class="btn btn-ghost btn-icon" onclick="toggleSearch()" aria-label="Search">
        <svg width="20" height="20"><use href="#icon-search"/></svg>
      </button>

      <a href="#" onclick="toggleLang(); return false;" class="lang-btn">
        <svg><use href="#icon-globe"/></svg>
        <span>UA</span>
      </a>

      <button class="btn btn-ghost btn-icon mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">
        <svg width="20" height="20"><use href="#icon-menu"/></svg>
      </button>
    </div>
  </div>

  <div class="search-bar" id="searchBar" style="display:none">
    
      <form action="search.html" method="get" class="search-bar-wrap">
        <svg><use href="#icon-search"/></svg>
        <input 
          type="text"
          name="q"
          class="search-bar-input"
          data-i18n="search.placeholder"
          placeholder="Пошук"
          autofocus
        >
      </form>
   
  </div>

  <div class="mobile-menu" id="mobileMenu">
    <nav>
      ${buildNavLinks()}
    </nav>
  </div>
</header>
`;

  // FOOTER
  const footerHTML = `
<footer class="footer">

<button class="scroll-top" onclick="scrollToTop()" aria-label="Back to top">↑</button>

<div class="container footer-inner">
  <div class="footer-bottom">

    <p class="footer-copyright">
      ©<span id="year"></span> All rights reserved CINEMAONAIR
    </p>

    <div class="footer-links">
      <a href="#">Privacy Policy</a>
      <span>|</span>
      <a href="#">Terms of Use</a>
      <span>|</span>
      <a href="#">Cookie Policy</a>
      <span>|</span>
      <a href="#">Contacts</a>
    </div>

  </div>
</div>

</footer>
`;

  // Inject
  const headerEl = document.getElementById('header-component');
  const footerEl = document.getElementById('footer-component');
  
  function updateActiveNav() {
  
    const page = location.pathname.split('/').pop() || 'index.html';
    const hash = location.hash;
  
    document.querySelectorAll(".header-nav a").forEach(a => {
      a.classList.remove("active");
  
      const url = new URL(a.href);
  
      const linkPage = url.pathname.split('/').pop();
      const linkHash = url.hash;
  
      if (linkPage !== page) return;
  
      if (hash) {
        if (linkHash === hash) a.classList.add("active");
      } else {
        if (linkHash === "#top") a.classList.add("active");
      }
  
    });
  
  }
  
  window.addEventListener("hashchange", updateActiveNav);
  window.addEventListener("DOMContentLoaded", updateActiveNav);

  if (headerEl) headerEl.outerHTML = headerHTML;
  if (footerEl) footerEl.outerHTML = footerHTML;

  // Auto year
  setTimeout(() => {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }, 0);

  // Shared functions
  window.toggleSearch = function() {
    const bar = document.getElementById('searchBar');
    bar.style.display = bar.style.display === 'none' ? 'block' : 'none';
    if (bar.style.display === 'block') bar.querySelector('input').focus();
  };

  window.toggleMobileMenu = function() {
    document.getElementById('mobileMenu').classList.toggle('open');
  };

  // Scroll to top
  window.scrollToTop = function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Show scroll button
  window.addEventListener("scroll", () => {
    const btn = document.querySelector(".scroll-top");
    if (!btn) return;

    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

})();