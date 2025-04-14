/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function showContactPopup(event) {
    const popup = document.querySelector('.contact-popup');
    const popupContent = document.querySelector('.popup-content');
    
    const clickedElement = event.currentTarget;
    const rect = clickedElement.getBoundingClientRect();
    
    const bubbleWidth = 250;
    const bubbleHeight = 150;
    const spacing = 20;
    
    let left = rect.right + spacing;
    let top = rect.top;
    
    if (left + bubbleWidth > window.innerWidth) {
      left = rect.left - bubbleWidth - spacing;
      
      if (left < 0) {
        left = Math.max(10, rect.left + (rect.width / 2) - (bubbleWidth / 2));
        top = rect.bottom + spacing;
      }
    }
    
    if (top + bubbleHeight > window.innerHeight) {
      top = Math.max(10, window.innerHeight - bubbleHeight - 10);
    }
    
    if (top < 0) {
      top = 10;
    }
    
    popupContent.style.left = Math.round(left) + 'px';
    popupContent.style.top = Math.round(top) + 'px';
    
    popup.style.display = 'block';
  }
  
  function closeContactPopup() {
    document.querySelector('.contact-popup').style.display = 'none';
  }
  
  function openResume() {
    window.open('resume/index.html', '_blank');
  }
  
  // Close the popup when clicking the close button
  document.querySelector(".close").onclick = function() {
    document.getElementById("pdfModal").style.display = "none";
  }
  
  // Close the popup when clicking outside of it
  window.onclick = function(event) {
    var popup = document.querySelector('.contact-popup');
    if (event.target == popup) {
      closeContactPopup();
    }
  }
 
  // PDF.js setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

/*
function closeResume() {
  document.getElementById("resumeOverlay").style.display = "none";
}

function renderPDF() {
  var url = 'assets/img/resume.pdf';
  
  pdfjsLib.getDocument(url).promise.then(function(pdf) {
    pdf.getPage(1).then(function(page) {
      var scale = 1;
      var viewport = page.getViewport({scale: scale});

      var canvas = document.getElementById('pdf-render');
      var context = canvas.getContext('2d');

      // Calculate the maximum width and height
      var maxWidth = window.innerWidth * 0.9;
      var maxHeight = window.innerHeight * 0.8;

      // Adjust the scale to fit within the maximum dimensions
      var scaleX = maxWidth / viewport.width;
      var scaleY = maxHeight / viewport.height;
      var finalScale = Math.min(scaleX, scaleY);

      viewport = page.getViewport({scale: finalScale});

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    }).catch(function(error) {
      console.error('Error rendering PDF page:', error);
    });
  }).catch(function(error) {
    console.error('Error loading PDF:', error);
  });
}

function downloadPDF() {
  var link = document.createElement('a');
  link.href = 'assets/img/resume.pdf';
  link.download = 'assets/img/resume.pdf';
  link.click();
}

function printPDF() {
  var win = window.open('assets/img/resume.pdf', '_blank');
  win.focus();
  win.print();
}
*/

document.querySelector(".close").onclick = closeContactPopup;
