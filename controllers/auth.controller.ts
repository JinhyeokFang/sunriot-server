import { ResponseSuccess, ResponseForbidden, ResponseNotFound, ResponseInternalServerError, ResponseUnauthorized } from '../utils/response';
import { Request, Response } from 'express';
import { decodeToken, encodeToken, isVaildToken } from '../utils/jwt';

import user from '../models/user.model'

class AuthController {
    public kakaoLogin(req: Request, res: Response): void {
        let { id, nickname } = req.body;

        ResponseSuccess(res, {token: encodeToken({
            username: id + nickname,
            time: new Date().getTime()
        })});
    }

    public getUserProfile(req: Request, res: Response): void {
        let { token } = req.body;
        let username;
        if (!isVaildToken(token)) {
            ResponseUnauthorized(res, { err: "token is invaild, login please" });
            return;
        }

        username = decodeToken(token).username;

        user.getUserProfile(username).then(result => {
            ResponseSuccess(res, {profile: result.profile, token: encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        }).catch(result => {
            if (result.err == "the user not found") {
                ResponseNotFound(res, {});
            } else {
                ResponseInternalServerError(res, {err: result.err});
            }
        });
    }
}

export default new AuthController();