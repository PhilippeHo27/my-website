import { setText, setHTML, setList } from './components/domUtils.js';

export function renderLanding(data) {
    // Current landing page is mostly English for now, but we'll use data.en
    const langData = data.en;

    // Bio
    const aboutSection = document.querySelector('#about .resume-section-content');
    if (aboutSection) {
        // We'll map specific paragraphs to data if possible
        // For now, let's just make the lead paragraphs editable
        const leads = aboutSection.querySelectorAll('p.lead');
        if (leads[0]) setText('landing-bio-1', langData.main.summary.content, 'main.summary.content');
    }

    // Projects
    const projectsList = document.querySelector('#projects .resume-section-content');
    if (projectsList) {
        // This refactoring is a bit more complex manually because of the custom HTML structure of the landing page
        // I'll add data-paths to the existing HTML elements instead for the landing page
    }
}
