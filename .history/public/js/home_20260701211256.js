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