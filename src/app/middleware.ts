import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "./store";


const PERSISTED_KEYS = ["recipes"];

export const localStorageMiddleware: Middleware<{}, RootState> = store => next => action => {
  const result = next(action);
  const state = store.getState();

  PERSISTED_KEYS.forEach((key) => {
    try {
      localStorage.setItem(key, JSON.stringify((state as any)[key]));
    } catch (e) {
      console.error(`Erro ao salvar ${key} no localStorage`, e);
    }
  });

  return result;
};


export const loadState = (): Partial<RootState> => {
  try {
    const state = {} as Partial<RootState>;

    PERSISTED_KEYS.forEach((key) => {
      const serialized = localStorage.getItem(key);
      if (serialized) {
        (state as any)[key] = JSON.parse(serialized);
      }
    });

    return state;
  } catch (e) {
    console.error("Erro ao carregar estado do localStorage", e);
    return {} as Partial<RootState>;
  }
};