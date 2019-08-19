import { Schema, model, Model } from 'mongoose';

import RoomModel from '../types/room.type';

const roomSchema = new Schema({
    roomNumber: Number,
    active: Boolean,
    username: String
});

class Room {
    private roomModelInstance: Model<RoomModel> = model("rooms", roomSchema);
    public getRooms(callback: Function): void {
        this.roomModelInstance.find({}, (err: object, res: RoomModel[]): void => {
            if (err) {
                callback({ message: "failed", err });
            } else {
                callback({ message: "complete", rooms: res });
            }
        });
    }
    public addUser(roomNumber: number, username: string, callback: Function): void {
        this.roomModelInstance.findOne({ roomNumber }, (err: object, res: RoomModel): void => {
            if (err) {
                callback({ message: "failed", err });
            } else if (res == null) {
                callback({ message: "failed", err: "the room not found" });
            } else if (res.active) {
                callback({ message: "failed", err: "the room is activated" });
            } else {
                this.roomModelInstance.update({ roomNumber }, { username, active: true }, (err: object): void => {
                    if (err) {
                        callback({ message: "failed", err });
                    } else {
                        callback({ message: "complete" });
                    }
                })
            }
        });
    }
    public removeUser(roomNumber: number, username: string, callback: Function): void {
        this.roomModelInstance.findOne({ roomNumber }, (err: object, res: RoomModel): void => {
            if (err) {
                callback({ message: "failed", err });
            } else if (res == null) {
                callback({ message: "failed", err: "the room not found" });
            } else if (res.active == false) {
                callback({ message: "failed", err: "the room is not activated" });
            } else if (res.username != username) {
                callback({ message: "failed", err: "the user is not using that room" });
            } else {
                this.roomModelInstance.update({ roomNumber }, { username: null, active: false }, (err: object): void => {
                    if (err) {
                        callback({ message: "failed", err });
                    } else {
                        callback({ message: "success" });
                    }
                });
            }
        });
    }
}

export default new Room();