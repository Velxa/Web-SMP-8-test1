// 1. STICKY HEADER FUNCTIONALITY

const header = document.getElementById('main-header');

const sticky = header.offsetTop;

function handleScroll() {

    if (window.pageYOffset > sticky) {

        header.classList.add('sticky');

    } else {

        header.classList.remove('sticky');

    }

}

// 2. SCROLL REVEAL ANIMATION

function revealElements() {

    const reveals = document.querySelectorAll('.reveal');

    

    for (let i = 0; i < reveals.length; i++) {

        const windowHeight = window.innerHeight;

        const elementTop = reveals[i].getBoundingClientRect().top;

        const elementVisible = 150; // Jarak sebelum elemen terlihat

        if (elementTop < windowHeight - elementVisible) {

            reveals[i].classList.add('active');

        } else {

            // Opsional: hapus class active jika elemen keluar dari viewport

            // reveals[i].classList.remove('active'); 

        }

    }

}

// Attach functions to scroll event

window.addEventListener('scroll', () => {

    handleScroll();

    revealElements();

});

// Run reveal once on load to check initial position

window.addEventListener('load', revealElements);