document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-pdf');
    const langToggleBtn = document.getElementById('lang-toggle');
    const currentLangDisplay = document.getElementById('current-lang');
    
    // Initialize with English as default
    let currentLang = 'en';
    
    downloadBtn.addEventListener('click', function() {
        // Trigger browser print dialog
        window.print();
    });
    
    langToggleBtn.addEventListener('click', function() {
        // Toggle language
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        
        // Update the language display text
        currentLangDisplay.textContent = currentLang.toUpperCase();
        
        // Update page title
        document.title = translations[currentLang].pageTitle;
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
    });
});
