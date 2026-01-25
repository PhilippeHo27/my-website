import './css/reduced-styles.css';
import './styles/input.css';
// Landing page logic

async function init() {
    // Landing page is now viewing-only. 
    // Data syncing is handled during the build process or via server-side rendering.
}

// Helper functions for landing page UI (exposed for inline onclick)
window.openResume = function () {
    window.open('resume/index.html', '_blank');
};

window.showContactPopup = function (event) {
    event.preventDefault();
    event.stopPropagation();
    const popup = document.querySelector('.contact-popup');
    if (popup) {
        popup.style.display = 'block';
    }
};

window.closeContactPopup = function () {
    const popup = document.querySelector('.contact-popup');
    if (popup) {
        popup.style.display = 'none';
    }
};

// Close popup on outside click
document.addEventListener('click', (e) => {
    const popup = document.querySelector('.contact-popup');
    const btn = document.getElementById('contact-info-btn');
    if (popup && popup.style.display === 'block' && !popup.contains(e.target) && e.target !== btn) {
        window.closeContactPopup();
    }
});

init();
