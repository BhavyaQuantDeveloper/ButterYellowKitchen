(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const FRUITS = ['🍓', '🍋', '🍒', '🫐', '🍑', '🍓', '🍒', '🍓'];
  const MAX = 6;
  let active = 0;

  const canvas = document.createElement('div');
  canvas.id = 'fruitCanvas';
  canvas.className = 'fruit-canvas';
  document.body.appendChild(canvas);

  function spawnFruit() {
    if (active >= MAX) return;
    active++;

    const emoji = FRUITS[Math.floor(Math.random() * FRUITS.length)];
    const size  = 14 + Math.random() * 10;          // 14–24px
    const x     = 3 + Math.random() * 94;           // 3–97vw
    const dur   = 12 + Math.random() * 10;          // 12–22s
    const sway  = (Math.random() * 40 - 20) + 'px'; // –20 to +20px
    const delay = Math.random() * -8;               // stagger start

    const f = document.createElement('span');
    f.className = 'fruit';
    f.textContent = emoji;
    f.style.cssText = [
      `font-size:${size}px`,
      `left:${x}vw`,
      `--dur:${dur}s`,
      `--sway:${sway}`,
      `animation-delay:${delay}s`
    ].join(';');

    canvas.appendChild(f);

    const cleanup = () => { f.remove(); active--; };
    f.addEventListener('animationend', cleanup, { once: true });
    setTimeout(cleanup, (dur + 2) * 1000);
  }

  function schedule() {
    spawnFruit();
    setTimeout(schedule, 3000 + Math.random() * 3000); // every 3–6s
  }

  schedule();
})();
