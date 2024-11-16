import { getStates } from "@/services/stateService";
import { State } from "@/types/state";
import { useEffect, useState } from "react";

export const useStates = () => {
  const [state, setState] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        const data = await getStates();
        setState(data);
      } catch (err) {
        setError("Error al cargar estados");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  return { state, loading, error };
};
