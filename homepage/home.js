document.addEventListener('DOMContentLoaded', function() {
    // Handle sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Handle login popup
    const loginBtn = document.getElementById('loginBtn');
    const loginPopup = document.getElementById('loginPopup');
    const closeLogin = loginPopup.querySelector('.close');

    loginBtn.addEventListener('click', function(event) {
        event.preventDefault();
        loginPopup.style.display = 'block';
    });

    closeLogin.addEventListener('click', function() {
        loginPopup.style.display = 'none';
    });

    // Handle register popup
    const registerBtn = document.getElementById('registerBtn');
    const registerPopup = document.getElementById('registerPopup');
    const closeRegister = registerPopup.querySelector('.close');

    registerBtn.addEventListener('click', function(event) {
        event.preventDefault();
        registerPopup.style.display = 'block';
    });

    closeRegister.addEventListener('click', function() {
        registerPopup.style.display = 'none';
    });

    // Handle scroll-to-top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
