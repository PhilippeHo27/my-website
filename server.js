const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In production (after build), serve static files from dist
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
}

// API Routes
app.post('/api/save', (req, res) => {
    const newData = req.body;

    // Basic Validation
    if (!newData || !newData.en || !newData.fr) {
        return res.status(400).json({ error: 'Invalid data structure' });
    }

    const filePath = path.join(__dirname, 'public/data/resume.json');

    fs.writeFile(filePath, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ error: 'Failed to write file' });
        }
        console.log('Resume data saved successfully.');
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
