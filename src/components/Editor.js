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
        background: rgba(0,0,0,0.9);
        border: 1px solid #444;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      `;

        // Save Button
        const saveBtn = document.createElement('button');
        saveBtn.innerText = '💾 Save';
        saveBtn.style.cssText = 'padding: 8px 16px; border: none; border-radius: 4px; background: #2ecc71; color: white; cursor: pointer; font-weight: bold; transition: all 0.2s;';
        saveBtn.onclick = () => this.save();

        // History Button
        const histBtn = document.createElement('button');
        histBtn.innerText = '📜 History';
        histBtn.style.cssText = 'padding: 8px 16px; border: none; border-radius: 4px; background: #3498db; color: white; cursor: pointer; font-weight: bold; transition: all 0.2s;';
        histBtn.onclick = () => this.showHistory();

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.innerText = '❌ Close';
        closeBtn.style.cssText = 'padding: 8px 16px; border: none; border-radius: 4px; background: #e74c3c; color: white; cursor: pointer; font-weight: bold; transition: all 0.2s;';
        closeBtn.onclick = () => this.toggleEditMode(false);

        container.appendChild(saveBtn);
        container.appendChild(histBtn);
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

    async toggleEditMode(active) {
        if (active && !this.isEditing) {
            const password = prompt('Enter password to edit CV (Default: 0000):');
            if (password !== '0000') {
                alert('Access Denied');
                return;
            }
        }

        this.isEditing = active;
        this.controls.style.display = active ? 'flex' : 'none';
        this.applyEditable(active);
    }

    async showHistory() {
        try {
            const response = await fetch('/api/backups');
            const backups = await response.json();

            if (backups.length === 0) {
                alert('No backups found yet.');
                return;
            }

            const selection = prompt(
                'Select a backup to restore (index):\n' +
                backups.map((f, i) => `${i}: ${f}`).join('\n')
            );

            if (selection !== null && backups[selection]) {
                const confirmRes = confirm(`Are you sure you want to restore ${backups[selection]}? Current changes will be overwritten.`);
                if (confirmRes) {
                    const dataRes = await fetch(`/data/backups/${backups[selection]}`);
                    const restoredData = await dataRes.json();

                    // Directly save this back to the main file
                    const saveRes = await fetch('/api/save', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(restoredData)
                    });

                    if (saveRes.ok) {
                        alert('Backup restored successfully! Reloading...');
                        window.location.reload();
                    } else {
                        throw new Error('Failed to save restored data');
                    }
                }
            }
        } catch (e) {
            alert('Failed to fetch history: ' + e.message);
        }
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
