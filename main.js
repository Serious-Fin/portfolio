const video = document.getElementById("video");
const forward = document.getElementById("forward");
const back = document.getElementById("back");

let duration = 0;
let midwayPoint = 0;
let isOpening = true;

video.onloadeddata = () => {
    duration = video.duration;
    midwayPoint = duration / 2;
};

forward.addEventListener("click", () => {
    isOpening = true;
    if (video.currentTime === midwayPoint) {
        return; // can't forward video if it's already at midpoint (computer open)
    }
    video.pause();
    video.currentTime =
        video.currentTime > midwayPoint
            ? duration - video.currentTime
            : video.currentTime;
    video.play();
});

back.addEventListener("click", () => {
    isOpening = false;
    if (video.currentTime === 0 || video.currentTime === duration) {
        return; // can't reqind video if it's already at the first or last frame (computer closed)
    }
    video.pause();
    video.currentTime =
        video.currentTime < midwayPoint
            ? duration - video.currentTime
            : video.currentTime;
    video.play();
});

video.addEventListener("timeupdate", () => {
    if (isOpening && video.currentTime >= 2) {
        video.currentTime = midwayPoint; // Video plays past the 2s mark so we need to reset it back to midway
        video.pause();
    }
});
