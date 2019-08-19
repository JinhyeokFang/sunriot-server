import { ResponseSuccess, ResponseBadRequest, ResponseForbidden, ResponseNotFound, ResponseInternalServerError } from '../utils/response';
import { Request, Response } from 'express';

import room from "../models/room.model";

class RoomController {
    public checkin(req: Request, res: Response): void {
        let { roomNumber, username } = req.body;
        room.addUser(roomNumber, username, (result: any): void => {
            if (result.err == "the room not found") {
                ResponseNotFound(res, { err: result.err });
            } else if (result.err == "the room is activated") {
                ResponseBadRequest(res, { err: result.err });
            } else if (result.err) {
                ResponseInternalServerError(res, { err: result.err });
            } else {
                ResponseSuccess(res, {});
            }
        });
    }
    public checkout(req: Request, res: Response): void {
        let { roomNumber, username } = req.body;
        room.removeUser(roomNumber, username, (result: any): void => {
            if (result.err == "the room not found") {
                ResponseNotFound(res, { err: result.err });
            } else if (result.err == "the room is not activated") {
                ResponseBadRequest(res, { err: result.err });
            } else if (result.err == "the user is not using that room") {
                ResponseForbidden(res, { err: result.err });
            } else if (result.err) {
                ResponseInternalServerError(res, { err: result.err });
            } else {
                ResponseSuccess(res, {});
            }
        });
    }
    public getRooms(req: Request, res: Response): void {
        room.getRooms((result: any): void => {
            if (result.err) {
                ResponseInternalServerError(res, { err: result.err });
            } else {
                ResponseSuccess(res, { rooms: result.rooms });
            }
        })
    }
}

export default new RoomController();