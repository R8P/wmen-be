import {Controller, Get, Req, Res} from 'routing-controllers';
import fs from "fs";
import {Request, Response} from 'express';


const currentPoint: Coordinate = {
  lat: 51.5144636,
  long: -0.142571
};

@Controller()
export class IndexController {
  @Get('/')
  index() {
    return 'It works!';
  }

  toRadian(distance) {
    return Number(distance) * Math.PI / 180;
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const dLat: number = this.toRadian(lat2 - lat1)
    const dLon: number = this.toRadian(lon2 - lon1);
    lat1 = this.toRadian(lat1);
    lat2 = this.toRadian(lat2);

    const a: number = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const R: number = 6371; // the radius of the world
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  @Get('/distances')
  getAll(@Req() request: Request, @Res() response: Response) {
    const distanceValue: number = Number(request.query.distance);
    const sorting: string = String(request.query.sorting || 'a')

    const usersInRange: Partner[] = [];
    const users: User[] = this.getUsers();


    users.map((user: User) => {
      user.offices.map((office: Office) => {
        let coordinate: string[] = office.coordinates.split(',');

        // override
        office.coordinate = {
          lat: +coordinate[0],
          long: +coordinate[1]
        };

        const diff = this.calculateDistance(
          currentPoint.lat,
          currentPoint.long,
          office.coordinate.lat,
          office.coordinate.long
        );

        if (diff <= distanceValue) {
          usersInRange.push({
            id: user.id,
            lat: office.coordinate.lat,
            long: office.coordinate.long,
            address: office.address,
            name: user.organization,
            location: office.location,
            offices: user.offices.length,
            website: user.website,
          });
        }
      });
    });

    const sortedUsers = usersInRange.sort((a: any, b: any) => (a['name'] > b['name'] ? 1 : -1));

    return response.send(sortedUsers);
  }

  getUsers() {
    return JSON.parse(fs.readFileSync(process.cwd() + '/src/db/partners.json', {
      encoding: 'utf8',
      flag: 'r'
    }));
  }
}
