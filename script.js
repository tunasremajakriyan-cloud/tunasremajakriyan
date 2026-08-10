// =========================================================
// TUNAS REMAJA KRIYAN — INTERACTIONS
// =========================================================

const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealElements = document.querySelectorAll(".reveal");
const yearElement = document.getElementById("year");

// Tahun otomatis
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Navbar berubah saat halaman discroll
function updateHeader() {
  if (window.scrollY > 20) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Mobile menu
function closeMenu() {
  navMenu?.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Tutup menu jika klik di luar
document.addEventListener("click", (event) => {
  if (
    navMenu?.classList.contains("open") &&
    !navMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    closeMenu();
  }
});

// Animasi elemen saat masuk viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  observer.observe(element);
});

// Efek halus pada kartu kegiatan
document.querySelectorAll(".activity-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth <= 700) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -3;
    const rotateY = ((x / rect.width) - 0.5) * 3;

    card.style.transform =
      `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// Smooth spotlight effect for the hero card
const heroCard = document.querySelector(".hero-card");

if (heroCard && window.matchMedia("(pointer: fine)").matches) {
  heroCard.addEventListener("mousemove", (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroCard.style.animation = "none";
    heroCard.style.transform =
      `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) rotateZ(2deg)`;
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.animation = "";
    heroCard.style.transform = "";
  });
}

// Keyboard accessibility for Enter/Space on cards that act as visual links
document.querySelectorAll(".photo-card, .activity-card").forEach((card) => {
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      const link = card.querySelector("a");
      if (link) link.click();
    }
  });
});
