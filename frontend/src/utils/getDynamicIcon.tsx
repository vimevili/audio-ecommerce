import {
  CheckCircle,
  Loader2,
  XCircle,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';
import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

const getDynamicIcon = (
  DefaultIcon: LucideIcon,
  isLoading: boolean,
  isFetched: boolean,
  isAvailable?: boolean,
  error?: FieldError,
): LucideIcon => {
  const Component = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
    if (isLoading) {
      return (
        <Loader2
          ref={ref}
          {...props}
          className={`animate-spin text-audio-green ${props.className || ''}`}
        />
      );
    }

    if (error || (isFetched && isAvailable === false)) {
      return (
        <XCircle
          ref={ref}
          {...props}
          className={`text-red-500 ${props.className || ''}`}
        />
      );
    }

    if (isFetched && isAvailable === true) {
      return (
        <CheckCircle
          ref={ref}
          {...props}
          className={`text-green-500 ${props.className || ''}`}
        />
      );
    }

    return <DefaultIcon ref={ref} {...props} />;
  });

  return Component as LucideIcon;
};
export default getDynamicIcon;
