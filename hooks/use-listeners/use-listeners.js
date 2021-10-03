import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

function useListeners() {
  const { data, error } = useSWR("/api/listeners", fetcher, {
    refreshInterval: 30000,
  });
  return { data, error };
}

export default useListeners;
