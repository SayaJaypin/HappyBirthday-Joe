/* =========================================================
   LOVE BIRTHDAY WEBSITE
   FULL INDONESIA
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");

const heroMusicButton =
  document.getElementById("heroMusicButton");

const playerPlay =
  document.getElementById("playerPlay");

const playerPlayIcon =
  document.getElementById("playerPlayIcon");

const playerMute =
  document.getElementById("playerMute");

const muteText =
  document.getElementById("muteText");


/* =========================================================
   MUSIC
========================================================= */

let musicPlaying = false;

function updateMusicUI() {

  if (musicPlaying) {

    musicText.textContent = "Jeda";
    playerPlayIcon.textContent = "Ⅱ";

  } else {

    musicText.textContent = "Putar";
    playerPlayIcon.textContent = "▶";

  }

}

async function toggleMusic() {

  if (!musicPlaying) {

    try {

      await music.play();

      musicPlaying = true;

    } catch (error) {

      console.warn(
        "Browser belum mengizinkan pemutaran otomatis.",
        error
      );

    }

  } else {

    music.pause();

    musicPlaying = false;

  }

  updateMusicUI();

}

musicButton.addEventListener(
  "click",
  toggleMusic
);

heroMusicButton.addEventListener(
  "click",
  toggleMusic
);

playerPlay.addEventListener(
  "click",
  toggleMusic
);

playerMute.addEventListener(
  "click",
  () => {

    music.muted = !music.muted;

    muteText.textContent =
      music.muted
        ? "Bersuara"
        : "Suara";

  }
);

music.addEventListener(
  "play",
  () => {

    musicPlaying = true;
    updateMusicUI();

  }
);

music.addEventListener(
  "pause",
  () => {

    musicPlaying = false;
    updateMusicUI();

  }
);


/* =========================================================
   REALTIME INDONESIA
========================================================= */

const timeFormatter = (
  timeZone
) => {

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23"
    }
  );

};


const dateFormatter =
  new Intl.DateTimeFormat(
    "id-ID",
    {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );


function updateIndonesiaTime() {

  const now = new Date();

  document.getElementById(
    "wibTime"
  ).textContent =
    timeFormatter(
      "Asia/Jakarta"
    ).format(now);

  document.getElementById(
    "witaTime"
  ).textContent =
    timeFormatter(
      "Asia/Makassar"
    ).format(now);

  document.getElementById(
    "witTime"
  ).textContent =
    timeFormatter(
      "Asia/Jayapura"
    ).format(now);

  document.getElementById(
    "indonesiaDate"
  ).textContent =
    dateFormatter.format(now);

  document.getElementById(
    "lastUpdate"
  ).textContent =
    new Intl.DateTimeFormat(
      "id-ID",
      {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
      }
    ).format(now);

}

updateIndonesiaTime();

setInterval(
  updateIndonesiaTime,
  1000
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

          }

        }
      );

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(
  element => {

    revealObserver.observe(
      element
    );

  }
);


/* =========================================================
   NAVIGATION ACTIVE STATE
========================================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav-link"
  );

const mobileLinks =
  document.querySelectorAll(
    ".mobile-nav-item"
  );


const navigationObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            const id =
              entry.target.id;

            navLinks.forEach(
              link => {

                link.classList.toggle(
                  "active",
                  link.getAttribute("href") ===
                  `#${id}`
                );

              }
            );

            mobileLinks.forEach(
              link => {

                link.classList.toggle(
                  "active",
                  link.getAttribute("href") ===
                  `#${id}`
                );

              }
            );

          }

        }
      );

    },
    {
      threshold: 0.35
    }
  );


sections.forEach(
  section => {

    navigationObserver.observe(
      section
    );

  }
);


/* =========================================================
   JOURNEY PROGRESS
========================================================= */

const progressBar =
  document.getElementById(
    "progressBar"
  );

const progressPercent =
  document.getElementById(
    "progressPercent"
  );


function updateProgress() {

  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    documentHeight <= 0
      ? 0
      : Math.min(
          100,
          Math.max(
            0,
            (scrollTop / documentHeight) * 100
          )
        );

  progressBar.style.width =
    `${progress}%`;

  progressPercent.textContent =
    `${Math.round(progress)}%`;

}

window.addEventListener(
  "scroll",
  updateProgress,
  { passive: true }
);

updateProgress();


/* =========================================================
   PHOTO LIGHTBOX
========================================================= */

const photos = [
  "assets/photo-1.jpg",
  "assets/photo-2.jpg",
  "assets/photo-3.jpg",
  "assets/photo-4.jpg"
];

const photoCards =
  document.querySelectorAll(
    ".photo-card"
  );

const lightbox =
  document.getElementById(
    "lightbox"
  );

const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );

const lightboxCounter =
  document.getElementById(
    "lightboxCounter"
  );

const lightboxClose =
  document.getElementById(
    "lightboxClose"
  );

const lightboxPrev =
  document.getElementById(
    "lightboxPrev"
  );

const lightboxNext =
  document.getElementById(
    "lightboxNext"
  );

let currentPhoto = 0;


