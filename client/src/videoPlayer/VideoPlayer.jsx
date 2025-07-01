import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  const { id } = useParams();

  const officialSources = [
    {
      name: 'Кинопоиск',
      url: `https://www.kinopoisk.ru/film/${id}/`,
    }
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Сорян плеера нет</h3>
      <div className={styles.sourcesList}>
        {officialSources.map((source, index) => (
          <a 
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
          >
            {source.name}
          </a>
        ))}
      </div>
      <p className={styles.note}>
        Вот тут можно смотреть
      </p>
    </div>
  );
};

export default VideoPlayer;