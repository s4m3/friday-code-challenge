export default (vehicles: Vehicle[]) => {
  if (!vehicles || vehicles.length === 0) {
    return {};
  }
  const carValuesSetsByKey = vehicles.reduce((res: CarValuesSetByKey, current) => {
    (Object.keys(current) as (keyof Vehicle)[]).forEach((key) => {
      if (!res[key]) {
        res[key] = new Set();
      }
      res[key].add(current[key]);
    });
    return res;

  }, {});

  return Object.keys(carValuesSetsByKey).reduce((all, curr) => {
    const sortedArray = Array.from(carValuesSetsByKey[curr]).sort((a: any, b: any) => a - b);
    return {
      ...all,
      [curr]: sortedArray
    }
  }, {});
}
