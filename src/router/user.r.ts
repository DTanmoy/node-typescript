import express, { Request, Response } from 'express';
import {CreateUserController} from "../controller/user.c";

export class UserRoutes {

    public userController: CreateUserController = new CreateUserController();

    public userRout (app: any): void {
        app.route('/register')
            .post(this.userController.registerUser)
    }
}
