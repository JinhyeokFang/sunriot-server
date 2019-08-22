import { ResponseSuccess, ResponseBadRequest, ResponseForbidden, ResponseNotFound, ResponseInternalServerError, ResponseUnauthorized } from '../utils/response';
import { Request, Response } from 'express';

import user from '../models/user.model';
import room from "../models/room.model";
import { decodeToken } from '../utils/jwt';

class RoomController {
    public checkin(req: Request, res: Response): void {
        let { roomNumber, token } = req.body;
        let username = decodeToken(token).username;

        user.getUserProfile(username).then(result => {
            room.addUser(roomNumber, username).then(result => {
                ResponseSuccess(res, {});
            }).catch(result => {
                if (result.err == "the room not found") {
                    ResponseNotFound(res, { err: result.err });
                } else if (result.err == "the room is activated") {
                    ResponseBadRequest(res, { err: result.err });
                } else {
                    ResponseInternalServerError(res, { err: result.err });
                }
            });
        }).catch(result => {
            if (result.err == "the user not found") {
                ResponseUnauthorized(res, { err: result.err });
            } else if (result.err) {
                ResponseInternalServerError(res, { err: result.err });
            }
        })
    }
    public checkout(req: Request, res: Response): void {
        let { roomNumber, token } = req.body;
        let username = decodeToken(token).username;

        user.getUserProfile(username).then(result => {
            room.removeUser(roomNumber, username).then(result => {
                ResponseSuccess(res, {});
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
        }).catch(result => {
            if (result.err == "the user not found") {
                ResponseUnauthorized(res, { err: result.err });
            } else {
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