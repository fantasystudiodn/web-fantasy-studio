const videoFrame = document.querySelector('.studio-video-frame');
const studioVideo = document.getElementById('studioVideo');
const videoPlayBtn = document.getElementById('videoPlayBtn');

if (videoFrame && studioVideo && videoPlayBtn) {
  videoPlayBtn.addEventListener('click', () => {
    videoFrame.classList.add('is-playing');
    studioVideo.setAttribute('controls', 'controls');
    studioVideo.play();
  });

  studioVideo.addEventListener('pause', () => {
    if (studioVideo.currentTime < studioVideo.duration) {
      videoFrame.classList.remove('is-playing');
    }
  });

  studioVideo.addEventListener('ended', () => {
    videoFrame.classList.remove('is-playing');
    studioVideo.removeAttribute('controls');
    studioVideo.currentTime = 0;
  });
}

/* =========================
   TEAM SHOWCASE SLIDER
========================= */

const teamMembers = [
  {
    name: 'Hoàng Duy Nhất',
    role: 'Founder / Product Owner / Project Manager',
    image: '/assets/team-slides/hoang-duy-nhat.jpg'
  },
  {
    name: 'Minh Hồ',
    role: '2D Game Artist',
    image: '/assets/team-slides/minh-hoa.jpg'
  },
  {
    name: 'Đặng Nguyễn Hưng',
    role: 'System Designer & Developer',
    image: '/assets/team-slides/dang-nguyen-hung.jpg'
  },
  {
    name: 'Võ Phương Nhi',
    role: 'Game Designer & Developer',
    image: '/assets/team-slides/vo-phuong-nhi.jpg'
  },
  {
    name: 'Đính Dương',
    role: 'System Designer & Developer',
    image: '/assets/team-slides/dinh-duong.jpg'
  },
  {
    name: 'Lê Thái Lâm',
    role: 'Game Designer & Developer',
    image: '/assets/team-slides/le-thai-lam.jpg'
  }
];

const teamCarousel = document.querySelector('[data-team-carousel]');
const teamStage = document.querySelector('[data-team-stage]');
const teamDotsWrap = document.querySelector('[data-team-dots]');
const teamName = document.querySelector('[data-team-name]');
const teamRole = document.querySelector('[data-team-role]');
const teamPrev = document.querySelector('[data-team-prev]');
const teamNext = document.querySelector('[data-team-next]');

if (teamCarousel && teamStage && teamDotsWrap && teamMembers.length) {
  let activeTeamIndex = 0;
  let teamAutoTimer = null;
  let teamStartX = 0;

  function createTeamCard(member, index) {
    const card = document.createElement('article');
    card.className = 'team-slide-card';
    card.dataset.index = index;

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" draggable="false">
    `;

    card.addEventListener('click', () => {
      goToTeam(index);
    });

    return card;
  }

  teamMembers.forEach((member, index) => {
    teamStage.appendChild(createTeamCard(member, index));

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Xem thành viên ${member.name}`);
    dot.addEventListener('click', () => {
      goToTeam(index);
    });

    teamDotsWrap.appendChild(dot);
  });

  const teamCards = Array.from(teamStage.querySelectorAll('.team-slide-card'));
  const teamDots = Array.from(teamDotsWrap.querySelectorAll('button'));

  function getShortestOffset(index, active, total) {
    let offset = index - active;
    const half = total / 2;

    if (offset > half) offset -= total;
    if (offset < -half) offset += total;

    return offset;
  }

  function renderTeamSlider() {
    const total = teamMembers.length;

    teamCards.forEach((card, index) => {
      const offset = getShortestOffset(index, activeTeamIndex, total);
      const distance = Math.abs(offset);
      const visible = distance <= 3;

      let translateX = 0;
      let translateY = 0;
      let scale = 1;
      let opacity = 1;
      let blur = 0;
      let brightness = 1;

      if (distance === 0) {
        translateX = 0;
        translateY = 0;
        scale = 1.08;
        opacity = 1;
        blur = 0;
        brightness = 1;
      } else if (distance === 1) {
        translateX = offset * 245;
        translateY = 34;
        scale = 0.78;
        opacity = 0.72;
        blur = 0.6;
        brightness = 0.92;
      } else if (distance === 2) {
        translateX = offset * 390;
        translateY = 64;
        scale = 0.62;
        opacity = 0.42;
        blur = 1.6;
        brightness = 0.82;
      } else {
        translateX = offset * 500;
        translateY = 84;
        scale = 0.5;
        opacity = 0.18;
        blur = 2.5;
        brightness = 0.72;
      }

      card.classList.toggle('is-active', offset === 0);
      card.style.zIndex = String(100 - distance);
      card.style.pointerEvents = visible ? 'auto' : 'none';
      card.style.opacity = visible ? opacity : 0;
      card.style.filter = `blur(${blur}px) brightness(${brightness})`;
      card.style.transform = `
        translateX(calc(-50% + ${translateX}px))
        translateY(${translateY}px)
        scale(${scale})
      `;
    });

    teamDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeTeamIndex);
    });

    teamName.textContent = teamMembers[activeTeamIndex].name;
    teamRole.textContent = teamMembers[activeTeamIndex].role;
  }

  function goToTeam(index) {
  activeTeamIndex = (index + teamMembers.length) % teamMembers.length;
  renderTeamSlider();
  startTeamAutoSlide();
}

  function nextTeam() {
    goToTeam(activeTeamIndex + 1);
  }

  function prevTeam() {
    goToTeam(activeTeamIndex - 1);
  }

  if (teamPrev) {
    teamPrev.addEventListener('click', prevTeam);
  }

  if (teamNext) {
    teamNext.addEventListener('click', nextTeam);
  }

  teamCarousel.addEventListener('pointerdown', (event) => {
    teamStartX = event.clientX;
  });

  teamCarousel.addEventListener('pointerup', (event) => {
    const diff = event.clientX - teamStartX;
    if (Math.abs(diff) < 40) return;

    diff < 0 ? nextTeam() : prevTeam();
  });

  function startTeamAutoSlide() {
  clearInterval(teamAutoTimer);

  teamAutoTimer = setInterval(() => {
    activeTeamIndex = (activeTeamIndex + 1) % teamMembers.length;
    renderTeamSlider();
  }, 3000);
}

    renderTeamSlider();
    startTeamAutoSlide();
}