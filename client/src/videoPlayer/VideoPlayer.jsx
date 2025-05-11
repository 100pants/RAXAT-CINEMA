import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  const { id } = useParams();
  
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://kinobox.tv/kinobox.min.js';
    script.async = true;
    script.onload = () => {
      window.kbox('.kinobox_player', {
        search: {
          kinopoisk: id
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id]);

  return (
    <div className={styles.videoContainer}>
      <div className="kinobox_player" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default VideoPlayer;