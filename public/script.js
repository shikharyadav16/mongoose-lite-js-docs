/* ============================================================
   mongoose-lite-js — Documentation Site Scripts
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ---- Scroll Animations (IntersectionObserver) ----
  const animatedElements = document.querySelectorAll(
    ".anim-fade-up, .anim-fade-left, .anim-fade-right"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));

  // ---- Navbar scroll behavior ----
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const current = window.scrollY;
      if (current > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      lastScroll = current;
    },
    { passive: true }
  );

  // ---- Navbar active link highlighting ----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function highlightNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

  // Add active link styles
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    .nav-links a.active {
      color: var(--text) !important;
      background: #ffffff0a;
    }
  `;
  document.head.appendChild(styleEl);

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById("navToggle");
  const navLinksContainer = document.getElementById("navLinks");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("open");
      const icon = navToggle.querySelector("i");
      if (navLinksContainer.classList.contains("open")) {
        icon.className = "ph ph-x";
      } else {
        icon.className = "ph ph-list";
      }
    });

    // Close mobile nav when a link is clicked
    navLinksContainer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("open");
        navToggle.querySelector("i").className = "ph ph-list";
      });
    });
  }

  // ---- Copy install command ----
  const copyBtn = document.getElementById("copyBtn");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText("npm install mongoose-lite-js")
        .then(() => {
          const icon = copyBtn.querySelector("i");
          icon.className = "ph ph-check";
          copyBtn.classList.add("copied");

          setTimeout(() => {
            icon.className = "ph ph-copy";
            copyBtn.classList.remove("copied");
          }, 2000);
        })
        .catch(() => {
          // Fallback for older browsers
          const textarea = document.createElement("textarea");
          textarea.value = "npm install mongoose-lite-js";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);

          const icon = copyBtn.querySelector("i");
          icon.className = "ph ph-check";
          copyBtn.classList.add("copied");

          setTimeout(() => {
            icon.className = "ph ph-copy";
            copyBtn.classList.remove("copied");
          }, 2000);
        });
    });
  }

  // ---- Scroll-to-top button ----
  const scrollTopBtn = document.getElementById("scrollTop");

  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 500) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      },
      { passive: true }
    );

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ---- Parallax glow effect on mouse move ----
  const heroSection = document.querySelector(".hero");
  const glows = document.querySelectorAll(".hero-glow");

  if (heroSection && glows.length) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      glows.forEach((glow, i) => {
        const factor = (i + 1) * 15;
        glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

  // ---- Flow diagram scroll reveal ----
  const flowDiagram = document.getElementById("flowDiagram");

  if (flowDiagram) {
    const flowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("flow-visible");
            flowObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    flowObserver.observe(flowDiagram);
  }

  // ---- Typing effect for hero code ----
  const codeBody = document.querySelector(".hero-code .code-body code");
  if (codeBody) {
    const originalHTML = codeBody.innerHTML;
    // Display code immediately — no typing delay needed
    codeBody.innerHTML = originalHTML;
  }
});
