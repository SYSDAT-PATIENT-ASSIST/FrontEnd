// utils/YouTubePlayer.js
export default class YouTubePlayer {
  constructor(containerId, videoId, options = {}) {
    this.containerId = containerId;
    this.videoId = videoId;
    this.options = options;
    this.player = null;
    this._loadAPI().then(() => this._initPlayer());
  }

  _loadAPI() {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve();
      } else {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          resolve();
        };
      }
    });
  }

  _initPlayer() {
    this.player = new YT.Player(this.containerId, {
      videoId: this.videoId,
      width: this.options.width || '100%',
      height: this.options.height || '360',
      playerVars: this.options.playerVars || {
        autoplay: 0,
        controls: 1,
      },
      events: {
        onReady: this.options.onReady || (() => {}),
        onStateChange: this.options.onStateChange || (() => {}),
      }
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
