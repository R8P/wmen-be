import IOffice from "./office.interface";

interface IPartner {
    id: number,
    urlName: string,
    organization: string,
    customerLocations: string,
    willWorkRemotely: boolean,
    website: string,
    services: string,
    offices: Array<IOffice>
}
export default IPartner;