import { createContext, useContext, useEffect, useRef, useState } from "react";
import Recitations from "../../lib/db/models/recitations";

const DEFAULT_VALUE = {
  instance: [],
};

const RecitationsContext = createContext(DEFAULT_VALUE);

export const RecitationsProvider = ({ children }) => {
  const instance = useRef(new Recitations());

  const value = {
    instance: instance,
  };

  return (
    <RecitationsContext.Provider value={value}>
      {children}
    </RecitationsContext.Provider>
  );
};

export default function useRecitations() {
  return useContext(RecitationsContext);
}
