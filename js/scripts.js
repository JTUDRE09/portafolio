/* ============================================
   PORTAFOLIO - Main JavaScript
   Framework: None (vanilla JS)
   ============================================ */

window.addEventListener('DOMContentLoaded', function () {

    // ---------- 0. LETTER ANIMATION ----------
    function splitLetters(selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (el) {
            var text = el.textContent.trim();
            if (!text) return;
            var html = '';
            for (var i = 0; i < text.length; i++) {
                var char = text[i] === ' ' ? ' ' : text[i];
                html += '<span class="letter" style="--i:' + i + '">' + char + '</span>';
            }
            el.innerHTML = html;
        });
    }

    splitLetters('.masthead-heading, .page-section-heading, .navbar-nav .nav-link');

    // ---------- 1. NAVBAR SHRINK ON SCROLL ----------
    var navbar = document.getElementById('mainNav');

    function updateNavbarShrink() {
        if (!navbar) return;
        if (window.scrollY === 0) {
            navbar.classList.remove('navbar-shrink');
        } else {
            navbar.classList.add('navbar-shrink');
        }
    }

    updateNavbarShrink();
    document.addEventListener('scroll', updateNavbarShrink);

    // ---------- 2. NAVBAR MOBILE TOGGLE ----------
    var navCollapse = document.getElementById('navbarResponsive');

    window.toggleNav = function () {
        navCollapse.classList.toggle('show');
    };

    window.closeNav = function () {
        navCollapse.classList.remove('show');
    };

    // ---------- 3. ACTIVE NAV LINK (ScrollSpy vanilla) ----------
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveLink() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    updateActiveLink();
    document.addEventListener('scroll', updateActiveLink);

    // ---------- 4. MODAL OPEN / CLOSE ----------
    window.openModal = function (id) {
        var modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function (id) {
        var modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    // Close modal on backdrop click
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
            e.target.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var openModal = document.querySelector('.modal.show');
            if (openModal) {
                openModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        }
    });

    // Close modal via data-dismiss="modal" attribute
    document.addEventListener('click', function (e) {
        var dismissBtn = e.target.closest('[data-dismiss="modal"]');
        if (dismissBtn) {
            var modal = dismissBtn.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        }
    });

});
