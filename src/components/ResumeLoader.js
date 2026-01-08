export async function fetchResumeData() {
    try {
        const response = await fetch('/data/resume.json');
        if (!response.ok) throw new Error('Failed to load resume data');
        return await response.json();
    } catch (error) {
        console.error('Error fetching resume data:', error);
        return null;
    }
}
