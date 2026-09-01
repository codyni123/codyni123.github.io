// Scroll-triggered reveals. Everything else on the site is CSS.
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );

  els.forEach(function (el, i) {
    // stagger siblings that share a parent
    var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [];
    var idx = Array.prototype.indexOf.call(siblings, el);
    if (idx > 0) el.style.setProperty("--d", Math.min(idx * 0.08, 0.4) + "s");
    io.observe(el);
  });
})();
