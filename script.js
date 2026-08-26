document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-link");

  const setActiveLink = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navAnchors.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Rotating role text in hero ---------- */
  const roles = [
    "Web Developer",
    "Digital Marketer",
    "Digital Solutions Specialist",
  ];
  const roleEl = document.getElementById("roleCycle");
  let roleIndex = 0;

  if (
    roleEl &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleEl.style.opacity = "0";
      setTimeout(() => {
        roleEl.textContent = roles[roleIndex];
        roleEl.style.opacity = "1";
      }, 250);
    }, 2600);
    roleEl.style.transition = "opacity .25s ease";
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    ".about-text, .about-stats, .skill-card, .work-card, .timeline-item, .service-card, .journey-item, .contact-info, .contact-form",
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const progressFill = document.querySelector(".progress-fill");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
  if (progressFill) revealObserver.observe(progressFill);

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  if (progressFill) progressObserver.observe(progressFill);

  /* ---------- Contact form (front-end only) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in every field before sending.";
        status.style.color = "#E7A93C";
        return;
      }

      // NOTE: This is front-end only. Connect it to a form service
      // (e.g. Formspree, EmailJS) or your own backend to actually
      // receive submissions.
      status.textContent = `Thanks, ${name.split(" ")[0]} — your message is ready to send. Connect this form to your email service to go live.`;
      status.style.color = "#45CDB0";
      form.reset();
    });
  }
});
