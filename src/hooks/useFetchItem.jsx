import { useEffect, useState } from 'react';
import {useAuthStore} from "../store/auth";
import {fetchItem} from "../api/api";

export const useFetchItem = (itemName) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const token = useAuthStore.getState().access;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchItem(itemName, token);
        setData(result);
      } catch (e) {
        setError('Artikel nicht gefunden');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [itemName, token]);

  return { isLoading, data, error };
};
