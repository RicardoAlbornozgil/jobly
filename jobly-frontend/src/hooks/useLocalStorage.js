import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates `item` as state and looks in localStorage for current value
 * (if not found, defaults to `firstValue`).
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * To the component, this just acts like state that is also synced to/from
 * localStorage.
 *
 *   const [myThing, setMyThing] = useLocalStorage("myThing")
 */

function useLocalStorage(key, firstValue = null) {
  const initialValue = (() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : firstValue;
    } catch (err) {
      console.error("Error parsing localStorage value", err);
      return firstValue;
    }
  })();

  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    console.debug("hooks useLocalStorage useEffect", "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(item));
      } catch (err) {
        console.error("Error stringifying item for localStorage", err);
      }
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
