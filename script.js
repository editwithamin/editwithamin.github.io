/* =====================================
   PORTFOLIO CONFIG
===================================== */

const CONFIG = {
  whatsapp: "917777888747",
  email: "amin.visualpro@gmail.com",
  instagram: "editwithamin"
};


/* =====================================
   SELECTED WORKS
===================================== */

const WORKS = [
  {
    title: "E-commerce Brand Campaign",
    type: "Instagram reel",
    video: "video/brand-campaign.mp4",
    poster: "images/talking-thumb3.jpg"
  },
  {
    title: "Education Awareness Reel",
    type: "Instagram reel",
    video: "video/1004.mp4",
    poster: "images/talking-thumb4.jpg"
  },
  {
    title: "Business loan campaign",
    type: "Instagram reel",
    video: "video/1028.mp4",
    poster: "images/talking-thumb5.jpg"
  },
  {
    title: "Quran Pak - Islamic Facts",
    type: "Instagram reel",
    video: "video/MuzammilIslamic_Reel_01.mp4",
    poster: "images/Islamic.jpg"
  }
];


/* =====================================
   CONTACT LINKS
===================================== */

document.querySelectorAll(".js-whatsapp").forEach(function (link) {

  const message =
    "Hi, I saw your portfolio and want to discuss a video project.";

  link.href =
    "https://wa.me/" +
    CONFIG.whatsapp +
    "?text=" +
    encodeURIComponent(message);

  link.target = "_blank";
  link.rel = "noopener noreferrer";

});


document.querySelectorAll(".js-email").forEach(function (link) {

  link.href = "mailto:" + CONFIG.email;

});


document.querySelectorAll(".js-instagram").forEach(function (link) {

  link.href =
    "https://instagram.com/" +
    CONFIG.instagram;

  link.target = "_blank";
  link.rel = "noopener noreferrer";

});


/* =====================================
   FOOTER YEAR
===================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =====================================
   VIDEO MODAL
===================================== */

const modal = document.getElementById("modal");
const frame = document.getElementById("frame");
const closeButton = document.getElementById("close");


function openVideo(id, vertical = false) {

  if (!modal || !frame) return;

  modal.classList.toggle("vertical", vertical);

  frame.innerHTML = `
    <iframe
      src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"
      allow="autoplay; encrypted-media; fullscreen"
      allowfullscreen
      title="Video player">
    </iframe>
  `;

  modal.showModal();

}


function closeVideo() {

  if (!modal) return;

  modal.close();

}


if (modal && frame) {

  modal.addEventListener("close", function () {

    frame.innerHTML = "";

  });


  modal.addEventListener("click", function (event) {

    if (event.target === modal) {

      closeVideo();

    }

  });

}


if (closeButton) {

  closeButton.addEventListener("click", closeVideo);

}


/* =====================================
   VIDEO THUMBNAIL HELPERS
===================================== */

function thumb(id) {

  return "https://img.youtube.com/vi/" +
    id +
    "/hqdefault.jpg";

}


function hideBroken(img) {

  img.onerror = function () {

    img.style.display = "none";

  };

}


/* =====================================
   LOCAL VIDEO PLAYER
===================================== */

// function openLocal(src, vertical = true) {

//   if (!modal || !frame) return;

//   modal.classList.toggle("vertical", vertical);

//   frame.innerHTML = `
//     <video
//       src="${src}"
//       controls
//       autoplay
//       playsinline
//       style="
//         width:100%;
//         height:100%;
//         object-fit:contain;
//         background:#000;
//         border-radius:10px;
//       ">
//     </video>
//   `;

//   modal.showModal();

// }

// function openLocal(src, vertical = true) {

//   if (!modal || !frame) return;

//   modal.classList.toggle("vertical", vertical);

//   const isDrive = src.includes("drive.google.com");

//   if (isDrive) {

//     const fileId = "1sb12J98qckZXSQFdrR9WuFE4lA5pLG49";

//     frame.innerHTML = `
//       <iframe
//         src="https://drive.google.com/file/d/${fileId}/preview"
//         allow="autoplay; fullscreen"
//         allowfullscreen
//         style="
//           width:100%;
//           height:100%;
//           border:0;
//           border-radius:10px;
//         ">
//       </iframe>
//     `;

//   } else {

//     frame.innerHTML = `
//       <video
//         src="${src}"
//         controls
//         autoplay
//         playsinline
//         style="
//           width:100%;
//           height:100%;
//           object-fit:contain;
//           background:#000;
//           border-radius:10px;
//         ">
//       </video>
//     `;
//   }

//   modal.showModal();
// }


function getDriveId(src) {

  const match =
    src.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    src.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  return match ? match[1] : null;

}


function openLocal(src, vertical = true) {

  if (!modal || !frame) return;

  modal.classList.toggle("vertical", vertical);

  frame.innerHTML = "";

  const driveId = src.includes("drive.google.com")
    ? getDriveId(src)
    : null;


  /* Google Drive video */

  if (driveId) {

    frame.innerHTML = `
      <iframe
        src="https://drive.google.com/file/d/${driveId}/preview"
        allow="autoplay; fullscreen"
        allowfullscreen
        style="width:100%;height:100%;border:0;border-radius:10px;">
      </iframe>
    `;

    modal.showModal();

    return;

  }


  /* Local video (video folder) */

  const video = document.createElement("video");

  video.src = src;
  video.controls = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = "auto";

  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  video.style.cssText =
    "width:100%;height:100%;object-fit:contain;" +
    "background:#000;border-radius:10px;";

  frame.appendChild(video);

  modal.showModal();

  const playPromise = video.play();

  if (playPromise !== undefined) {

    // playPromise.catch(function () {

    //   video.muted = true;

    //   video.play().catch(function () {});

    // });

    playPromise.catch(function () {
  console.log("Autoplay blocked. Press play manually.");
});

  }

}


