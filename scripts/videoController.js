const projectVideos = document.getElementsByClassName("project-video");

for (let i = 0; i < projectVideos.length; i++) {
    const video = projectVideos[i];
    video.addEventListener("click", () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
}
