import {Schema, Model, Document, model} from 'mongoose';
import bcrypt from 'bcrypt';


/*export class UserM {
    public schema = mongoose.Schema;

    userSchema = new this.schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 255
        },
    });


}*/

export interface IUserDocument extends Document {
    createdAt: Date,
    fistName: string,
    lastName: string,
    email: string,
    password: string
}

export const userSchema: Schema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        lowercase: true,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre<IUserDocument>("save", function save(next) {
    const user = this;

   bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) {return next(err)}
       bcrypt.hash(this.password, salt, (err: Error, hash) => {
            if (err) {return next(err)}
            user.password = hash;
            next()
        });
    })
});

userSchema.methods.comparePassword = async function (comparePass: string, callback: any) {
   await bcrypt.compare(comparePass, this.password, (err: Error, isMatch: boolean) => {
        callback(err, isMatch)
    })
};

export const User: Model<IUserDocument> = model<IUserDocument>('User', userSchema);
