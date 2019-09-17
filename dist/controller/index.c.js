"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const index_m_1 = require("../model/index.m");
const Contact = mongoose.model('Contact', index_m_1.ContactSchema);
class ContactController {
    addNewContact(req, res, next) {
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(contact);
                next();
            }
        });
    }
    getContact(req, res, next) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(contact);
                next();
            }
        });
    }
}
exports.ContactController = ContactController;