/* =====================================
   SHOWREEL
===================================== */

document.querySelectorAll(".reel").forEach(function (card) {

  const id = card.dataset.id;
  const file = card.dataset.video;
  const poster = card.dataset.poster || card.dataset.thumbnail;

  const img = card.querySelector("img");


  /* Local video */

  if (file && img) {

    const video = document.createElement("video");

    video.muted = true;
    video.playsInline = true;

    if (poster) {

      /* Thumbnail photo (nahi mili to video ka frame dikhega) */

      const test = new Image();

      test.onload = function () {
        video.poster = poster;
        video.preload = "none";
        video.src = file;
      };

      test.onerror = function () {
        console.warn("Thumbnail nahi mila: " + poster);
        video.preload = "metadata";
        video.src = file + "#t=0.001";
      };

      test.src = poster;

    } else {

      /* Video ka pehla frame */
      video.preload = "metadata";
      video.src = file + "#t=0.001";

    }

    img.replaceWith(video);

  }


  /* YouTube thumbnail */

  else if (img && id) {

    hideBroken(img);

    img.src = thumb(id);

  }


  /* Open video */

  card.addEventListener("click", function () {

    if (file) {

      openLocal(file, true);

    }

    else if (id) {

      openVideo(id, true);

    }

  });

});

/* =====================================
   SELECTED WORK GRID
===================================== */

const grid = document.getElementById("work-grid");


if (grid) {

  grid.innerHTML = "";

  WORKS.forEach(function (work) {

    const card = document.createElement("article");

    card.className = "card work";


    /* Card HTML */

    card.innerHTML = `
      <button
        class="video"
        type="button"
        aria-label="Play ${work.title}">

        <span class="play"></span>

      </button>

      <h3></h3>

      <p></p>
    `;


    /* Project title */

    card.querySelector("h3").textContent =
      work.title;


    /* Project type */

    card.querySelector("p").textContent =
      work.type;


    /* Video thumbnail */

    const button = card.querySelector(".video");

    const video = document.createElement("video");

    video.muted = true;
    video.playsInline = true;

    if (work.poster) {

      /* Thumbnail photo (nahi mili to video ka frame dikhega) */

      const test = new Image();

      test.onload = function () {
        video.poster = work.poster;
        video.preload = "none";
        video.src = work.video;
      };

      test.onerror = function () {
        console.warn("Thumbnail nahi mila: " + work.poster);
        video.preload = "metadata";
        video.src = work.video + "#t=0.5";
      };

      test.src = work.poster;

    } else {

      /* Video ka frame */
      video.preload = "metadata";
      video.src = work.video + "#t=0.5";

    }

    button.prepend(video);


    /* Open project video */

    button.addEventListener("click", function () {

      openLocal(work.video, true);

    });


    /* Add project to grid */

    grid.appendChild(card);

  });

}


/* =====================================
   HERO TIMELINE
===================================== */

const timeline = document.getElementById("timeline");

const playhead = document.getElementById("playhead");

const timecode = document.getElementById("timecode");


function setHead(clientX) {

  if (!timeline || !playhead || !timecode) return;


  const rect = timeline.getBoundingClientRect();


  if (rect.width <= 0) return;


  const progress = Math.min(

    Math.max(

      (clientX - rect.left) / rect.width,

      0

    ),

    1

  );


  timeline.classList.add("live");


  playhead.style.left =
    progress * 100 + "%";


  const totalFrames =
    Math.round(progress * 120 * 24);


  const frames =
    totalFrames % 24;


  const seconds =
    Math.floor(totalFrames / 24) % 60;


  const minutes =
    Math.floor(totalFrames / 1440);


  timecode.textContent = [

    minutes,

    seconds,

    frames

  ].map(function (number) {

    return String(number).padStart(2, "0");

  }).join(":");

}


/* Mouse */

if (timeline) {

  timeline.addEventListener("mousemove", function (event) {

    setHead(event.clientX);

  });


  /* Touch */

  timeline.addEventListener("touchmove", function (event) {

    if (event.touches.length > 0) {

      setHead(event.touches[0].clientX);

    }

  }, { passive: true });

}


/* =====================================
   CONTACT FORM - WHATSAPP
===================================== */

const contactForm =
  document.getElementById("contact-form");


if (contactForm) {

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Form values */

    const formData =
      new FormData(contactForm);


    const name =
      String(formData.get("name") || "").trim();


    const email =
      String(formData.get("email") || "").trim();


    const type =
      String(formData.get("type") || "").trim();


    const subject =
      String(formData.get("subject") || "").trim();


    const message =
      String(formData.get("message") || "").trim();


    /* Validation */

    if (
      !name ||
      !email ||
      !type ||
      !subject ||
      !message
    ) {

      alert("Please fill in all fields.");

      return;

    }


    /* WhatsApp message */

    const whatsappMessage =

      `Hi Amin Sheikh!\n\n` +

      `I want to discuss a video editing project.\n\n` +

      `Name: ${name}\n` +

      `Email: ${email}\n` +

      `Project Type: ${type}\n` +

      `Subject: ${subject}\n\n` +

      `Message:\n${message}`;


    /* WhatsApp URL */

    const whatsappURL =

      "https://wa.me/" +

      CONFIG.whatsapp +

      "?text=" +

      encodeURIComponent(whatsappMessage);


    /* Open WhatsApp */

    window.open(

      whatsappURL,

      "_blank",

      "noopener,noreferrer"

    );

  });

}