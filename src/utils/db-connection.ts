import * as mongoose from "mongoose";


export class DbConnection {

    public mongoUrl: string = 'mongodb://localhost:27017/emp';

    private mongoSetup(): void {
        mongoose.connect('mongodb://127.0.0.1:27017/emp', {useNewUrlParser: true})
            .then(result => {
                console.log('Connection successful', result)
            }).catch(err => console.log('Connection fail' + err));
    }
}
