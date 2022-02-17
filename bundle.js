(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    smoothScrollTo(
      0,
      documentScrollElement.scrollHeight - documentScrollElement.clientHeight,
      2
    );
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
  const mouseCursorAnimationSpeed = 1;
  function mouseCursorAnimation() {
    setTimeout(mouseCursorAnimation, 16);

    // Moving mouse
    mouseTransform.current.x = Math.lerp(
      mouseTransform.current.x,
      mouseTransform.target.x,
      mouseCursorAnimationSpeed
    );
    mouseTransform.current.y = Math.lerp(
      mouseTransform.current.y,
      mouseTransform.target.y,
      mouseCursorAnimationSpeed
    );
    mouseTransform.rotation = Math.lerp(
      mouseTransform.rotation,
      mouseTransform.targetRotation,
      mouseCursorAnimationSpeed
    );
    mouseHolderElement.style.transform = `translate(
      ${mouseTransform.current.x}px, ${mouseTransform.current.y}px)
      rotate(${mouseTransform.rotation}deg)`;

    // Moving Cursor
    cursorTransform.current.x = Math.lerp(
      cursorTransform.current.x,
      cursorTransform.target.x,
      mouseCursorAnimationSpeed
    );
    cursorTransform.current.y = Math.lerp(
      cursorTransform.current.y,
      cursorTransform.target.y,
      mouseCursorAnimationSpeed
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
              if (charIndex >= currentSectionName.length) {
                clearInterval(typeOutInterval);
                typeOutInterval = null;
              }
            }, 50);
          }, 250);
        }, 500);
        previousSection = currentSection;
      }
    }, 16)
  );
});

// === Media Queries ===

},{"lodash.debounce":2,"lodash.throttle":3}],2:[function(require,module,exports){
(function (global){(function (){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){(function (){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
let typewriterLines = document.getElementsByClassName("typewriter");
let lines = [];
for (let i = 0; i < typewriterLines.length; i++) {
  lines.push(typewriterLines[i].firstElementChild.innerText);
  typewriterLines[i].firstElementChild.innerText = "";
}
let currentLineIndex = 0;
let currentCharIndex = 0;
let typing = false;

const finishTypingEvent = new Event("finishTyping");
startTyping();

function startTyping() {
  typing = true;
  currentLineIndex = 0;
  currentCharIndex = 0;
  typewriterLines[0].classList.add("typing");
  typeOutNextCharacter();
}

function typeOutNextCharacter() {
  // Add character to current line
  typewriterLines[currentLineIndex].firstElementChild.innerHTML +=
    lines[currentLineIndex][currentCharIndex];
  currentCharIndex++;

  // If we reach the end of the current line, move on to the next one
  if (currentCharIndex >= lines[currentLineIndex].length) {
    currentCharIndex = 0;
    currentLineIndex++;

    // If we finished typing all the texts, break the loop
    if (currentLineIndex >= lines.length) {
      typing = false;
      currentLineIndex = 0;
      document.dispatchEvent(finishTypingEvent);
      return;
    }

    setTimeout(() => {
      // Move the caret to the next line
      typewriterLines[currentLineIndex - 1].classList.remove("typing");
      typewriterLines[currentLineIndex].classList.add("typing");

      // Display the return symbol
      typewriterLines[currentLineIndex].children[1].style.display = "block";

      setTimeout(typeOutNextCharacter, 500 + Math.random() * 250);
    }, 100 + Math.random() * 50);
    return;
  }

  // Make another call to typeOutNextCharacter to create a loop
  setTimeout(typeOutNextCharacter, 15 + Math.random() * 85);
}

},{}]},{},[1,4]);
