// Motion + small interactions. Vanilla, guarded, respects reduced-motion.
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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

  /* 4. live local time in the footer */
  var clock = document.querySelector("[data-la-time]");
  if (clock && window.Intl) {
    var fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles" });
    var tick = function () { clock.textContent = "Los Angeles · " + fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }

  /* 5. cursor-following project previews */
  var list = document.querySelector(".work-list");
  var preview = document.querySelector(".cursor-preview");
  if (list && preview && fine && !reduced) {
    var img = preview.querySelector("img");
    var tx = 0, ty = 0, cx = 0, cy = 0, lastX = 0, vel = 0, raf = null, active = false;

    var loop = function () {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      vel += ((tx - lastX) * 0.35 - vel) * 0.18;
      lastX = tx;
      preview.style.left = cx + "px";
      preview.style.top = cy + "px";
      preview.style.setProperty("--r", Math.max(-7, Math.min(7, vel)).toFixed(2) + "deg");
      raf = (active || Math.abs(tx - cx) > 0.5) ? requestAnimationFrame(loop) : null;
    };

    list.addEventListener("pointermove", function (e) {
      var flip = e.clientX > window.innerWidth - 240;
      tx = e.clientX + (flip ? -110 : 110);
      ty = e.clientY;
      if (!raf) { cx = tx; cy = ty; lastX = tx; raf = requestAnimationFrame(loop); }
    });

    list.querySelectorAll(".work-row").forEach(function (row) {
      row.addEventListener("pointerenter", function () {
        var src = row.getAttribute("data-preview");
        if (src && img.getAttribute("src") !== src) img.src = src;
        active = true;
        preview.classList.add("show");
      });
    });

    list.addEventListener("pointerleave", function () {
      active = false;
      preview.classList.remove("show");
    });
  }

  /* 6. copy-to-clipboard buttons */
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
