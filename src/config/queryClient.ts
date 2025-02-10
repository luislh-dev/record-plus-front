import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient();

// Crear el persistor
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

// Configurar la persistencia
persistQueryClient({
  queryClient,
  persister,
  // Puedes especificar qué queries quieres persistir
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      // Solo persistir queries específicas
      const persistentQueries = ['states', 'documentType', 'gender'];
      return persistentQueries.includes(query.queryKey[0] as string);
    },
  },
});
