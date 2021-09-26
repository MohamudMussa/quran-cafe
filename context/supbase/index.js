import { createContext, useContext } from 'react';
import Supabase from '../../lib/db/models/supbase';

const DEFAULT_VALUE = new Supabase();

const SupabaseContext = createContext(DEFAULT_VALUE);

export const SupabaseProvider = ({ children }) => {
	return (
		<SupabaseContext.Provider value={DEFAULT_VALUE}>
			{children}
		</SupabaseContext.Provider>
	);
};

export default function useSupabase() {
	return useContext(SupabaseContext);
}
