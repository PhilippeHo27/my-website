import './styles/input.css';

// TypeScript Interface for Window extensions
declare global {
    interface Window {
        openResume: () => void;
        copyEmail: (event: MouseEvent) => void;
        showContactPopup: (event: MouseEvent) => void;
        closeContactPopup: () => void;
    }
}

// Landing page logic
async function init(): Promise<void> {
    // Landing page is now viewing-only. 
    // Data syncing is handled during the build process or via server-side rendering.
}

// Helper functions for landing page UI (exposed for inline onclick)
window.openResume = function (): void {
    window.open('resume/index.html', '_blank');
};

window.copyEmail = function (event: MouseEvent): void {
    event.preventDefault();
    const email = 'philippeho27@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showToast('Copied to clipboard!');
    });
};

function showToast(message: string): void {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full font-mono text-sm font-bold shadow-2xl transition-all duration-300 opacity-0 translate-y-4 pointer-events-none z-[100]';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
        if (toast) {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', 'translate-y-4');
        }
    }, 2000);
}

window.showContactPopup = function (event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const popup = document.querySelector('.contact-popup') as HTMLElement | null;
    if (popup) {
        popup.style.display = 'block';
    }
};

window.closeContactPopup = function (): void {
    const popup = document.querySelector('.contact-popup') as HTMLElement | null;
    if (popup) {
        popup.style.display = 'none';
    }
};

// Close popup on outside click
document.addEventListener('click', (e: MouseEvent) => {
    const popup = document.querySelector('.contact-popup') as HTMLElement | null;
    const btn = document.getElementById('contact-info-btn');
    if (popup && popup.style.display === 'block' && !popup.contains(e.target as Node) && e.target !== btn) {
        window.closeContactPopup();
    }
});

init();
