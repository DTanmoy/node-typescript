"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_c_1 = require("../controller/index.c");
class Routes {
    constructor() {
        this.contactController = new index_c_1.ContactController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'Get request successful...'
            });
        });
        app.route('/contact')
            /*.get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET route'
                })
            })*/
            /*.post((res: Response, req: Request) => {
                res.status(200).send({
                    message: 'POST Route'
                })
            })*/
            .post(this.contactController.addNewContact)
            .get(this.contactController.getContact);
    }
}
exports.Routes = Routes;
