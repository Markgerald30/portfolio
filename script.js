const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Optional: Animate hamburger to 'X'
    menuToggle.classList.toggle('is-active');
});

// Close menu when a link is clicked (important for mobile UX)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Show/Hide logic
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block'; 
                    setTimeout(() => {
                        card.classList.remove('hide');
                        card.classList.add('show');
                    }, 10);
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                    card.style.display = 'none';
                }
            });

            // Refresh AOS so it knows items moved/disappeared
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
});

// --- Lightbox Logic ---
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("full-image");
const captionText = document.getElementById("caption");
const closeModal = document.querySelector(".close-modal");

// Select only cards in the Graphics category
const graphicsCards = document.querySelectorAll('.project-card[data-category="graphics"]');

graphicsCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        
        const img = this.querySelector('img');
        const title = this.querySelector('h3').innerText;

        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = title;
        
        // Prevent scrolling while modal is open
        document.body.style.overflow = "hidden";
    });
});

// Close modal when clicking 'X' or the background
modal.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

