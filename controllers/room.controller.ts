import { ResponseSuccess, ResponseBadRequest, ResponseForbidden, ResponseNotFound, ResponseInternalServerError, ResponseUnauthorized } from '../utils/response';
import { Request, Response } from 'express';

import room from "../models/room.model";
import { encodeToken, decodeToken, isVaildToken } from '../utils/jwt';

class RoomController {
    public async checkin(req: Request, res: Response): void {
        let { roomNumber, token } = req.body;
        let username;
        if (!isVaildToken(token)) {
            ResponseUnauthorized(res, { err: "token is invaild, login please" });
            return;
        }

        username = decodeToken(token).username;

        let result = await room.addUser(roomNumber, username);

        if (result.err == "the room not found") {
            ResponseNotFound(res, { err: result.err });
        } else if (result.err == "the room is activated") {
            ResponseBadRequest(res, { err: result.err });
        } else if (result.err) {
            ResponseInternalServerError(res, { err: result.err });
        } else {
            ResponseSuccess(res, {token: encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        }
    }
    public async checkout(req: Request, res: Response): void {
        let { roomNumber, token } = req.body;
        let username;
        if (!isVaildToken(token)) {
            ResponseUnauthorized(res, { err: "token is invaild, login please" });
            return;
        }

        username = decodeToken(token).username;

        let result = await room.removeUser(roomNumber, username);


        if (result.err == "the room not found") {
            ResponseNotFound(res, { err: result.err });
        } else if (result.err == "the room is not activated") {
            ResponseBadRequest(res, { err: result.err });
        } else if (result.err == "the user is not using the room") {
            ResponseForbidden(res, { err: result.err });
        } else if (result.err) {
            ResponseInternalServerError(res, { err: result.err });
        } else {
            ResponseSuccess(res, {token: encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        }
    }
    public async getRooms(req: Request, res: Response): void {
        let result = await room.getRooms();
        if (result.err) {
            ResponseInternalServerError(res, { err: result.err });
        } else {
            ResponseSuccess(res, { rooms: result.rooms });
        }
    }
}

export default new RoomController();