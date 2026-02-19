(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const FRUITS = [
    '🍓', '🍋', '🍒', '🫐', '🍑',
    '🍇', '🍊', '🍉', '🍍', '🥝',
    '🍌', '🍈', '🫒', '🍏', '🍎',
    '🍓', '🍒', '🍋', '🫐', '🍑'   // weighted — commoner ones appear more
  ];
  const MAX = 10;
  let active = 0;

  const canvas = document.createElement('div');
  canvas.id = 'fruitCanvas';
  canvas.className = 'fruit-canvas';
  document.body.appendChild(canvas);

  function spawnFruit() {
    if (active >= MAX) return;
    active++;

    const emoji = FRUITS[Math.floor(Math.random() * FRUITS.length)];
    const size  = 13 + Math.random() * 12;          // 13–25px
    const x     = 2 + Math.random() * 96;           // 2–98vw
    const dur   = 11 + Math.random() * 12;          // 11–23s
    const sway  = (Math.random() * 50 - 25) + 'px'; // –25 to +25px
    const rot   = Math.random() * 30 - 15;          // gentle rotation
    const delay = Math.random() * -6;

    const f = document.createElement('span');
    f.className = 'fruit';
    f.textContent = emoji;
    f.style.cssText = [
      `font-size:${size}px`,
      `left:${x}vw`,
      `--dur:${dur}s`,
      `--sway:${sway}`,
      `--rot:${rot}deg`,
      `animation-delay:${delay}s`
    ].join(';');

    canvas.appendChild(f);

    const cleanup = () => { f.remove(); active--; };
    f.addEventListener('animationend', cleanup, { once: true });
    setTimeout(cleanup, (dur + 2) * 1000);
  }

  function schedule() {
    spawnFruit();
    setTimeout(schedule, 2000 + Math.random() * 2500); // every 2–4.5s
  }

  // Seed a few fruits immediately so the page isn't empty on load
  for (let i = 0; i < 4; i++) setTimeout(spawnFruit, i * 600);

  schedule();
})();
