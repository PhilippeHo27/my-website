export function setText(id, text, dataPath) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
        if (dataPath) el.setAttribute('data-path', dataPath);
    }
}

export function setHTML(id, html, dataPath) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = html;
        if (dataPath) el.setAttribute('data-path', dataPath);
    }
}

export function setList(id, items, createItemFn) {
    const el = document.getElementById(id);
    if (!el || !items) return;
    el.innerHTML = '';
    items.forEach((item, index) => {
        el.appendChild(createItemFn(item, index));
    });
}