function openLightbox(
  index
) {

  currentPhoto = index;

  lightboxImage.src =
    photos[currentPhoto];

  lightboxCounter.textContent =
    `${String(currentPhoto + 1).padStart(2, "0")} / 04`;

  lightbox.classList.add(
    "open"
  );

  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeLightbox() {

  lightbox.classList.remove(
    "open"
  );

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


function nextPhoto() {

  currentPhoto =
    (currentPhoto + 1) %
    photos.length;

  openLightbox(
    currentPhoto
  );

}


function previousPhoto() {

  currentPhoto =
    (currentPhoto - 1 + photos.length) %
    photos.length;

  openLightbox(
    currentPhoto
  );

}


photoCards.forEach(
  (card, index) => {

    card.addEventListener(
      "click",
      () => {

        openLightbox(index);

      }
    );

  }
);

lightboxClose.addEventListener(
  "click",
  closeLightbox
);

lightboxNext.addEventListener(
  "click",
  nextPhoto
);

lightboxPrev.addEventListener(
  "click",
  previousPhoto
);

lightbox.addEventListener(
  "click",
  event => {

    if (
      event.target === lightbox
    ) {

      closeLightbox();

    }

  }
);

document.addEventListener(
  "keydown",
  event => {

    if (
      !lightbox.classList.contains("open")
    ) {
      return;
    }

    if (
      event.key === "Escape"
    ) {

      closeLightbox();

    }

    if (
      event.key === "ArrowRight"
    ) {

      nextPhoto();

    }

    if (
      event.key === "ArrowLeft"
    ) {

      previousPhoto();

    }

  }
);


/* =========================================================
   3D HEART
========================================================= */

const heart =
  document.getElementById(
    "heart3D"
  );

let rotateX = -12;
let rotateY = -22;

let dragging = false;

let startX = 0;
let startY = 0;

let startRotateX = rotateX;
let startRotateY = rotateY;


function renderHeart() {

  heart.style.transform =
    `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      rotateZ(-3deg)
    `;

}


heart.addEventListener(
  "pointerdown",
  event => {

    dragging = true;

    startX = event.clientX;
    startY = event.clientY;

    startRotateX = rotateX;
    startRotateY = rotateY;

    heart.setPointerCapture(
      event.pointerId
    );

  }
);


heart.addEventListener(
  "pointermove",
  event => {

    if (!dragging) {
      return;
    }

    const deltaX =
      event.clientX - startX;

    const deltaY =
      event.clientY - startY;

    rotateY =
      startRotateY +
      deltaX * .45;

    rotateX =
      startRotateX -
      deltaY * .45;

    rotateX =
      Math.max(
        -55,
        Math.min(
          55,
          rotateX
        )
      );

    renderHeart();

  }
);


heart.addEventListener(
  "pointerup",
  () => {

    dragging = false;

  }
);


heart.addEventListener(
  "pointercancel",
  () => {

    dragging = false;

  }
);


heart.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "ArrowLeft"
    ) {

      rotateY -= 10;

    }

    if (
      event.key === "ArrowRight"
    ) {

      rotateY += 10;

    }

    if (
      event.key === "ArrowUp"
    ) {

      rotateX -= 10;

    }

    if (
      event.key === "ArrowDown"
    ) {

      rotateX += 10;

    }

    renderHeart();

  }
);


renderHeart();


/* =========================================================
   PARALLAX
========================================================= */

const heroVisual =
  document.querySelector(
    ".hero-visual"
  );


window.addEventListener(
  "scroll",
  () => {

    if (
      window.innerWidth <= 700
    ) {
      return;
    }

    const scroll =
      window.scrollY;

    if (
      scroll < window.innerHeight
    ) {

      heroVisual.style.transform =
        `translateY(${scroll * .08}px)`;

    }

  },
  { passive: true }
);


/* =========================================================
   CARD HOVER LIGHT
========================================================= */

const glassCards =
  document.querySelectorAll(
    ".timeline-card, .clock-card, .quote-card, .birthday-card"
  );


glassCards.forEach(
  card => {

    card.addEventListener(
      "pointermove",
      event => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const px =
          (x / rect.width) * 100;

        const py =
          (y / rect.height) * 100;

        card.style.background =
          `
          radial-gradient(
            circle at ${px}% ${py}%,
            rgba(255,255,255,.12),
            transparent 35%
          ),
          linear-gradient(
            145deg,
            rgba(255,255,255,.09),
            rgba(255,255,255,.035)
          )
          `;

      }
    );

    card.addEventListener(
      "pointerleave",
      () => {

        card.style.background =
          "";

      }
    );

  }
);


/* =========================================================
   PHOTO KEYBOARD ACCESS
========================================================= */

photoCards.forEach(
  (card, index) => {

    card.setAttribute(
      "tabindex",
      "0"
    );

    card.setAttribute(
      "role",
      "button"
    );

    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openLightbox(index);

        }

      }
    );

  }
);


/* =========================================================
   MUSIC START ON FIRST USER INTERACTION
========================================================= */

let attemptedAutoplay = false;

document.addEventListener(
  "click",
  async () => {

    if (
      attemptedAutoplay
    ) {
      return;
    }

    attemptedAutoplay = true;

    try {

      await music.play();

      musicPlaying = true;

      updateMusicUI();

    } catch {

      /*
        Browser dapat menolak autoplay.
        Tombol musik tetap tersedia.
      */

    }

  },
  {
    once: true
  }
);


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "loaded"
    );

    setTimeout(
      () => {

        revealElements.forEach(
          element => {

            const rect =
              element.getBoundingClientRect();

            if (
              rect.top <
              window.innerHeight
            ) {

              element.classList.add(
                "visible"
              );

            }

          }
        );

      },
      150
    );

  }
);