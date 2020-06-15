import * as React from 'react';

/**
 * Hook that returns whether the component has mounted or not.
 */
const useHasMounted = () => {
  const hasMountedRef = React.useRef(false);

  React.useEffect(() => {
    hasMountedRef.current = true;
  });

  return hasMountedRef.current;
};

export default useHasMounted;
