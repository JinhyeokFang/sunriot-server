import { Schema, model, Model } from 'mongoose';

import RoomModel from '../types/room.type';

const roomSchema = new Schema({
    roomNumber: Number,
    roomName: String,
    active: Boolean,
    username: String
});

class Room {
    private roomModelInstance: Model<RoomModel> = model("rooms", roomSchema);
    public getRooms(): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.roomModelInstance.find({}, (err: object, res: RoomModel[]): void => {
                if (err) {
                    resolve({ err });
                } else {
                    resolve({ rooms: res });
                }
            });
        });
    }
    public addUser(roomNumber: number, username: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.roomModelInstance.findOne({ roomNumber }, (err: object, res: RoomModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the room not found" });
                } else if (res.active) {
                    resolve({ err: "the room is activated" });
                } else {
                    this.roomModelInstance.update({ roomNumber }, { username, active: true }, (err: object): void => {
                        if (err) {
                            resolve({ err });
                        } else {
                            resolve({});
                        }
                    })
                }
            });
        })
    }
    public removeUser(roomNumber: number, username: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function): void => {
            this.roomModelInstance.findOne({ roomNumber }, (err: object, res: RoomModel): void => {
                if (err) {
                    resolve({ err });
                } else if (res == null) {
                    resolve({ err: "the room not found" });
                } else if (res.active == false) {
                    resolve({ err: "the room is not activated" });
                } else if (res.username != username) {
                    resolve({ err: "the user is not using that room" });
                } else {
                    this.roomModelInstance.update({ roomNumber }, { username: null, active: false }, (err: object): void => {
                        if (err) {
                            resolve({ err });
                        } else {
                            resolve({});
                        }
                    });
                }
            });

        });
    }
}

export default new Room();