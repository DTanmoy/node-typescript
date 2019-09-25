import express from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import { Routes} from "./router/index.r";
import cors from "cors";
import {UserRoutes} from "./router/user.r";

class App {

    public app: express.Application;
    public Port: number = 5000;
    public routePrv: Routes = new Routes();
    public userRoute: UserRoutes = new UserRoutes();
    public mongodb = 'mongodb://localhost:27017/emp';

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongo();
        this.userRoute.userRout(this.app);
        /*connect(this.mongodb, {useNewUrlParser: true})
            .then((result) => {
                console.log('Connection successful')
            }).catch(err => console.log('Connection fail' + err));*/
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.static('public'));
        this.app.set("port", process.env.Port || 3000);
        this.app.use(cors())
    }

    public runApp(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server is running http://localhost:", this.app.get("port"));
        })
    }

    private mongo() {
        const run = async () => {
            await mongoose.connect(this.mongodb, {
                autoReconnect: true, keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true
            });
        };
        run().then(() => { console.log("Mongo connected Successful.")});
        run().catch(err => console.log(err))
    }
}
const app = new App();
app.runApp();
