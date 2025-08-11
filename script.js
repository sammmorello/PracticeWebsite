// Animated intro, smooth scroll, resume modal, contact form feedback, section reveal

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Resume modal logic
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeBtn = document.querySelector('.close-btn');
    if (viewResumeBtn && resumeModal && closeBtn) {
        viewResumeBtn.addEventListener('click', () => {
            resumeModal.style.display = 'flex';
            setTimeout(() => resumeModal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        });
        closeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            setTimeout(() => {
                resumeModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        });
        window.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                setTimeout(() => {
                    resumeModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }

    // Contact form feedback (Formspree)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formStatus.textContent = 'Sending...';
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Thank you for reaching out! I will get back to you soon.';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Oops! There was a problem. Please try again later.';
                }
            })
            .catch(() => {
                formStatus.textContent = 'Oops! There was a problem. Please try again later.';
            });
        });
    }

    // Section reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        reveals.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - 80) {
                section.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // PDF.js custom resume viewer
    // PDF.js loader for resume
    const pdfViewerDiv = document.getElementById('pdf-viewer');
    if (pdfViewerDiv) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.min.js';
        script.onload = () => {
            const pdfjsLib = window['pdfjs-dist/build/pdf'];
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js';
            const url = 'MorelloResume.pdf';
            pdfjsLib.getDocument(url).promise.then(function(pdf) {
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    pdf.getPage(pageNum).then(function(page) {
                        const scale = 1.5;
                        const viewport = page.getViewport({ scale: scale });
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        pdfViewerDiv.appendChild(canvas);
                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport,
                            enableWebGL: false,
                            renderInteractiveForms: true,
                            annotationMode: 2 // Enable links
                        };
                        page.render(renderContext);
                        // Render links
                        page.getAnnotations().then(function(annots) {
                            annots.forEach(function(annot) {
                                if (annot.subtype === 'Link' && annot.url) {
                                    const link = document.createElement('a');
                                    link.href = annot.url;
                                    link.target = '_blank';
                                    link.style.position = 'absolute';
                                    link.style.left = (annot.rect[0] * scale) + 'px';
                                    link.style.top = (canvas.offsetTop + (canvas.height - annot.rect[3] * scale)) + 'px';
                                    link.style.width = ((annot.rect[2] - annot.rect[0]) * scale) + 'px';
                                    link.style.height = ((annot.rect[3] - annot.rect[1]) * scale) + 'px';
                                    link.style.background = 'rgba(0,0,0,0)';
                                    link.style.zIndex = 10;
                                    link.style.display = 'block';
                                    link.style.pointerEvents = 'auto';
                                    pdfViewerDiv.appendChild(link);
                                }
                            });
                            pdfViewerDiv.style.position = 'relative';
                        });
                    });
                }
            }).catch(function(error) {
                pdfViewerDiv.innerHTML = '<p style="color:#b00;text-align:center;">Failed to load resume PDF.</p>';
            });
        };
        document.body.appendChild(script);
    }

    // Smooth scroll, section reveal, parallax, and theme toggle

    document.addEventListener('DOMContentLoaded', () => {
      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      // Fade/slide-up animation for sections and cards
      const fadeSections = document.querySelectorAll('.fade-section, .project-card');
      const revealOnScroll = () => {
        const trigger = window.innerHeight * 0.92;
        fadeSections.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < trigger) {
            el.classList.add('visible');
          }
        });
      };
      window.addEventListener('scroll', revealOnScroll);
      revealOnScroll();
    });
});

