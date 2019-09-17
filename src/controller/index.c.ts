import express, {NextFunction, Request, Response} from 'express';
import * as mongoose from 'mongoose';
import { ContactSchema } from "../model/index.m";

const Contact = mongoose.model<mongoose.Document>('Contact', ContactSchema);

export class ContactController {

    public async addNewContact(req: Request, res: Response, next: NextFunction) {
        let newContact = new Contact(req.body);

       await newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            } else {
                res.json(contact);
                next()
            }
        });
    }

    public async getContact(req: Request, res: Response, next: NextFunction) {
        await Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    status: 200,
                    message: 'success',
                    error: false,
                    contact
                });
            }
        })
    }

    public async getContactById(req: Request, res: Response) {
        await Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err)
            } else {
                res.json(contact);
            }

        })
    }

    public async updateContact(req: Request, res: Response) {
        await Contact.findOneAndUpdate({_id: req.params.contactId}, req.body, {new: true}, (err, contact) => {
            if (err) {
                res.send(err);
            } else {
                res.json(contact);
            }
        })
    }

    public async deleteContact(req: Request, res: Response) {
       await Contact.remove({_id: req.params.contactId}, (err) => {
            if (err) {
                res.send(err)
            } else {
                res.json({message: 'Contact deleted successfully.'})
            }
        })
    }
}
