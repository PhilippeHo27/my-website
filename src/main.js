import './css/reduced-styles.css';
import './styles/input.css';
import { fetchResumeData } from './components/ResumeLoader.js';
import { Editor } from './components/Editor.js';

let resumeData = null;
let currentLang = 'en';
let editor = null;

async function init() {
    resumeData = await fetchResumeData();

    // Initialize Editor
    editor = new Editor();
    editor.onSave = async () => {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resumeData)
            });
            if (!response.ok) throw new Error('Network response was not ok');
        } catch (e) {
            throw e;
        }
    };

    if (resumeData) {
        // For the landing page, we don't re-render the whole DOM (it's too custom)
        // But we bind the data to the editor so it knows what to update in the JSON
        editor.bind(resumeData[currentLang]);

        // Link the sidebar toggle
        const adminToggle = document.getElementById('admin-toggle-link');
        if (adminToggle) {
            adminToggle.addEventListener('click', (e) => {
                e.preventDefault();
                editor.toggleEditMode(!editor.isEditing);
            });
        }
    }
}

// Helper functions for landing page UI (exposed for inline onclick)
window.openResume = function() {
    window.open('resume/index.html', '_blank');
};

window.showContactPopup = function(event) {
    event.preventDefault();
    event.stopPropagation();
    const popup = document.querySelector('.contact-popup');
    if (popup) {
        popup.style.display = 'block';
    }
};

window.closeContactPopup = function() {
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
