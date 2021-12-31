import express, {Application, Request, Response, NextFunction} from 'express';
import * as fs from 'fs';
import * as path from 'path';
import IPartner from "./interface/partner.interface";

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello');
});

function getAllPartners(): Array<IPartner> {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'data/partners.json'), {
        encoding: 'utf8',
        flag: 'r'
    }));
}

console.log(getAllPartners())
app.listen(5000, () => console.log('Server running'));