(function () {
  const chars = "01アイウエオABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%SEGURIDADCIBERSEGURIDADHACKING";
  const fontSize = 14;

  function setup(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let cols, drops;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = new Array(cols).fill(1);
    }

    function draw() {
      ctx.fillStyle = "rgba(10,7,20,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#b388ff";
      ctx.font = fontSize + "px monospace";
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    resize();
    window.addEventListener("resize", resize);
    setInterval(draw, 45);
  }

  setup(document.getElementById("matrix-left"));
  setup(document.getElementById("matrix-right"));
})();
