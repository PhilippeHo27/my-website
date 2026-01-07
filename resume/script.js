document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-pdf');
    
    downloadBtn.addEventListener('click', function() {
        // Trigger browser print dialog
        window.print();
    });
});
