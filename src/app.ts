
import express, {urlencoded} from "express";
import * as bodyParser from "body-parser";
import { connect } from "mongoose";
import { Routes} from "./router/index.r";

class App {

    public app: express.Application;
    public Port: number = 5000;
    public routePrv: Routes = new Routes();
    public mongodb = 'mongodb://localhost:27017/emp';

    constructor() {
        this.app = express();
        this.config();
        this.runApp();
        this.routePrv.routes(this.app);
        // this.mongoSetup();
        connect(this.mongodb, {useNewUrlParser: true})
            .then((result) => {
                console.log('Connection successful')
            }).catch(err => console.log('Connection fail' + err));
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(urlencoded({extended: false}));
        this.app.use(express.static('public'))
    }

    public runApp(): void {
        this.app.listen(this.Port, () => {
            console.log(`Server is running http://localhost:${this.Port}`);
        })
    }
    /*mongoSetup(): void {
        mongoose.connect(this.mongodb, {useNewUrlParser: true})
            .then((result) => {
                console.log('Connection successful', result)
            }).catch(err => console.log('Connection fail' + err));
    }*/
}
new App();
