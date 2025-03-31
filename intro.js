const video = document.getElementById("intro-video");
const source = document.getElementById("intro-source");
const videoWrapper = document.getElementById("video-wrapper");
const startButton = document.getElementById("start-text-container");

if (!video || !video.canPlayType) {
  window.location.href = "/test";
}

video.onerror = () => {
  console.log("video")
  window.location.href = "/test";
};

source.onerror = () => {
  console.log("source")
  window.location.href = "/test";
};

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