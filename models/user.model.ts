import { Schema, model, Model } from 'mongoose';

import { encrypt } from '../utils/crypto';
import UserModel from '../types/user.type';

const userSchema = new Schema({
    username: String,
    password: String,
    realname: String,
    phoneNumber: String
});

class User {
    private userModelInstance: Model<UserModel> = model("user", userSchema);
    public login(username: string, password: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username), password: encrypt(password)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the user not found" });
                } else {
                    resolve({});
                }
            });
        });
    }

    public register(username: string, password: string, realname: string = "", phoneNumber: string = ""): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    new this.userModelInstance({username: encrypt(username), password: encrypt(password), realname, phoneNumber}).save((err: object): void => {
                        if (err)
                            resolve({ err });
                        else
                            resolve({});
                    })
                } else {
                    resolve({ err: "the user already exist."});
                }
            });
        });
    }

    public getUserProfile(username: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.userModelInstance.findOne({username: encrypt(username)}, (err: object, res: UserModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the user not found" });
                } else {
                    resolve({ profile: {
                        realname: res.realname,
                        phoneNumber: res.phoneNumber
                    }});
                }
            });
        });
    }
}

export default new User();