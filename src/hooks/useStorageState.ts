import * as React from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

type UseStateHook<T> = [[boolean, T], (value?: T) => void];

function useAsyncState<T>(initialValue: [boolean, T]): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T], action: T | any = null) => [false, action],
    // @ts-ignore
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: any) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    }
  }
}

export function useStorageState<T>(
  key: string,
  defaultValue: T
): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>([true, defaultValue]);

  // Get
  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(JSON.parse(localStorage.getItem(key) || "") || defaultValue);
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value === null ? defaultValue : JSON.parse(value));
      });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value?: T) => {
      setStorageItemAsync(key, value).then(() => {
        setState(value);
      });
    },
    [key]
  );

  return [state, setValue];
}
