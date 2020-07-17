import * as React from 'react';

/**
 * Hook that executes a callback when the component mounts.
 */
const useDidMount = (callback: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, []);
};

export default useDidMount;
