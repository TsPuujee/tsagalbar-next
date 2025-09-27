import { useCallback, useEffect, useState } from 'react';

interface UseAsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncDataOptions<T> {
  defaultValue?: T | null;
  onError?: (error: Error) => void;
}

/**
 * Generic hook for handling async data loading with error states
 * Алдаа төлөвтэй асинхрон мэдээлэл ачаалах ерөнхий hook
 */
export function useAsyncData<T>(
  asyncFunction: () => Promise<T> | T,
  dependencies: React.DependencyList = [],
  options: UseAsyncDataOptions<T> = {}
) {
  const { defaultValue = null, onError } = options;
  
  const [state, setState] = useState<UseAsyncDataState<T>>({
    data: defaultValue,
    loading: false,
    error: null,
  });

  const executeAsync = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState({ data: defaultValue, loading: false, error: errorMessage });
      
      if (onError) {
        onError(error instanceof Error ? error : new Error(errorMessage));
      }
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    executeAsync();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => {
    executeAsync();
  }, [executeAsync]);

  return {
    ...state,
    refetch,
    isLoading: state.loading,
    hasError: !!state.error,
  };
}
