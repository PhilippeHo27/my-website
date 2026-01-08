# Implementation Plan: The "CV-Editor" Upgrade

This plan outlines the transformation of the current static website into a dynamic, JSON-driven resume editing web application.

## 🎯 Goal
Create a single source of truth for resume data, allow real-time editing via the web UI (protected by a password), and optimize the output for perfect PDF printing in multiple languages.

---

## 🏗️ Phase 1: The Data Foundation
*   **Centralize Data**: Create `resume/data.json` to store all content (Summary, Jobs, Education, Skills) for both **English** and **French**.
*   **Dynamic Loader**: Implement a JS engine to fetch the JSON and populate the HTML on both the landing page and the `resume/index.html` page.
*   **Clean Up**: Remove hard-coded text from HTML files to ensure we never have to edit them directly again.

## ✍️ Phase 2: The Web Editor (Admin UI)
*   **Admin Mode**: Add a password-protected toggle (e.g., a hidden key combo or a login button) to enable "Edit Mode".
*   **Inline Editing**: Use `contenteditable` on resume sections so you can click and type directly on the page.
*   **Layout Constraints**: 
    - Add visual markers/character limits to warn you if text is getting too long for a single-page PDF.
    - Real-time preview of how the change looks in the layout.

## 💾 Phase 3: Persistence (The Backend)
*   **Simple API**: Set up a minimal Node.js/Express backend (since you are on a "real server" now).
*   **Save Logic**: Create a `POST /api/save-resume` endpoint that overwrites the `data.json` file.
*   **Security**: Gate the "Save" function behind a password check to prevent unauthorized changes.

## 🖨️ Phase 4: Print & Language Perfection
*   **Smart Print CSS**: Refactor `@media print` to ensure the sidebar and content align perfectly on A4/Letter paper, regardless of content length.
*   **Language Engine**: Use the centralized JSON to provide a seamless "EN/FR" toggle that updates the entire site instantly.
*   **Font Optimization**: Switch to premium typography (e.g., Inter, Outfit, or Roboto) for a more professional "Full-Stack Developer" feel.

## 🎨 Phase 5: Premium Polish (The "WOW" Factor)
*   **Micro-animations**: Add subtle transitions when switching languages or entering edit mode.
*   **Design System**: Unify colors and spacing between the landing page and the resume page for a consistent brand.

---

## 🛠️ Proposed Tech Stack
*   **Frontend**: Vanilla JS (Dynamic rendering) / Tailwind CSS (Styling & Print utilities).
*   **Backend**: Node.js + Express (Simple file storage API).
*   **Download**: `window.print()` with optimized CSS or `html2pdf.js` for direct download.
