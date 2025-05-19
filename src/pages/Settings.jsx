import { useEffect, useRef } from "react";
import AccessibilitySettings from "../components/AccessibilitySettings";
import YouTubePlayer from "../components/YoutubePlayer";

export default function Settings() {
  const playerRef = useRef(null);

  useEffect(() => {
    const player = new YouTubePlayer("youtube-player", "PTgQsURc3i8", {
      width: 640,
      height: 390,
      playerVars: { autoplay: 0, controls: 1 },
      onReady: () => console.log("YouTube Player ready!"),
    });

    playerRef.current = player;

    return () => {
      player.destroy();
    };
  }, []);

  return (
    <>
      <AccessibilitySettings />

      <div style={{ marginTop: "2rem" }}>
        <h2>Live Preview</h2>
        <div id="youtube-player"></div>
      </div>
    </>
  );
}
