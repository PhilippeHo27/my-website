/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/

// Function to open the resume in a new tab
function openResume() {
    window.open('resume/index.html', '_blank');
}

// Function to show the contact popup
function showContactPopup(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const popup = document.querySelector('.contact-popup');
    if (popup) {
        popup.style.display = 'block';
        
        // Position the popup near the contact icon
        const contactBtn = document.getElementById('contact-info-btn');
        if (contactBtn) {
            const rect = contactBtn.getBoundingClientRect();
            const popupContent = popup.querySelector('.popup-content');
            if (popupContent) {
                popupContent.style.top = (rect.top + window.scrollY - 10) + 'px';
                popupContent.style.left = (rect.left + rect.width + 10) + 'px';
            }
        }
    }
}

// Function to close the contact popup
function closeContactPopup() {
    const popup = document.querySelector('.contact-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Close popup when clicking outside of it
document.addEventListener('click', function(event) {
    const popup = document.querySelector('.contact-popup');
    const contactBtn = document.getElementById('contact-info-btn');
    
    if (popup && popup.style.display === 'block' && 
        !popup.contains(event.target) && 
        event.target !== contactBtn && 
        !contactBtn.contains(event.target)) {
        closeContactPopup();
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close popup when clicking the close button
    const closeBtn = document.querySelector('.close-popup');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeContactPopup);
    }
    
    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeContactPopup();
        }
    });
});