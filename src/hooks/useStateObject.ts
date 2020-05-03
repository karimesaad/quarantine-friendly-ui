import React, { useState } from "react";

type StateObject<T> = {
  [P in keyof T]: T[P];
};

type StatePatcher<T> = (patch: Partial<T>) => void;

const useStateObject = <T>(defaultValue: T) => {
  const [state, setState] = useState<T>(defaultValue);

  const patchState = (patch: Partial<T>) => {
    setState((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  return [state, patchState] as [T, StatePatcher<T>];
};

export default useStateObject;
