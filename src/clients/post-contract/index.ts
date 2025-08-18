import client from './client';
import useFetch from '@/hooks/useFetch';

const usePostReceivable = () => {
  const { status, data, error, call, clearData } = useFetch({
    client,
    isReinvocable: true,
  });

  return { status, data, error, call, clearData };
};

export default usePostReceivable;
