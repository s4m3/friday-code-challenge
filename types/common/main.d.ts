interface Vehicle {
  make: string,
  model: string,
  enginePowerPS: number,
  enginePowerKW: number,
  fuelType: string,
  bodyType: string,
  engineCapacity: number
}

interface CarValuesSetByKey {
  [key: string]: Set<string | number>
}

interface Filter {
  (input: any): boolean
}

interface FiltersByKey {
  [parameter: string]: Filter
}

interface FilterProps {
  title: string,
  parameter: keyof Vehicle,
  values: string[] | number[],
  addFilter: (filters: FiltersByKey) => void
}

