import { ResponseSuccess, ResponseBadRequest, ResponseForbidden, ResponseNotFound, ResponseInternalServerError, ResponseUnauthorized } from '../utils/response';
import { Request, Response } from 'express';

import room from "../models/room.model";
import { encodeToken, decodeToken, isVaildToken } from '../utils/jwt';

class RoomController {
    public checkin(req: Request, res: Response): void {
        let { roomNumber, token } = req.body;
        let username;
        if (!isVaildToken(token)) {
            ResponseUnauthorized(res, { err: "token is invaild, login please" });
            return;
        }

        username = decodeToken(token).username;

        room.addUser(roomNumber, username).then(result => {
            ResponseSuccess(res, {token: encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        }).catch(result => {
            if (result.err == "the room not found") {
                ResponseNotFound(res, { err: result.err });
            } else if (result.err == "the room is activated") {
                ResponseBadRequest(res, { err: result.err });
            } else {
                ResponseInternalServerError(res, { err: result.err });
            }
        });
    }
    public checkout(req: Request, res: Response): void {
        let { roomNumber, token } = req.body;
        let username;
        if (!isVaildToken(token)) {
            ResponseUnauthorized(res, { err: "token is invaild, login please" });
            return;
        }

        username = decodeToken(token).username;
        room.removeUser(roomNumber, username).then(result => {
            ResponseSuccess(res, {token: encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        }).catch(result => {
            if (result.err == "the room not found") {
                ResponseNotFound(res, { err: result.err });
            } else if (result.err == "the room is not activated") {
                ResponseBadRequest(res, { err: result.err });
            } else if (result.err == "the user is not using the room") {
                ResponseForbidden(res, { err: result.err });
            } else if (result.err) {
                ResponseInternalServerError(res, { err: result.err });
            }
        });
    }
    public getRooms(req: Request, res: Response): void {
        room.getRooms().then(result => {
            ResponseSuccess(res, { rooms: result.rooms });
        }).catch(result => {
            ResponseInternalServerError(res, { err: result.err });
        });
    }
}

export default new RoomController();