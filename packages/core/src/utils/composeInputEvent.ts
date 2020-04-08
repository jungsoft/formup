import * as React from 'react';

/**
 * Composes an input event with multiple callbacks.
 * @param event Event.
 * @param defaultEvent First callback.
 * @param customEvent Second callback.
 */
const composeInputEvent = (
  event: any,
  defaultEvent?: (arg0: React.FormEvent<HTMLInputElement>) => void,
  customEvent?: (arg0: React.FormEvent<HTMLInputElement>) => void,
) => {
  if (defaultEvent) {
    defaultEvent(event);
  }

  if (customEvent) {
    customEvent(event);
  }
};

export default composeInputEvent;
