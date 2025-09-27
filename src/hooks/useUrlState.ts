import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseUrlStateOptions<T> {
  paramName: string;
  defaultValue: T;
  serialize: (value: T) => string;
  deserialize: (param: string | null) => T;
}

/**
 * Generic hook for managing state synchronized with URL parameters
 * URL параметртай синхрончилж төлөв удирдах ерөнхий hook
 */
export function useUrlState<T>({
  paramName,
  defaultValue,
  serialize,
  deserialize,
}: UseUrlStateOptions<T>) {
  const searchParams = useSearchParams();
  const [state, setState] = useState<T>(defaultValue);
  const isInitializedRef = useRef(false);

  // Initialize from URL params only once or when searchParams change
  useEffect(() => {
    const param = searchParams?.get(paramName);
    const initialValue = deserialize(param);
    
    // Only set state if it's different from current state to avoid unnecessary re-renders
    setState(prevState => {
      // For initial load, always set the state
      if (!isInitializedRef.current) {
        isInitializedRef.current = true;
        return initialValue;
      }
      
      // For subsequent changes, only update if different
      if (JSON.stringify(prevState) !== JSON.stringify(initialValue)) {
        return initialValue;
      }
      
      return prevState;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, paramName]);

  // Update state and URL
  const updateState = useCallback((newValue: T) => {
    setState(newValue);
    
    if (typeof window !== 'undefined') {
      const serializedValue = serialize(newValue);
      const url = new URL(window.location.href);
      url.searchParams.set(paramName, serializedValue);
      window.history.replaceState({}, '', url.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramName]);

  return {
    state,
    updateState,
  };
}

// Specialized hooks using the generic useUrlState

// Stable serialize/deserialize functions to prevent infinite re-renders
const dateSerialize = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

const dateDeserialize = (param: string | null) => {
  return param ? new Date(param) : new Date();
};

const yearSerialize = (date: Date) => date.getFullYear().toString();

const yearDeserialize = (param: string | null) => {
  const year = param ? parseInt(param, 10) : new Date().getFullYear() + 1;
  return new Date(year, 0, 1);
};

const monthSerialize = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const monthDeserialize = (param: string | null) => {
  return param ? new Date(param) : new Date();
};

/**
 * Hook for managing date state with URL synchronization
 * URL-тай синхрончилж огноо удирдах hook
 */
export function useDateWithUrl() {
  const { state, updateState } = useUrlState({
    paramName: 'date',
    defaultValue: new Date(),
    serialize: dateSerialize,
    deserialize: dateDeserialize,
  });

  return {
    selectedDate: state,
    changeDate: updateState,
  };
}

/**
 * Hook for managing year state with URL synchronization
 * URL-тай синхрончилж жил удирдах hook
 */
export function useYearWithUrl() {
  const { state, updateState } = useUrlState({
    paramName: 'year',
    defaultValue: new Date(new Date().getFullYear() + 1, 0, 1),
    serialize: yearSerialize,
    deserialize: yearDeserialize,
  });

  return {
    selectedDate: state,
    changeDate: updateState,
  };
}

/**
 * Hook for managing month state with URL synchronization  
 * URL-тай синхрончилж сар удирдах hook
 */
export function useMonthWithUrl() {
  const { state, updateState } = useUrlState({
    paramName: 'month',
    defaultValue: new Date(),
    serialize: monthSerialize,
    deserialize: monthDeserialize,
  });

  return {
    selectedDate: state,
    changeDate: updateState,
  };
}
