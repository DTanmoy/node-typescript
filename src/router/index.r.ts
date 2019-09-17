import express, { Request, Response } from 'express';
import {ContactController} from "../controller/index.c";

export class Routes {

    public contactController: ContactController = new ContactController();

    public routes (app: any): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'Get request successful...'
                })
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
        app.route('/contact/:contactId')
            .get(this.contactController.getContactById)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}
