import { ResponseSuccess, ResponseForbidden, ResponseNotFound, ResponseInternalServerError } from '../utils/response';
import { Request, Response } from 'express';
import { encodeToken } from '../utils/jwt';

import user from '../models/user.model'

class AuthController {
    public login(req: Request, res: Response): void {
        let { username, password } = req.body;
        
        user.login(username, password, (result: any): void => {
            if (result.err == "the user not found") {
                ResponseNotFound(res, {});
            } else if (result.err) {
                ResponseInternalServerError(res, {err: result.err});
            } else {
                ResponseSuccess(res, {token: encodeToken({
                    username: username,
                    time: new Date().getTime()
                })});
            }
        });
    }
    
    public register(req: Request, res: Response): void {
        let { username, password } = req.body;  
        
        user.register(username, password, (result: any): void => {
            if (result.err == "the user already exist.") {
                ResponseForbidden(res, {});
            } else if (result.err) {
                ResponseInternalServerError(res, {err: result.err});
            } else {
                ResponseSuccess(res, {token: encodeToken({
                    username: username,
                    time: new Date().getTime()
                })});
            }
        });
    }
}

export default new AuthController();