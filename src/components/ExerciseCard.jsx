import React, { useEffect, useRef, useState } from 'react';
import YouTubePlayer from '../components/YoutubePlayer';

export default function ExerciseCard({ video, progress, onProgressChange }) {
  const containerId = `youtube-player-${video.id}`;
  const playerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // <- loading state

  useEffect(() => {
    let isMounted = true;
    const timeout = setTimeout(() => {
      if (!isMounted) return;
      if (document.getElementById(containerId)) {
        playerRef.current = new YouTubePlayer(containerId, video.videoId, {
          width: '100%',
          height: 200,
          playerVars: { autoplay: 0, controls: 1 },
          onReady: () => {
            if (isMounted) setIsLoading(false); // <- hide spinner
            console.log(`Player ${video.id} ready`);
          },
          onStateChange: (event) => {
            if (window.YT && event.data === window.YT.PlayerState.PLAYING)
              onProgressChange(video.id, 'started');
            else if (window.YT && event.data === window.YT.PlayerState.ENDED)
              onProgressChange(video.id, 'completed');
          },
        });
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [containerId, video.videoId]);

  return (
    <article className="exercises__card">
      <div className="exercises__thumbnail">
        {isLoading && <div className="spinner" />}
        <div id={containerId} />
      </div>
      <h2 className="exercises__title">{video.title}</h2>
      <p className="exercises__info">
        {video.category} · {video.duration} sec
      </p>
      <a
        href={`https://youtu.be/${video.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="exercises__link"
      >
        Watch on YouTube
      </a>
      {progress && (
        <p className={`exercises__progress ${progress === 'completed' ? 'completed' : 'started'}`}>
          {progress === 'completed' ? '✓ Completed' : '⏳ Started'}
        </p>
      )}
    </article>
  );
}
