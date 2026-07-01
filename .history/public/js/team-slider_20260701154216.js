(function () {
  const members = window.__TEAM_MEMBERS__ || [];
  const slider = document.querySelector('[data-slider]');
  const stage = document.querySelector('[data-stage]');
  const dotsWrap = document.querySelector('[data-dots]');
  const prevBtn = document.querySelector('[data-prev]');
  const nextBtn = document.querySelector('[data-next]');
  const menuBtn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  }

  if (!slider || !stage || !members.length) return;

  let activeIndex = Math.min(2, members.length - 1);
  let autoTimer = null;
  let startX = 0;

  function createMemberCard(member, index) {
    const card = document.createElement('article');
    card.className = 'slider-card';
    card.dataset.index = index;
    card.innerHTML = `
      <img src="${member.image}" alt="Ảnh ${member.name}" draggable="false" />
      <div class="slider-card-content">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
        <div class="member-socials" aria-label="Liên kết của ${member.name}">
          <a href="${member.linkedin}" aria-label="LinkedIn ${member.name}">in</a>
          <a href="${member.portfolio}" aria-label="Portfolio ${member.name}">▣</a>
        </div>
      </div>
    `;
    card.addEventListener('click', () => goTo(index));
    return card;
  }

  members.forEach((member, index) => {
    stage.appendChild(createMemberCard(member, index));
  });

  members.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Xem thành viên số ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dotsWrap.appendChild(dot);
  });

  const cards = Array.from(stage.querySelectorAll('.slider-card'));
  const dots = Array.from(dotsWrap.querySelectorAll('button'));

  function shortestOffset(index, active, total) {
    let offset = index - active;
    const half = total / 2;
    if (offset > half) offset -= total;
    if (offset < -half) offset += total;
    return offset;
  }

  function render() {
    const total = members.length;

    cards.forEach((card, index) => {
      const offset = shortestOffset(index, activeIndex, total);
      const distance = Math.abs(offset);
      const visible = distance <= 3;

      let translateX = 0;
      let scale = 1;
      let opacity = 1;
      let blur = 0;
      let translateY = 0;

      if (distance === 0) {
        translateX = 0;
        scale = 1.14;
        opacity = 1;
        blur = 0;
        translateY = 0;
      } else if (distance === 1) {
        translateX = offset * 165;
        scale = 0.96;
        opacity = 0.96;
        blur = 0;
        translateY = 8;
      } else if (distance === 2) {
        translateX = offset * 275;
        scale = 0.84;
        opacity = 0.72;
        blur = 1.2;
        translateY = 18;
      } else {
        translateX = offset * 355;
        scale = 0.7;
        opacity = 0.3;
        blur = 2.2;
        translateY = 26;
      }

      card.classList.toggle('is-active', offset === 0);
      card.style.zIndex = String(100 - distance);
      card.style.pointerEvents = visible ? 'auto' : 'none';
      card.style.opacity = visible ? opacity : 0;
      card.style.filter = `blur(${blur}px) saturate(${distance === 0 ? 1.04 : 0.88}) brightness(${distance === 0 ? 1.02 : 0.9})`;
      card.style.transform = `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) scale(${scale})`;
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
      dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
    });
  }

  function goTo(index) {
    activeIndex = (index + members.length) % members.length;
    render();
    restartAuto();
  }

  function next() {
    goTo(activeIndex + 1);
  }

  function prev() {
    goTo(activeIndex - 1);
  }

  prevBtn && prevBtn.addEventListener('click', prev);
  nextBtn && nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
  });

  slider.addEventListener('pointerdown', (event) => {
    startX = event.clientX;
  });

  slider.addEventListener('pointerup', (event) => {
    const diff = event.clientX - startX;
    if (Math.abs(diff) < 40) return;
    diff < 0 ? next() : prev();
  });

  slider.addEventListener('mouseenter', () => clearInterval(autoTimer));
  slider.addEventListener('mouseleave', restartAuto);

  function restartAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      activeIndex = (activeIndex + 1) % members.length;
      render();
    }, 4200);
  }

  render();
  restartAuto();
})();