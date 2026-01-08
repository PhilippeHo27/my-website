export class Editor {
    constructor() {
        this.currentData = null; // The specific language object (e.g. resumeData.en)
        this.isEditing = false;
        this.onSave = null; // Callback
        this.setupUI();
    }

    bind(data) {
        this.currentData = data;
        // If we switch language while editing, we need to re-apply contentEditable
        if (this.isEditing) {
            this.applyEditable(true);
        }
    }

    setupUI() {
        // Container
        const container = document.createElement('div');
        container.id = 'editor-controls';
        container.style.cssText = `
        position: fixed; 
        bottom: 20px; 
        right: 20px; 
        display: none; 
        gap: 10px; 
        z-index: 9999;
        padding: 10px;
        background: rgba(0,0,0,0.8);
        border-radius: 8px;
        backdrop-filter: blur(5px);
      `;

        // Save Button
        const saveBtn = document.createElement('button');
        saveBtn.innerText = '💾 Save';
        saveBtn.style.cssText = 'padding: 8px 16px; border: none; border-radius: 4px; background: #2ecc71; color: white; cursor: pointer; font-weight: bold;';
        saveBtn.onclick = () => this.save();

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.innerText = '❌ Close';
        closeBtn.style.cssText = 'padding: 8px 16px; border: none; border-radius: 4px; background: #e74c3c; color: white; cursor: pointer; font-weight: bold;';
        closeBtn.onclick = () => this.toggleEditMode(false);

        container.appendChild(saveBtn);
        container.appendChild(closeBtn);
        document.body.appendChild(container);
        this.controls = container;

        // Global Hotkey: Ctrl + Shift + E
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'E') {
                e.preventDefault();
                this.toggleEditMode(!this.isEditing);
            }
        });

        console.log('Editor initialized. Press Ctrl+Shift+E to edit.');
    }

    toggleEditMode(active) {
        this.isEditing = active;
        this.controls.style.display = active ? 'flex' : 'none';
        this.applyEditable(active);
    }

    applyEditable(active) {
        const elements = document.querySelectorAll('[data-path]');
        elements.forEach(el => {
            el.contentEditable = active;
            if (active) {
                el.classList.add('editable-highlight');
                // Remove old listener to avoid duplicates if re-binding
                el.oninput = null;
                el.oninput = (e) => this.handleInput(e, el.getAttribute('data-path'));
            } else {
                el.classList.remove('editable-highlight');
                el.oninput = null;
            }
        });
    }

    handleInput(e, path) {
        if (!this.currentData) return;
        const value = e.target.innerText; // InnerText preserves newlines but removes HTML tags. Ideally we might want HTML for some fields.
        // For now, assume text-only except for where we explicitly want HTML (like summary maybe?)
        // renderer.js uses innerHTML for some fields?
        // Resume content is mostly text.

        this.updateDeep(this.currentData, path, value);
    }

    updateDeep(obj, path, value) {
        const keys = path.split('.');
        const last = keys.pop();
        let current = obj;
        for (const key of keys) {
            // If key is a number (array index), it works with object syntax too in JS
            if (current[key] === undefined) {
                console.error(`Invalid path: ${path}`);
                return;
            }
            current = current[key];
        }
        current[last] = value;
    }

    async save() {
        const btn = this.controls.querySelector('button'); // visual feedback
        const originalText = btn.innerText;
        btn.innerText = 'Saving...';

        if (this.onSave) {
            try {
                await this.onSave();
                btn.innerText = '✅ Saved';
                setTimeout(() => btn.innerText = originalText, 2000);
            } catch (e) {
                alert('Save failed: ' + e.message);
                btn.innerText = '❌ Error';
            }
        }
    }
}
