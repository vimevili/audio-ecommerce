import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import type {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import { useDebounce } from './';

interface UseAvailabilityCheckProps<T extends FieldValues> {
  value: string;
  name: Path<T>;
  checkFn: (value: string) => Promise<boolean>;
  queryKey: string;
  enabled?: boolean;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  errorMessage: string;
}

export default function useAvailabilityCheck<T extends FieldValues>({
  value,
  name,
  checkFn,
  queryKey,
  enabled = true,
  setError,
  clearErrors,
  errorMessage,
}: UseAvailabilityCheckProps<T>) {
  const debouncedValue = useDebounce(value, 500);

  const {
    data: isAvailable,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: [queryKey, debouncedValue],
    queryFn: () => checkFn(debouncedValue),
    enabled: enabled && !!debouncedValue,
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (!isFetched) return;

    if (isAvailable === false) {
      setError(name, {
        type: 'manual',
        message: errorMessage,
      });
    } else if (isAvailable === true) {
      clearErrors(name);
    }
  }, [isAvailable, isFetched, setError, clearErrors, name, errorMessage]);

  return {
    isAvailable,
    isLoading,
    isFetched,
  };
}
