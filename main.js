// // require("./fullpage.scrollHorizontally.min");
// // var fullpage = require("fullpage.js");
// require("fullpage.js/dist/con")
// const fullpage = require("fullpage.js/dist/fullpage.extensions.min");

// // Initializing it
// const fullPageInstance = new fullpage("#fullpage", {
//   licenseKey: "F0B4B756-26B54F37-82E7E63A-DB5F3A69",
//   //   navigation: true,
//   continuousHorizontal: true,
//   slidesNavigation: true,
//   sectionsColor: ["#ff5f45", "var(--bg-green)", "#fc6c7c", "grey"],
// });
// console.log(fullPageInstance);

const debounce = require("lodash.debounce"),
  throttle = require("lodash.throttle");

document.addEventListener("finishTyping", () => {
  document.body.classList.add("can-scroll");
});

// === DOM Elements ===
let startPage, projectPage, projectPageOverlay, projectPageContent; // Pages
let navigation, navigationTrack, navigationThumb; // Navigation
let slidesNavigation; // Slides Navigation

window.addEventListener("DOMContentLoaded", () => {
  // === Set up element variables ===
  startPage = document.getElementById("start-page");
  projectPage = document.getElementById("project-page");
  projectPageOverlay = document.getElementById("project-page-overlay");
  projectPageContent = document.getElementById("project-page-content");

  navigation = document.getElementById("navigation");
  navigationTrack = document.getElementById("navigation-track");
  navigationThumb = document.getElementById("navigation-thumb");

  slidesNavigation = document.getElementById("slides-navigation");

  // === Add button controls ===
  document.getElementById("scroll-down-icon").onclick = () => {
    smoothScrollTo(0, 2.05 * window.innerHeight, 2);
  };

  // === Add element listeners ===
  projectPageContent.addEventListener(
    "scroll",
    throttle((e) => {
      const projectPageScrollProgress =
        e.target.scrollTop / (e.target.scrollHeight - e.target.offsetHeight);
      const navigationThumbPosition =
        projectPageScrollProgress *
        (navigationTrack.offsetHeight - navigationThumb.offsetHeight);
      navigationThumb.style.transform = `translate(0, calc(${navigationThumbPosition}px))`;
    }, 16)
  );

  // Auto scroll to the closest project page section when user
  // stops scrolling on the project page content div
  // const autoScrollToProjectPageSection = debounce((e) => {
  //   projectPageContent.removeEventListener(
  //     "scroll",
  //     autoScrollToProjectPageSection
  //   );
  //   console.log("auto scrolling to next project page section");
  //   const scrollTargetY =
  //     Math.round(e.target.scrollTop / e.target.offsetHeight) *
  //     e.target.offsetHeight;
  //   const scrollDuration =
  //     (3 * Math.abs(e.target.scrollTop - scrollTargetY)) / window.innerHeight;
  //   smoothScrollTo(0, scrollTargetY, scrollDuration, projectPageContent, () => {
  //     setTimeout(() => {
  //       projectPageContent.addEventListener(
  //         "scroll",
  //         autoScrollToProjectPageSection
  //       );
  //     }, 250);
  //   });
  // }, 1000);
  // projectPageContent.addEventListener("scroll", autoScrollToProjectPageSection);

  // === Set up navigation ===
  navigationTrack.addEventListener("mousedown", (e) => {
    updateNavigationTrack(e);
    const mouseMoveFn = throttle(updateNavigationTrack, 16);
    window.addEventListener("mousemove", mouseMoveFn);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", mouseMoveFn);
    });
  });

  function updateNavigationTrack(e) {
    const navigationTrackRect = navigationTrack.getBoundingClientRect();
    const scrollProgress = Math.clamp01(
      Math.inverseLerp(
        e.clientY,
        Math.round(navigationTrackRect.top),
        Math.round(navigationTrackRect.top + navigationTrackRect.height)
      )
    );
    projectPageContent.scrollTop =
      scrollProgress *
      (projectPageContent.scrollHeight - projectPageContent.offsetHeight);
  }

  // === Set up slides ===
  // Auto scroll to the closest project slide when user
  // stops scrolling horizontally on a specific project page
  // const autoScrollToProjectSlide = debounce((e) => {
  //   console.log("scrolling project slide!");
  //   e.target.removeEventListener("scroll", autoScrollToProjectSlide);
  //   const scrollTargetX =
  //     Math.round(e.target.scrollLeft / e.target.offsetWidth) *
  //     e.target.offsetWidth;
  //   const scrollDuration =
  //     (3 * Math.abs(e.target.scrollLeft - scrollTargetX)) / window.innerWidth;
  //   smoothScrollTo(scrollTargetX, 0, scrollDuration, e.target, () => {
  //     setTimeout(() => {
  //       e.target.addEventListener("scroll", autoScrollToProjectSlide);
  //     }, 250);
  //   });
  // }, 1000);
  // const allProjectSections = projectPageContent.children;
  // for (let i = 0; i < allProjectSections.length; i++) {
  //   const project = allProjectSections[i];
  //   const projectContent = project.firstElementChild;
  //   const projectSlides = project.getElementsByClassName("slide");
  //   if (projectSlides.length <= 1) continue;
  //   const slidesNavigation = document.createElement("div");
  //   slidesNavigation.className = "slides-navigation";
  //   let navDots = [];
  //   for (let j = 0; j < projectSlides.length; j++) {
  //     const navDot = document.createElement("div");
  //     navDot.className = j == 0 ? "nav-dot active" : "nav-dot";
  //     slidesNavigation.appendChild(navDot);
  //     navDots.push(navDot);
  //     navDot.onclick = () => {
  //       projectContent.removeEventListener("scroll", autoScrollToProjectSlide);
  //       autoScrollToProjectSlide.cancel();
  //       navDots.forEach((dot) => dot.classList.remove("active"));
  //       navDot.classList.add("active");
  //       smoothScrollTo(j * project.offsetWidth, 0, 1, projectContent, () => {
  //         setTimeout(() => {
  //           projectContent.addEventListener("scroll", autoScrollToProjectSlide);
  //         }, 250);
  //       });
  //     };
  //   }
  //   project.appendChild(slidesNavigation);
  //   projectContent.addEventListener("scroll", autoScrollToProjectSlide);
  // }

  // === Update Background Color ===
  let usingTopBackground = true;
  window.addEventListener(
    "scroll",
    throttle((e) => {
      if (usingTopBackground && window.scrollY > 1.1 * window.innerHeight) {
        usingTopBackground = false;
        document.documentElement.style.background = "var(--bottom-bg-color)";
      }
      if (!usingTopBackground && window.scrollY < 0.9 * window.innerHeight) {
        usingTopBackground = true;
        document.documentElement.style.background = "var(--top-bg-color)";
      }
    }, 50)
  );

  // === Parallax Scrolling ===
  let parallaxScrollElements =
    document.getElementsByClassName("parallax-scroll");
  documentScrollElement.addEventListener(
    "scroll",
    throttle((e) => {
      for (let i = 0; i < parallaxScrollElements.length; i++) {
        const element = parallaxScrollElements[i];
        const parallaxStrength = parseInt(
          element.dataset.parallaxStrength ||
            element.dataset.parallaxPanningStrength
        );
        element.style.transform = `translate(0, ${
          documentScrollElement.scrollTop / parallaxStrength
        }px)`;
      }
    }, 16)
  );

  // === Parallax Panning ===
  let parallaxPanningElements = document.getElementsByClassName("parallax-pan");
  let mouseHolderElement = document.getElementById("mouse-holder"),
    cursorElement = document.getElementById("cursor");
  let mouseTransform = {
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      rotation: 0,
      targetRotation: 0,
    },
    cursorTransform = {
      current: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
    };
  let mouseTarget = { x: 0, y: 0 };
  let cusorTarget = { x: 0, y: 0 };
  document.addEventListener(
    "mousemove",
    throttle((e) => {
      const halfScreenWidth = window.innerWidth / 2,
        halfScreenHeight = window.innerHeight / 2;
      let mouseX = e.clientX - halfScreenWidth,
        mouseY = e.clientY - halfScreenHeight;
      for (let i = 0; i < parallaxPanningElements.length; i++) {
        const element = parallaxPanningElements[i];
        const parallaxStrength = parseFloat(
          element.dataset.parallaxStrength ||
            element.dataset.parallaxPanningStrength
        );
        const xTranslation = mouseX * parallaxStrength;
        const yTranslation = mouseY * parallaxStrength;
        element.style.transform = `translate(${xTranslation}px, ${yTranslation}px)`;
      }

      // Mouse Panning
      const screenRect = projectPageContent.getBoundingClientRect();
      if (
        e.clientX > screenRect.x &&
        e.clientX < screenRect.x + screenRect.width &&
        e.clientY > screenRect.y &&
        e.clientY < screenRect.y + screenRect.height
      ) {
        (mouseX = e.clientX - screenRect.x - screenRect.width / 2),
          (mouseY = e.clientY - screenRect.y - screenRect.height / 2);
        // mouseHolderElement.style.transform = `translate(
        //   ${mouseX * 0.2}px, ${mouseY * 0.125}px)`;
        // Moving Cursor
        // cursorElement.style.transform = `translate(
        //       ${mouseX}px, ${mouseY}px)`;
        // Set the mouse and cursor targets
        // Used to animate in mouseCursorAnimation()
        mouseTransform.target.x = mouseX * 0.2;
        mouseTransform.target.y = mouseY * 0.125;
        mouseTransform.targetRotation = mouseX * 0.025 + 5;
        cursorTransform.target.x = mouseX;
        cursorTransform.target.y = mouseY;
      }
    }, 16)
  );

  // Mouse and Cursor Animation Loop
  function mouseCursorAnimation() {
    setTimeout(mouseCursorAnimation, 16);

    // Moving mouse
    mouseTransform.current.x = Math.lerp(
      mouseTransform.current.x,
      mouseTransform.target.x,
      0.1
    );
    mouseTransform.current.y = Math.lerp(
      mouseTransform.current.y,
      mouseTransform.target.y,
      0.1
    );
    mouseTransform.rotation = Math.lerp(
      mouseTransform.rotation,
      mouseTransform.targetRotation,
      0.1
    );
    mouseHolderElement.style.transform = `translate(
      ${mouseTransform.current.x}px, ${mouseTransform.current.y}px)
      rotate(${mouseTransform.rotation}deg)`;

    // Moving Cursor
    cursorTransform.current.x = Math.lerp(
      cursorTransform.current.x,
      cursorTransform.target.x,
      0.1
    );
    cursorTransform.current.y = Math.lerp(
      cursorTransform.current.y,
      cursorTransform.target.y,
      0.1
    );
    cursorElement.style.transform = `translate(
          ${cursorTransform.current.x}px, ${cursorTransform.current.y}px)`;
  }
  mouseCursorAnimation();

  // document.addEventListener("mousemove", () => {
  //   const halfScreenWidth = window.innerWidth / 2,
  //     halfScreenHeight = window.innerHeight / 2;
  //   let mouseX = e.clientX - halfScreenWidth,
  //     mouseY = e.clientY - halfScreenHeight;
  // });

  // === Mouse panning ===
  // let mouseHolderElement = document.getElementById("mouse-holder");
  // console.log(mouseHolderElement);
  // projectPageContent.addEventListener(
  //   "mousemove",
  //   throttle((e) => {
  //     console.log(e, e.offsetX, e.offsetY);
  //     const halfDeviceWidth = projectPageContent.offsetWidth / 2,
  //       halfDeviceHeight = projectPageContent.offsetHeight / 2;
  //     const mouseX = e.offsetX - halfDeviceWidth,
  //       mouseY = e.offsetY - halfDeviceHeight;
  //     const xTranslation = mouseX * 0.25;
  //     const yTranslation = mouseY * 0.125;
  //     mouseHolderElement.style.transform = `translate(${xTranslation}px, ${yTranslation}px)`;
  //   }, 16)
  // );
  // projectPageContent.addEventListener("mouseleave", () => {
  //   // mouseHolderElement.style.transform = `translate(0, 0)`;
  //   mouseHolderElement.classList.add("disabled");
  // });
  // projectPageContent.addEventListener("mouseenter", () => {
  //   mouseHolderElement.classList.remove("disabled");
  // });

  // === Address Bar Animation ===
  let projectSections = projectPageContent.firstElementChild.children;
  let urlPage = document.getElementById("url-page");
  let highlightTimeout;
  let typeOutTimeout;
  let typeOutInterval;
  let previousSection = 0;
  projectPageContent.addEventListener(
    "scroll",
    throttle((e) => {
      let currentSection = 0;
      for (let i = 0; i < projectSections.length; i++) {
        if (e.target.scrollTop < projectSections[i].offsetTop) break;
        currentSection = i;
        // console.log(e.target.scrollTop, projectSections[i].offsetTop);
      }
      if (currentSection != previousSection) {
        clearTimeout(highlightTimeout);
        clearTimeout(typeOutTimeout);
        clearInterval(typeOutInterval);
        urlPage.classList.add("highlight");
        let currentSectionName =
          projectSections[currentSection].firstElementChild.innerHTML;
        currentSectionName = currentSectionName
          .toLowerCase()
          .split(" ")
          .join("-");
        highlightTimeout = setTimeout(() => {
          urlPage.innerText = "";
          urlPage.classList.remove("highlight");
          // Type out the new url
          let charIndex = 0;
          typeOutTimeout = setTimeout(() => {
            typeOutInterval = setInterval(() => {
              urlPage.innerText += currentSectionName[charIndex];
              charIndex++;
              console.log(charIndex);
              if (charIndex >= currentSectionName.length) {
                clearInterval(typeOutInterval);
                typeOutInterval = null;
              }
            }, 50);
          }, 250);
        }, 500);
        console.log("Current Section: ", currentSection, currentSectionName);
        previousSection = currentSection;
      }
    }, 16)
  );
});

// === Media Queries ===
