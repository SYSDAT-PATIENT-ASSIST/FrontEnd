// utils/YouTubePlayer.js
// utils/YouTubePlayer.js

let loadPromise = null;

function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  if (!loadPromise) {
    loadPromise = new Promise((resolve) => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Behold eksisterende callback hvis nødvendigt
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === "function") previousCallback();
        resolve();
      };
    });
  }

  return loadPromise;
}

export default class YouTubePlayer {
  constructor(containerId, videoId, options = {}) {
    this.containerId = containerId;
    this.videoId = videoId;
    this.options = options;
    this.player = null;
    this._loadAPI().then(() => this._initPlayer());
  }

  _loadAPI() {
    return loadYouTubeAPI();
  }

  _initPlayer() {
    this.player = new YT.Player(this.containerId, {
      videoId: this.videoId,

      // use || to fall back to your default
      width: this.options.width || "100%",
      height: this.options.height || "200",

      // also fall back if they didn’t pass playerVars
      playerVars: this.options.playerVars || {
        autoplay: 0,
        controls: 1,
      },

      events: {
        // again, use || so onReady defaults to a noop
        onReady: this.options.onReady || (() => {}),
        onStateChange: this.options.onStateChange || (() => {}),
      },
    });
  }

  play() {
    if (this.player) this.player.playVideo();
  }

  pause() {
    if (this.player) this.player.pauseVideo();
  }

  destroy() {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
  }
}
