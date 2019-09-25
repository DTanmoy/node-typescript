import {NextFunction, Request, Response} from "express"
import { model} from "mongoose";
import * as jwt from "jsonwebtoken";
import { User } from "../model/user.m";
import bcrypt from 'bcrypt';
import {JWT_SECRET} from "../utils/secrets";

export class CreateUserController {

    public async registerUser (req: Request, res: Response, next: NextFunction) {
        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        // @ts-ignore
        const token = jwt.sign({email: req.body.email, scope: req.body.scope}, 'asdasdasdasd');
        res.status(200).send({token: token});
    }
}
