import { ResponseSuccess, ResponseForbidden, ResponseNotFound, ResponseInternalServerError } from '../utils/response';
import { Request, Response } from 'express';
import { decodeToken, encodeToken } from '../utils/jwt';

import user from '../models/user.model'

class AuthController {
    public login(req: Request, res: Response): void {
        let { username, password } = req.body;

        user.login(username, password).then(result => {
            ResponseSuccess(res, {token: encodeToken({
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
    
    public register(req: Request, res: Response): void {
        let { username, password, realname, phoneNumber } = req.body;  
        
        user.register(username, password, realname, phoneNumber).then(result => {
            ResponseSuccess(res, {token: encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        }).catch(result => {
            if (result.err == "the user already exist.") {
                ResponseForbidden(res, {err: result.err});
            } else {
                ResponseInternalServerError(res, {err: result.err});
            }
        });
    }

    public getUserProfile(req: Request, res: Response): void {
        let { token } = req.body;
        let username = decodeToken(token).username;

        user.getUserProfile(username).then(result => {
            ResponseSuccess(res, {profile: result.profile});
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