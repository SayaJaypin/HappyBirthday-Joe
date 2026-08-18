document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =========================
     ELEMENTS
  ========================== */

  const opening = document.getElementById("opening");
  const startButton = document.getElementById("startButton");

  const navbar = document.getElementById("navbar");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const musicButton = document.getElementById("musicButton");
  const musicText = document.getElementById("musicText");
  const bgMusic = document.getElementById("bgMusic");

  const journeyFill = document.getElementById("journeyFill");
  const journeyPercent = document.getElementById("journeyPercent");

  const openLetter = document.getElementById("openLetter");
  const envelopeWrap = document.getElementById("envelopeWrap");
  const envelope = document.querySelector(".envelope");

  const blowButton = document.getElementById("blowButton");
  const cake = document.querySelector(".cake");
  const cakeSmoke = document.getElementById("cakeSmoke");

  const wishForm = document.getElementById("wishForm");
  const wishInput = document.getElementById("wishInput");
  const wishButton = document.getElementById("wishButton");
  const wishResult = document.getElementById("wishResult");
  const wishText = document.getElementById("wishText");

  const giftBox = document.getElementById("giftBox");
  const surpriseMessage = document.getElementById("surpriseMessage");

  const secretPaw = document.getElementById("secretPaw");
  const secretModal = document.getElementById("secretModal");
  const secretClose = document.getElementById("secretClose");

  const replayButton = document.getElementById("replayButton");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxCurrent = document.getElementById("lightboxCurrent");

  const heart3D = document.getElementById("heart3D");
  const loveScene = document.getElementById("loveScene");

  const cursorGlow = document.querySelector(".cursor-glow");


  /* =========================
     OPEN EXPERIENCE
  ========================== */

  document.body.classList.add("locked");

  startButton.addEventListener("click", async () => {

    opening.classList.add("hidden");
    document.body.classList.remove("locked");
    navbar.classList.add("active");

    try {
      await bgMusic.play();
      musicButton.classList.remove("paused");
      musicText.textContent = "Sedang diputar";
    } catch (error) {
      musicButton.classList.add("paused");
      musicText.textContent = "Putar musik";
    }

    createParticles(18);

  });


  /* =========================
     MUSIC
  ========================== */

  musicButton.classList.add("paused");

  musicButton.addEventListener("click", async () => {

    if (bgMusic.paused) {

      try {
        await bgMusic.play();
        musicButton.classList.remove("paused");
        musicText.textContent = "Sedang diputar";
      } catch (error) {
        musicText.textContent = "Tidak dapat diputar";
      }

    } else {

      bgMusic.pause();
      musicButton.classList.add("paused");
      musicText.textContent = "Musik";

    }

  });


  /* =========================
     MOBILE MENU
  ========================== */

  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });

  });


  /* =========================
     CURSOR
  ========================== */

  if (window.matchMedia("(pointer:fine)").matches) {

    window.addEventListener("mousemove", event => {

      cursorGlow.style.opacity = "1";
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;

    });

  }


  /* =========================
     SCROLL REVEAL
  ========================== */

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
  });


  /* =========================
     NAVBAR SCROLL
  ========================== */

  window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {
      navbar.classList.add("active");
    } else if (!opening.classList.contains("hidden")) {
      navbar.classList.remove("active");
    }

    updateJourneyProgress();

  }, {
    passive: true
  });


  /* =========================
     ACTIVE NAVIGATION
  ========================== */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".desktop-nav a"
  );

  const sectionObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {
            link.classList.remove("active");

            if (
              link.getAttribute("href") ===
              `#${entry.target.id}`
            ) {
              link.classList.add("active");
            }

          });

        }

      });

    },
    {
      threshold: 0.45
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* =========================
     JOURNEY PROGRESS
  ========================== */

  function updateJourneyProgress() {

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) return;

    const progress =
      Math.min(
        100,
        Math.max(
          0,
          (window.scrollY / documentHeight) * 100
        )
      );

    journeyFill.style.height = `${progress}%`;
    journeyPercent.textContent =
      `${Math.round(progress)}%`;

  }


  /* =========================
     INDONESIAN CLOCKS
  ========================== */

  const clockOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  };

  const dateOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  };

  function updateIndonesiaClocks() {

    const now = new Date();

    document.querySelectorAll(".clock-time").forEach(element => {

      const zone = element.dataset.zone;

      element.textContent =
        new Intl.DateTimeFormat(
          "id-ID",
          {
            ...clockOptions,
            timeZone: zone
          }
        ).format(now);

    });

    document.querySelectorAll(".clock-date").forEach(element => {

      const zone =
        element.dataset.dateZone;

      element.textContent =
        new Intl.DateTimeFormat(
          "id-ID",
          {
            ...dateOptions,
            timeZone: zone
          }
        ).format(now);

    });

  }

  updateIndonesiaClocks();

  setInterval(
    updateIndonesiaClocks,
    1000
  );


  /* =========================
     COUNTDOWN
  ========================== */

  function getIndonesiaYear() {

    const now = new Date();

    return Number(
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone: "Asia/Jakarta",
          year: "numeric"
        }
      ).format(now)
    );

  }


  function getJakartaDateParts(date) {

    const parts =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone: "Asia/Jakarta",
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hourCycle: "h23"
        }
      ).formatToParts(date);

    const output = {};

    parts.forEach(part => {
      if (part.type !== "literal") {
        output[part.type] =
          Number(part.value);
      }
    });

    return output;

  }


  function getTargetBirthday() {

    const now = new Date();
    const parts = getJakartaDateParts(now);

    let year = parts.year;

    let target =
      new Date(
        Date.UTC(
          year,
          7,
          17,
          17,
          0,
          0
        )
      );

    if (now.getTime() >= target.getTime()) {

      target =
        new Date(
          Date.UTC(
            year + 1,
            7,
            17,
            17,
            0,
            0
          )
        );

    }

    return target;

  }


  function updateCountdown() {

    const now = new Date();
    const target = getTargetBirthday();

    let difference =
      target.getTime() -
      now.getTime();

    if (difference < 0) {
      difference = 0;
    }

    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (difference %
          (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

    const minutes =
      Math.floor(
        (difference %
          (1000 * 60 * 60)) /
        (1000 * 60)
      );

    const seconds =
      Math.floor(
        (difference %
          (1000 * 60)) /
        1000
      );

    document.getElementById("countDays")
      .textContent =
      String(days).padStart(3, "0");

    document.getElementById("countHours")
      .textContent =
      String(hours).padStart(2, "0");

    document.getElementById("countMinutes")
      .textContent =
      String(minutes).padStart(2, "0");

    document.getElementById("countSeconds")
      .textContent =
      String(seconds).padStart(2, "0");

  }

  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );


  /* =========================
     LETTER
  ========================== */

  openLetter.addEventListener("click", () => {

    envelopeWrap.classList.add("opened");

    setTimeout(() => {

      envelope.classList.add("open");

      openLetter.textContent =
        "Surat telah dibuka";

      openLetter.disabled = true;

      revealLetterParagraphs();

    }, 100);

  });


  function revealLetterParagraphs() {

    const paragraphs =
      document.querySelectorAll(
        ".letter-body p"
      );

    paragraphs.forEach((paragraph, index) => {

      paragraph.style.opacity = "0";
      paragraph.style.transform =
        "translateY(12px)";

      paragraph.style.transition =
        "opacity .8s ease, transform .8s ease";

      setTimeout(() => {

        paragraph.style.opacity = "1";
        paragraph.style.transform =
          "translateY(0)";

      }, 1000 + index * 180);

    });

  }


  /* =========================
     CAKE
  ========================== */

  let candleBlown = false;

  blowButton.addEventListener("click", () => {

    if (candleBlown) return;

    candleBlown = true;

    cake.classList.add("blown");
    cakeSmoke.classList.add("active");

    blowButton.textContent =
      "Harapanmu sudah dilepaskan";

    createParticles(40);

    setTimeout(() => {

      document.getElementById("wish")
        .scrollIntoView({
          behavior: "smooth"
        });

    }, 1300);

  });


  /* =========================
     WISH
  ========================== */

  const savedWish =
    localStorage.getItem(
      "birthday_wish_18_august"
    );

  if (savedWish) {
    showWish(savedWish);
  }


  wishButton.addEventListener("click", () => {

    const value =
      wishInput.value.trim();

    if (!value) {

      wishInput.focus();

      return;
    }

    localStorage.setItem(
      "birthday_wish_18_august",
      value
    );

    showWish(value);

    createParticles(25);

  });


  wishInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
      wishButton.click();
    }

  });


  function showWish(value) {

    wishForm.style.display = "none";

    wishText.textContent = value;

    wishResult.classList.add("active");

  }


  /* =========================
     3D HEART DRAG
  ========================== */

  let heartRotationX = -12;
  let heartRotationY = -25;

  let draggingHeart = false;

  let lastPointerX = 0;
  let lastPointerY = 0;

  function renderHeart() {

    heart3D.style.transform =
      `rotateX(${heartRotationX}deg)
       rotateY(${heartRotationY}deg)
       rotateZ(0deg)`;

  }

  loveScene.addEventListener(
    "pointerdown",
    event => {

      draggingHeart = true;

      lastPointerX = event.clientX;
      lastPointerY = event.clientY;

      loveScene.setPointerCapture(
        event.pointerId
      );

    }
  );


  loveScene.addEventListener(
    "pointermove",
    event => {

      if (!draggingHeart) return;

      const deltaX =
        event.clientX -
        lastPointerX;

      const deltaY =
        event.clientY -
        lastPointerY;

      heartRotationY +=
        deltaX * .6;

      heartRotationX -=
        deltaY * .6;

      heartRotationX =
        Math.max(
          -70,
          Math.min(
            70,
            heartRotationX
          )
        );

      lastPointerX =
        event.clientX;

      lastPointerY =
        event.clientY;

      renderHeart();

    }
  );


  loveScene.addEventListener(
    "pointerup",
    () => {
      draggingHeart = false;
    }
  );

  loveScene.addEventListener(
    "pointercancel",
    () => {
      draggingHeart = false;
    }
  );


  /* =========================
     AUTO 3D HEART
  ========================== */

  let autoRotation = true;

  setInterval(() => {

    if (
      !draggingHeart &&
      autoRotation &&
      !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      heartRotationY += .12;

      renderHeart();

    }

  }, 30);


  loveScene.addEventListener(
    "pointerdown",
    () => {
      autoRotation = false;

      clearTimeout(
        window.__heartResumeTimer
      );

      window.__heartResumeTimer =
        setTimeout(() => {
          autoRotation = true;
        }, 5000);

    }
  );


  /* =========================
     GIFT BOX
  ========================== */

  giftBox.addEventListener("click", () => {

    giftBox.classList.toggle("open");

    if (giftBox.classList.contains("open")) {

      surpriseMessage.classList.add("active");

      createParticles(35);

      setTimeout(() => {

        surpriseMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }, 500);

    } else {

      surpriseMessage.classList.remove(
        "active"
      );

    }

  });


  /* =========================
     SECRET PAW
  ========================== */

  secretPaw.addEventListener(
    "click",
    () => {

      secretModal.classList.add("active");
      secretModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add("locked");

      createParticles(20);

    }
  );


  function closeSecret() {

    secretModal.classList.remove(
      "active"
    );

    secretModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "locked"
    );

  }


  secretClose.addEventListener(
    "click",
    closeSecret
  );


  secretModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        secretModal
      ) {
        closeSecret();
      }

    }
  );


  /* =========================
     PHOTO LIGHTBOX
  ========================== */

  const photos = [
    "assets/photo-1.jpg",
    "assets/photo-2.jpg",
    "assets/photo-3.jpg",
    "assets/photo-4.jpg"
  ];

  let currentPhoto = 0;

  document
    .querySelectorAll(".memory-card")
    .forEach(card => {

      card.addEventListener(
        "click",
        () => {

          currentPhoto =
            Number(
              card.dataset.photo
            );

          openPhoto(
            currentPhoto
          );

        }
      );

    });


  function openPhoto(index) {

    currentPhoto =
      (index + photos.length) %
      photos.length;

    lightboxImage.src =
      photos[currentPhoto];

    lightboxCurrent.textContent =
      String(currentPhoto + 1)
        .padStart(2, "0");

    lightbox.classList.add("active");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "locked"
    );

  }


  function closeLightbox() {

    lightbox.classList.remove(
      "active"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "locked"
    );

  }


  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );

  lightboxPrev.addEventListener(
    "click",
    () => {
      openPhoto(currentPhoto - 1);
    }
  );

  lightboxNext.addEventListener(
    "click",
    () => {
      openPhoto(currentPhoto + 1);
    }
  );


  lightbox.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        lightbox
      ) {
        closeLightbox();
      }

    }
  );


  /* =========================
     KEYBOARD
  ========================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        lightbox.classList.contains(
          "active"
        )
      ) {

        if (event.key === "Escape") {
          closeLightbox();
        }

        if (event.key === "ArrowLeft") {
          openPhoto(currentPhoto - 1);
        }

        if (event.key === "ArrowRight") {
          openPhoto(currentPhoto + 1);
        }

      }

      if (
        secretModal.classList.contains(
          "active"
        ) &&
        event.key === "Escape"
      ) {

        closeSecret();

      }

    }
  );


  /* =========================
     BACKGROUND PARTICLES
  ========================== */

  document.addEventListener(
    "click",
    event => {

      const interactive =
        event.target.closest(
          "button, a, input"
        );

      if (interactive) return;

      createSmallParticle(
        event.clientX,
        event.clientY
      );

    }
  );


  function createSmallParticle(x, y) {

    const particle =
      document.createElement("span");

    particle.className =
      "click-particle";

    particle.style.left =
      `${x}px`;

    particle.style.top =
      `${y}px`;

    document.body.appendChild(
      particle
    );

    requestAnimationFrame(() => {

      particle.style.transform =
        `translate(
          ${Math.random() * 30 - 15}px,
          ${-40 - Math.random() * 40}px
        ) scale(0)`;

      particle.style.opacity = "0";

    });

    setTimeout(() => {
      particle.remove();
    }, 900);

  }


  function createParticles(amount) {

    for (
      let i = 0;
      i < amount;
      i++
    ) {

      setTimeout(() => {

        const particle =
          document.createElement(
            "span"
          );

        particle.className =
          "celebration-particle";

        particle.style.left =
          `${Math.random() * 100}%`;

        particle.style.top =
          `${35 + Math.random() * 40}%`;

        particle.style.setProperty(
          "--x",
          `${Math.random() * 220 - 110}px`
        );

        particle.style.setProperty(
          "--y",
          `${Math.random() * -300 - 50}px`
        );

        document.body.appendChild(
          particle
        );

        setTimeout(() => {
          particle.remove();
        }, 1800);

      }, i * 20);

    }

  }


  /* =========================
     DYNAMIC PARTICLE CSS
  ========================== */

  const particleStyle =
    document.createElement("style");

  particleStyle.textContent = `
    .click-particle {
      position: fixed;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #fff;
      z-index: 9998;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition:
        transform .9s cubic-bezier(.22,1,.36,1),
        opacity .9s ease;
    }

    .celebration-particle {
      position: fixed;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #fff;
      z-index: 9998;
      pointer-events: none;
      animation:
        celebrationParticle 1.8s
        cubic-bezier(.22,1,.36,1)
        forwards;
    }

    @keyframes celebrationParticle {
      0% {
        opacity: 1;
        transform:
          translate(0,0)
          rotate(0)
          scale(1);
      }

      100% {
        opacity: 0;
        transform:
          translate(var(--x),var(--y))
          rotate(360deg)
          scale(.2);
      }
    }
  `;

  document.head.appendChild(
    particleStyle
  );


  /* =========================
     REPLAY
  ========================== */

  replayButton.addEventListener(
    "click",
    async () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      await new Promise(
        resolve =>
          setTimeout(resolve, 700)
      );

      opening.classList.remove(
        "hidden"
      );

      navbar.classList.remove(
        "active"
      );

      document.body.classList.add(
        "locked"
      );

      bgMusic.pause();
      bgMusic.currentTime = 0;

      musicButton.classList.add(
        "paused"
      );

      musicText.textContent =
        "Musik";

      cake.classList.remove(
        "blown"
      );

      cakeSmoke.classList.remove(
        "active"
      );

      candleBlown = false;

      blowButton.textContent =
        "Padamkan lilin";

      giftBox.classList.remove(
        "open"
      );

      surpriseMessage.classList.remove(
        "active"
      );

      mobileMenu.classList.remove(
        "open"
      );

      heartRotationX = -12;
      heartRotationY = -25;

      renderHeart();

    }
  );


  /* =========================
     TIMELINE INTERACTION
  ========================== */

  document
    .querySelectorAll(".timeline-item")
    .forEach(item => {

      item.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".timeline-item"
            )
            .forEach(other => {

              if (other !== item) {
                other.classList.remove(
                  "active"
                );
              }

            });

          item.classList.toggle(
            "active"
          );

        }
      );

    });


  /* =========================
     IMAGE ERROR HANDLING
  ========================== */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.background =
            "linear-gradient(135deg,#111,#333)";

          image.style.minHeight =
            "200px";

        }
      );

    });


  /* =========================
     INITIAL
  ========================== */

  renderHeart();
  updateJourneyProgress();

});