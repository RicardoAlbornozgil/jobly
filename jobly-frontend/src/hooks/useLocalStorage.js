import { useState, useEffect } from "react";

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates `item` as state and looks in localStorage for the current value
 * (if not found, defaults to `firstValue`).
 *
 * When `item` changes, the effect re-runs:
 * - if the new state is null, it removes the item from localStorage.
 * - else, it updates localStorage with the new value.
 *
 * To the component, this acts like state that is also synced to/from
 * localStorage:
 *
 *   const [myThing, setMyThing] = useLocalStorage("myThing")
 */

function useLocalStorage(key, firstValue = null) {
  const initialValue = JSON.parse(localStorage.getItem(key)) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    console.debug("hooks useLocalStorage useEffect", "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }, [key, item]);

  return [item, setItem];
}


export default useLocalStorage;
