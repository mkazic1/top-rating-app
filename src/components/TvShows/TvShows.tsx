import React, { useEffect, useState } from 'react';
import TvShowCard from './TvShowCard';
import Search from '../SearchField/Search';
import TvShowsInterface from '../../interfaces/TvShowsInterface';
import styles from '../../style/CommonStyle.module.css';
import { API_TVSHOWS_URL, API_SEARCH_URL_TV } from '../../constants/url';

const API_KEY = process.env.REACT_APP_API;
const TV_URL = API_TVSHOWS_URL + API_KEY;

const TvShows: React.FC = () => {
  const [tvShows, setTvShows] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const SEARCH_URL = API_SEARCH_URL_TV + API_KEY + '&query=' + query;

  useEffect(() => {
    fetch(TV_URL)
      .then(async (data) => await data.json())
      .then(data => {
        setTvShows(data.results)
        setIsLoaded(true);
      })
  }, []);

  const searchTvShow = async (e: any) => {
    setIsLoaded(false);
    e.preventDefault();
    try {
      const res = await fetch(SEARCH_URL);
      const data = await res.json();
      setTvShows(data.results);
      setIsLoaded(true);
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  }

  const topTenTvShows: TvShowsInterface[] = tvShows.slice(0, 10);

  return (
    <div>
      <Search
        query={query}
        onChange={handleChange}
        onSubmit={searchTvShow}
      />
      <div className={styles['grid-container']}>
        {!isLoaded
          ? (<div>
            <h1>Loading...</h1>
          </div>)
          : (<>
            <div className={styles.grid}>
              {topTenTvShows?.map((tvShow) => <TvShowCard key={tvShow?.id} {...tvShow}/>)}
            </div>
            <div>
              {
                !tvShows?.length ? <h1>Tv shows could not be found!</h1> : null
              }
            </div>
          </>)
        }
      </div>
    </div>
  );
}

export default TvShows;
