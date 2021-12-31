interface Partner {
  id: number,
  name: string,
  lat: number,
  long: number,
  location: string,
  address: string,
  website: string,
  offices: number
}

interface Coordinate {
  lat: number,
  long: number
}

interface Office {
  location: string,
  address: string,
  coordinates: string,
  coordinate: Coordinate
}

interface User {
  id: number,
  urlName: string,
  organization: string,
  customerLocations: string,
  willWorkRemotely: boolean,
  website: string,
  services: string,
  offices:  Array<Office>
}
