type GroupByKey = string | number | symbol;
type GroupByCallback<T> = (item: T) => GroupByKey;

export function groupBy<T>(array: T[], callback: GroupByCallback<T>): Record<GroupByKey, T[]> {
  return array.reduce(
    (result, item) => {
      // Obtenemos la clave usando el callback
      const key = callback(item);

      // Si la clave no existe, inicializamos un array vacío
      if (!result[key]) {
        result[key] = [];
      }

      // Agregamos el item al array correspondiente
      result[key].push(item);

      return result;
    },
    {} as Record<GroupByKey, T[]>,
  );
}
