(function () {
  const el = document.getElementById("typewriter");
  if (!el) return;

  const text = "Magdalena Yesenia Tristán Rivera | _";
  let i = 0;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 55);
    }
  }

  type();
})();
