import { Schema, model, Model } from 'mongoose';

import { encrypt } from '../utils/crypto';
import UserModel from '../types/user.type';

const userSchema = new Schema({
    username: String,
    password: String
});

class User {
    private userModelInstance: Model<UserModel> = model("user", userSchema);
    public login(username: string, password: string, callback: Function): void {
        this.userModelInstance.findOne({username: encrypt(username), password: encrypt(password)}, (err: object, res: UserModel): void => {
            if (err) {
                callback({ message: "failed", err });
            } else if (res == null) {
                callback({ message: "failed", err: "the user not found" });
            } else {
                callback({ message: "complete" });
            }
        });
    }

    public register(username: string, password: string, callback: Function): void {
        this.userModelInstance.findOne({username: encrypt(username)}, (err: object, res: UserModel): void => {
            if (err) {
                callback({ message: "failed", err });
            } else if (res == null) {
                new this.userModelInstance({username: encrypt(username), password: encrypt(password)}).save((err: object): void => {
                    if (err)
                        callback({ message: "failed", err });
                    else
                        callback({ message: "complete" });
                })
            } else {
                callback({ message: "failed", err: "the user already exist."});
            }
        });
    }
}

export default new User();