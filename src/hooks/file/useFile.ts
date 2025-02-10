import { getPresignedUrlByObjectKey } from '@/services/FileService';
import { useState } from 'react';

interface UsePresignedUrlReturn {
  presignedUrl: string | null;
  isLoading: boolean;
  error: string | null;
  fetchPresignedUrl: (object_key: string) => Promise<string | null | undefined>;
}

export const usePresignedUrl = (): UsePresignedUrlReturn => {
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPresignedUrl = async (object_key: string) => {
    if (!object_key) {
      setPresignedUrl(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const url = await getPresignedUrlByObjectKey(object_key);
      setPresignedUrl(url);
      return url;
    } catch (err) {
      setError('Error al obtener la URL del archivo');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    presignedUrl,
    isLoading,
    error,
    fetchPresignedUrl,
  };
};
