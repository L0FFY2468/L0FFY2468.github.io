const demoTap = document.querySelector('#demo-tap');
const recentList = document.querySelector('.recent');

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
