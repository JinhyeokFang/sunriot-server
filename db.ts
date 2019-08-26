import mongoose from 'mongoose';

import config from './config';

class DB {
    public initialize(): void {
        mongoose.connect(`mongodb://${process.env.DB_HOST || "localhost"}/${process.env.DB || config.db.name}`, {
            useNewUrlParser: true
        });
    }
}

export default new DB();