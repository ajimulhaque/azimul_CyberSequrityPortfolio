"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector(
            "[data-testimonials-title]"
        ).innerHTML;
        modalText.innerHTML = this.querySelector(
            "[data-testimonials-text]"
        ).innerHTML;

        testimonialsModalFunc();
    });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
    elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Updated filter logic to handle multiple categories for certifications
const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        const categories = filterItems[i].dataset.category.split(" ");

        if (selectedValue === "all" || categories.includes(selectedValue)) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

// submit handler: Form submission via Formspree
if (form) {
    form.addEventListener('submit', function (e) {
        // Formspree will automatically submit to the endpoint
        // Form will be sent via POST to Formspree
        // No need to prevent default - let Formspree handle it
    });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
                pages[i].classList.add("active");
                navigationLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove("active");
                navigationLinks[i].classList.remove("active");
            }
        }
    });
}

// ===== SLIDE CAROUSEL FUNCTIONALITY =====

const slidesContainer = document.querySelector("[data-slides-container]");
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.querySelector("[data-prev-slide]");
const nextBtn = document.querySelector("[data-next-slide]");

let currentSlide = 0;

// Function to show slide
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove("active"));
    indicators.forEach(indicator => indicator.classList.remove("active"));

    slides[n].classList.add("active");
    indicators[n].classList.add("active");
    currentSlide = n;
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Add event listeners
if (nextBtn) nextBtn.addEventListener("click", nextSlide);
if (prevBtn) prevBtn.addEventListener("click", prevSlide);

// Add indicator click listeners
indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        showSlide(index);
    });
});

// Initialize first slide
showSlide(0);

const heroSidebar = document.querySelector("[data-sidebar]");

if (heroSidebar) {
    heroSidebar.addEventListener("mousemove", (e) => {
        const rect = heroSidebar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        heroSidebar.style.background =
            `radial-gradient(circle at ${x}px ${y}px,
        rgba(0, 212, 255, 0.35),
        rgba(15, 32, 39, 0.95) 60%)`;
    });

    heroSidebar.addEventListener("mouseleave", () => {
        heroSidebar.style.background =
            "linear-gradient(160deg,#0f2027,#203a43,#2c5364)";
    });
}
const avatar = document.querySelector(".avatar-box");

window.addEventListener("scroll", () => {
    if (!avatar) return;

    const scale = Math.max(0.75, 1 - window.scrollY / 500);
    avatar.style.transform = `scale(${scale})`;
});

const themes = ["", "theme-2", "theme-3", "theme-4", "theme-5"];
let themeIndex = 0;

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "t") {
        document.documentElement.className = themes[themeIndex];
        themeIndex = (themeIndex + 1) % themes.length;
    }
});
// ===== FAKE SYSTEM SCAN =====
document.addEventListener("DOMContentLoaded", () => {

    const scanOverlay = document.getElementById("system-scan");
    const scanLog = document.getElementById("scan-log");
    const scanProgress = document.querySelector(".scan-progress");
    const scanStatus = document.querySelector(".scan-status");

    if (!scanOverlay) return;

    const logs = [
        "[ OK ] Loading kernel modules...",
        "[ OK ] Accessing secure memory...",
        "[ OK ] Enumerating open ports...",
        "[ OK ] Verifying encryption keys...",
        "[ OK ] System integrity verified",
    ];

    let logIndex = 0;
    let progress = 0;

    const logInterval = setInterval(() => {
        if (logIndex < logs.length) {
            scanLog.textContent += logs[logIndex] + "\n";
            logIndex++;
        }
    }, 150);

    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 8;
        if (progress >= 100) progress = 100;

        scanProgress.style.width = progress + "%";

        if (progress === 100) {
            scanStatus.textContent = "ACCESS GRANTED ✔";

            clearInterval(progressInterval);
            clearInterval(logInterval);

            setTimeout(() => {
                scanOverlay.style.display = "none";
            }, 500);
        }
    }, 200);

});

