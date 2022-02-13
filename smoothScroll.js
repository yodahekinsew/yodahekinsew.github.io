const documentScrollElement = document.body || document.documentElement;
const finishScrollingEvent = new Event("finishScrolling");

const ongoingScrolls = new Map();

function smoothScrollTo(
  targetScrollLeft,
  targetScrollTop,
  duration,
  scrollElement,
  callback
) {
  scrollElement = scrollElement || documentScrollElement;
  console.log(
    "smooth scrolling ",
    scrollElement,
    targetScrollLeft,
    targetScrollTop
  );
  disableManualScrolling(scrollElement);

  if (ongoingScrolls.has(scrollElement))
    clearInterval(ongoingScrolls.get(scrollElement));

  const startLeft = scrollElement.scrollLeft;
  const startTop = scrollElement.scrollTop;
  const startTime = Date.now() / 1000;
  const scrollingInterval = setInterval(() => {
    const currentTime = Date.now() / 1000;
    const elapsedTime = currentTime - startTime;

    const easeValue = easeInOutQuad(Math.min(elapsedTime / duration, 1));
    scrollElement.scrollTo(
      Math.lerp(startLeft, targetScrollLeft, easeValue),
      Math.lerp(startTop, targetScrollTop, easeValue)
    );

    // When the scroll has finished (duration has passed)
    if (easeValue >= 1) {
      scrollElement.scrollTo(targetScrollLeft, targetScrollTop);
      document.dispatchEvent(finishScrollingEvent);
      enableManualScrolling(scrollElement);
      clearInterval(scrollingInterval);
      ongoingScrolls.delete(scrollElement);
      if (callback) callback();
    }
  }, 16); // 60 fps

  ongoingScrolls.set(scrollElement, scrollingInterval);
}

// === Easings ===
function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
function easeOutBack(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

// === Disable Scrolling ===

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
function preventDefaultWhenScrolling(e) {
  e.preventDefault();
}
function preventDefaultForScrollKeysWhenScrolling(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableManualScrolling(element) {
  // Using pointer events is a bit strong but useful
  // for my specific usecase
  element.style.pointerEvents = "none";

  //   element.addEventListener(
  //     "DOMMouseScroll",
  //     preventDefaultWhenScrolling,
  //     false
  //   ); // older FF
  //   element.addEventListener(wheelEvent, preventDefaultWhenScrolling, wheelOpt); // modern desktop
  //   element.addEventListener("touchmove", preventDefaultWhenScrolling, wheelOpt); // mobile
  //   element.addEventListener(
  //     "keydown",
  //     preventDefaultForScrollKeysWhenScrolling,
  //     false
  //   );
}

function enableManualScrolling(element) {
  element.style.pointerEvents = "initial";
  //   element.removeEventListener("DOMMouseScroll", preventDefaultWhenScrolling); // older FF
  //   element.removeEventListener(wheelEvent, preventDefaultWhenScrolling); // modern desktop
  //   element.removeEventListener("touchmove", preventDefaultWhenScrolling); // mobile
  //   element.removeEventListener(
  //     "keydown",
  //     preventDefaultForScrollKeysWhenScrolling
  //   );
}
