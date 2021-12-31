import ICoordinate from "./coordinate.interface";

interface IOffice {
    location: string,
    address: string,
    coordinates: string,
    coordinate: ICoordinate
}

export default IOffice;