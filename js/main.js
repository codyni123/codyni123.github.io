// Motion + small interactions. Vanilla, guarded, respects reduced-motion.
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. word-by-word headline entrance */
  if (!reduced) {
    document.querySelectorAll("h1.fade-up").forEach(function (h) {
      var base = parseFloat(getComputedStyle(h).animationDelay) || 0;
      var i = 0;
      h.classList.remove("fade-up");
      (function split(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              var w = document.createElement("span");
              w.className = "w";
              w.textContent = part;
              w.style.setProperty("--d", (base + i * 0.055).toFixed(3) + "s");
              i++;
              frag.appendChild(w);
            });
            node.replaceChild(frag, n);
          } else if (n.nodeType === 1 && n.tagName !== "BR") {
            split(n);
          }
        });
      })(h);
    });
  }

  /* 2. scroll-triggered reveals (staggered among siblings) */
  var els = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (el) {
      var sibs = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
      var idx = Array.prototype.indexOf.call(sibs, el);
      if (idx > 0) el.style.setProperty("--d", Math.min(idx * 0.08, 0.4) + "s");
      io.observe(el);
    });
  }

  /* 3. header gains a firmer edge once you scroll */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 4. copy-to-clipboard buttons */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    var label = btn.innerHTML;
    btn.addEventListener("click", function () {
      var done = function () {
        btn.innerHTML = "Copied ✓";
        setTimeout(function () { btn.innerHTML = label; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(done, done);
      else done();
    });
  });
})();
