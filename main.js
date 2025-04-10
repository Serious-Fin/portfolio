const video = document.getElementById("vid")
const forward = document.getElementById("forward")
const back = document.getElementById("back")

let duration = 0

forward.addEventListener("click", () => {
    // if cideo.currentTime >= 2 ? (2 - video.currentTime) : currentTime

    if (video.currentTime === 2) {
        return
    }
    video.pause()
    let currentTime = video.currentTime;
    let newStart = currentTime >= 2 ? (4 - currentTime) : currentTime; 
    video.currentTime = newStart
    video.play()
})

back.addEventListener("click", () => {
    //console.log(video.currentTime)
    if (video.currentTime === 0 || video.currentTime === duration) {
        return
    }
    video.pause()
    let currentTime = video.currentTime;
    let newStart = currentTime <= 2 ? (4 - currentTime) : currentTime; 
    video.currentTime = newStart
    video.play()
})

video.onloadeddata = () => {
    duration = video.duration
    const reverseStart = duration / 2
}

let hasReached2Seconds = false;

video.addEventListener("timeupdate", () => {
    // If we've already detected passing 2 seconds in this play session, don't interfere
    if (hasReached2Seconds) return;
    
    // If we're at or past 2 seconds
    if (video.currentTime >= 2) {
        video.currentTime = 2; // Set time exactly to 2 seconds
        video.pause();
        hasReached2Seconds = true;
        
        // Reset the flag when the video is played again
        video.addEventListener("play", () => {
            hasReached2Seconds = false;
        }, { once: true });
    }
});