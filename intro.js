const video = document.getElementById("intro-video");
const videoWrapper = document.getElementById("video-wrapper");
const startButton = document.getElementById("start-button");

videoWrapper.addEventListener("click", () => {
  startButton.remove()
  video.muted = false;
});

video.addEventListener("ended", () => {
  window.location.href = '/test'
});

setTimeout(() => {
  startButton.remove()
}, 3000)