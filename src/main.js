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

init();
