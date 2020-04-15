/**
 * Returns an event target value, or the value itself.
 * @param event Event
 */
const extractEventValue = (event: any) => event?.target?.value || event;

export default extractEventValue;
