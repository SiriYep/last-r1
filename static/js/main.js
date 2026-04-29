// ---------- Hero intro: FLIP-style morph on first scroll ----------
//
// On scroll the veil's image and title morph (translate + scale) into the
// positions of the in-flow teaser image and paper title, then the veil fades
// out. Because the veil's elements end up exactly where the in-flow ones live,
// the cross-fade at the very end is visually invisible — feels continuous.
(function introMorph() {
  var html = document.documentElement;
  if (!html.classList.contains('intro-active')) return;

  var MORPH_MS = 950;
  var FADE_MS  = 350;

  var triggered = false;

  function exit() {
    if (triggered) return;
    triggered = true;
    morph();
  }

  function morph() {
    var veilImg   = document.querySelector('#intro-veil .intro-img');
    var veilTitle = document.querySelector('#intro-veil .intro-title');
    var flowImg   = document.querySelector('.teaser-top figure img');
    var flowTitle = document.querySelector('.paper-title');

    // Fallback: if any element is missing, just fade the veil out.
    if (!veilImg || !veilTitle || !flowImg || !flowTitle) {
      html.classList.remove('intro-active');
      html.classList.add('intro-done');
      setTimeout(cleanup, FADE_MS);
      return;
    }

    // In-flow targets — they have visibility:hidden but layout exists, so
    // getBoundingClientRect returns valid coordinates.
    var fImg = flowImg.getBoundingClientRect();
    var fTit = flowTitle.getBoundingClientRect();
    var vImg = veilImg.getBoundingClientRect();
    var vTit = veilTitle.getBoundingClientRect();

    // Image: scale by width ratio, translate centers to overlap.
    var imgScale = fImg.width / vImg.width;
    var imgDx = (fImg.left + fImg.width / 2)  - (vImg.left + vImg.width / 2);
    var imgDy = (fImg.top  + fImg.height / 2) - (vImg.top  + vImg.height / 2);

    // Title: scale by font-size ratio (more reliable than width when wrapping
    // differs between the small-veil and large-in-flow versions of the title).
    var titScale = parseFloat(getComputedStyle(flowTitle).fontSize) /
                   parseFloat(getComputedStyle(veilTitle).fontSize);
    if (!isFinite(titScale) || titScale <= 0) titScale = 1;
    titScale = Math.min(Math.max(titScale, 0.5), 3);
    var titDx = (fTit.left + fTit.width / 2)  - (vTit.left + vTit.width / 2);
    var titDy = (fTit.top  + fTit.height / 2) - (vTit.top  + vTit.height / 2);

    // Kill the entrance keyframe animations so they can't fight the transitions.
    veilImg.style.animation   = 'none';
    veilTitle.style.animation = 'none';

    // Switch state: CSS now enables `transition: transform ...` on these
    // elements, and starts the bar/hint fade-out.
    html.classList.remove('intro-active');
    html.classList.add('intro-fading');

    // Force a reflow so the new transition rule is observed before we change
    // the transform value (otherwise the browser may collapse the change into
    // an instant jump).
    /* eslint-disable-next-line no-unused-expressions */
    veilImg.offsetHeight;

    // Apply target transforms — the CSS transition drives the smooth morph.
    veilImg.style.transform   = 'translate(' + imgDx + 'px, ' + imgDy + 'px) scale(' + imgScale + ')';
    veilTitle.style.transform = 'translate(' + titDx + 'px, ' + titDy + 'px) scale(' + titScale + ')';

    // Once the morph is complete, swap to `intro-done`: the veil fades out and
    // the in-flow content (already at the same positions) becomes visible.
    setTimeout(function () {
      html.classList.remove('intro-fading');
      html.classList.add('intro-done');
    }, MORPH_MS);

    setTimeout(cleanup, MORPH_MS + FADE_MS);
  }

  function cleanup() {
    var veil = document.getElementById('intro-veil');
    if (veil) veil.remove();
    html.classList.remove('intro-done');
  }

  // Trigger handlers — first scroll/touch/keypress dismisses the intro.
  var opts = { passive: true, once: true };
  window.addEventListener('wheel',     exit, opts);
  window.addEventListener('touchmove', exit, opts);
  var veilEl = document.getElementById('intro-veil');
  if (veilEl) veilEl.addEventListener('click', exit, opts);

  function onKey(e) {
    var keys = ['ArrowDown', 'PageDown', 'End', ' ', 'Spacebar', 'Enter'];
    if (keys.indexOf(e.key) !== -1) {
      window.removeEventListener('keydown', onKey);
      exit();
    }
  }
  window.addEventListener('keydown', onKey);
})();

// Copy BibTeX to clipboard.
const copyBtn = document.getElementById('copy-bibtex');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const code = document.querySelector('#bibtex pre code');
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      const label = copyBtn.querySelector('span');
      const original = label.textContent;
      label.textContent = 'Copied!';
      setTimeout(() => (label.textContent = original), 1500);
    } catch (_) {
      // Fallback: select the text so the user can copy manually.
      const range = document.createRange();
      range.selectNodeContents(code);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
}
