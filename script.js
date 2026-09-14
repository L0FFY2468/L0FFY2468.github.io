const demoTap = document.querySelector('#demo-tap');
const recentList = document.querySelector('.recent');
const music = document.querySelector('#background-music');
const soundToggle = document.querySelector('#sound-toggle');

if (music && soundToggle) {
  music.volume = 0.18;
  const updateSoundControl = (isPlaying) => {
    soundToggle.classList.toggle('playing', isPlaying);
    soundToggle.setAttribute('aria-pressed', String(isPlaying));
    soundToggle.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
    soundToggle.querySelector('.sound-label').textContent = isPlaying ? 'Sound on' : 'Play sound';
  };
  const startMusic = async () => {
    try {
      await music.play();
      updateSoundControl(true);
      return true;
    } catch {
      return false;
    }
  };
  startMusic();
  const startAfterFirstInteraction = async () => {
    if (await startMusic()) {
      document.removeEventListener('pointerdown', startAfterFirstInteraction);
      document.removeEventListener('keydown', startAfterFirstInteraction);
      document.removeEventListener('touchstart', startAfterFirstInteraction);
    }
  };
  document.addEventListener('pointerdown', startAfterFirstInteraction, { passive: true });
  document.addEventListener('keydown', startAfterFirstInteraction);
  document.addEventListener('touchstart', startAfterFirstInteraction, { passive: true });
  soundToggle.addEventListener('click', async () => {
    if (music.paused) {
      if (!await startMusic()) {
        soundToggle.querySelector('.sound-label').textContent = 'Sound unavailable';
      }
    } else {
      music.pause();
      updateSoundControl(false);
    }
  });
}

demoTap?.addEventListener('click', () => {
  if (demoTap.dataset.tapped) return;
  demoTap.dataset.tapped = 'true';
  demoTap.innerHTML = 'Card received <b>✓</b>';
  recentList.insertAdjacentHTML('beforeend', '<div class="student"><span class="avatar a4">K</span><p><b>Khai R.</b><small>Student ID · 00435</small></p><time>08:04</time><i>✓</i></div>');
});

const revealGroups = [
  '.hero-copy',
  '.dashboard-wrap',
  '.numbers > div',
  '.numbers > p',
  '.section-intro',
  '.steps article',
  '.report-copy',
  '.report-card',
  '.review-stack',
  '.why > .eyebrow',
  '.why > h2',
  '.why-grid article',
  '.demo > div',
  '.demo form',
];

const revealItems = document.querySelectorAll(revealGroups.join(','));
revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  item.style.setProperty('--reveal-delay', `${(index % 4) * 95}ms`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => observer.observe(item));
