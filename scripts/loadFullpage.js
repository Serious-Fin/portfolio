new fullpage("#fullpage", {
  autoScrolling: true,
  scrollHorizontally: true,
  onLeave: function (origin, destination, direction) {
    if (origin.index === 0 && direction === "down" && !hasAnimationPlayed) {
      playOpenAnimation();
      return false;
    }
    if (origin.index === 1 && direction === "up" && hasAnimationPlayed) {
      playCloseAnimation();
      return false;
    }
  },
});

const video = document.getElementById("intro-video");
const forward = document.getElementById("forward");
const back = document.getElementById("back");
const text = document.getElementsByClassName("intro-text");
const scrollTips = document.getElementsByClassName("intro-tip");

let duration = 0;
let midwayPoint = 0;
let isOpening = true;
let hasAnimationPlayed = false;

video.onloadeddata = () => {
  duration = video.duration;
  midwayPoint = duration / 2;
};

function playOpenAnimation() {
  isOpening = true;
  hideScrollTip();
  if (video.currentTime === midwayPoint) {
    return;
  }
  video.currentTime = video.currentTime > midwayPoint ? duration - video.currentTime : video.currentTime;
  video.play();
}

function playCloseAnimation() {
  isOpening = false;
  hasAnimationPlayed = false;
  if (video.currentTime === 0 || video.currentTime === duration) {
    return;
  }
  video.currentTime = video.currentTime < midwayPoint ? duration - video.currentTime : video.currentTime;
  video.play();
}

video.addEventListener("timeupdate", () => {
  if (isOpening && video.currentTime > midwayPoint) {
    hasAnimationPlayed = true;
    video.currentTime = midwayPoint;
    video.pause();
    showAboutText();
    fullpage_api.moveSectionDown();
  }

  if (!isOpening || video.currentTime !== midwayPoint) {
    hideAboutText();
  }

  if (video.currentTime === 0 || video.currentTime === duration) {
    showScrollTip();
  }
});

function showAboutText() {
  for (let i = 0; i < text.length; i++) {
    text[i].classList.remove("invisible");
  }
}

function hideAboutText() {
  for (let i = text.length - 1; i >= 0; i--) {
    text[i].classList.add("invisible");
  }
}

function showScrollTip() {
  for (let i = 0; i < scrollTips.length; i++) {
    scrollTips[i].classList.remove("invisible");
  }
}

function hideScrollTip() {
  for (let i = scrollTips.length - 1; i >= 0; i--) {
    scrollTips[i].classList.add("invisible");
  }
}
