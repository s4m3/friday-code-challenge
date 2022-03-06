export default (cars: Vehicle[], filterFunctionsByKey: FiltersByKey) => {
  if (!cars || !filterFunctionsByKey || cars.length === 0) {
    return [];
  }

  if (Object.keys(filterFunctionsByKey).length === 0) {
    return cars;
  }

  return cars.filter((car) => {
    return (Object.keys(car) as (keyof Vehicle)[]).every((carParam) => {
      const filterFunc: Filter = filterFunctionsByKey[carParam];
      if (filterFunc) {
        return filterFunc(car[carParam]);
      }
      return true;
    })
  })

};
