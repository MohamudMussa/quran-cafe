import { createContext, useContext, useEffect, useRef, useState } from "react";
import Recitations from "../../lib/db/models/recitations";

const DEFAULT_VALUE = {
  recitations: [],
};

const RecitationsContext = createContext(DEFAULT_VALUE);

export const RecitationsProvider = ({ children }) => {
  const instance = useRef(new Recitations());
  const [data, setData] = useState(DEFAULT_VALUE.data);

  const fetchAll = async () => {
    const res = await instance.current.getAll();
    setData(res);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const value = {
    recitations: data,
  };

  return (
    <RecitationsContext.Provider value={value}>
      {children}
    </RecitationsContext.Provider>
  );
};

export default function useRecitation() {
  return useContext(RecitationsContext);
}
