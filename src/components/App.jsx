import { useState, useEffect } from 'react';
import { fetchApi } from 'api/fetchApi';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import s from '../components/App.module.css';

export const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!!query) {
      getImagesFromApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const getImagesFromApi = async () => {
    setIsLoading(true);

    try {
      const { data: dataHits } = await fetchApi(query, page);
      setData([...data, ...dataHits.hits]);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchImg = search => {
    if (search !== query) {
      setData([]);
      setQuery(search);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={searchImg} />
      {!!data.length && <ImageGallery data={data} />}
      {isLoading && <Loader />}
      {!!data.length && <Button onClick={loadMore} />}
    </div>
  );
};
