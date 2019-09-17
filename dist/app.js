"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express_1 = __importStar(require("express"));
const bodyParser = __importStar(require("body-parser"));
const mongoose = __importStar(require("mongoose"));
const index_r_1 = require("./router/index.r");
class App {
    constructor() {
        this.app = express_1.default();
        this.Port = 5000;
        this.routePrv = new index_r_1.Routes();
        this.mongoUrl = 'mongodb://localhost:27017/emp';
        this.config();
        this.runApp();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(express_1.urlencoded({ extended: false }));
        this.app.use(express_1.default.static('public'));
    }
    mongoSetup() {
        mongoose.connect('mongodb://127.0.0.1:27017/emp', { useNewUrlParser: true }).then(resulr => {
            console.log('Connection successful');
        }).catch(err => console.log('Connection fail' + err));
    }
    runApp() {
        this.app.listen(this.Port, () => {
            console.log(`Server is running http://localhost:${this.Port}`);
        });
    }
}
new App();
