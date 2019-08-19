import { Response } from 'express';

var ResponseSuccess = function (res: Response, body: object): void {
    res.json({
        status: "Success",
        body
    });
}

var ResponseBadRequest = function (res: Response, body: object): void {
    res.status(400).json({
        status: "Bad Request",
        body
    });
}

var ResponseUnauthorized = function (res: Response, body: object): void {
    res.status(401).json({
        status: "Unauthorized",
        body
    });
}

var ResponseForbidden = function (res: Response, body: object): void {
    res.status(403).json({
        status: "Forbidden",
        body
    });
}

var ResponseNotFound = function (res: Response, body: object): void {
    res.status(404).json({
        status: "Not Found",
        body
    });
}

var ResponseInternalServerError = function (res: Response, body: object): void {
    res.status(500).json({
        status: "Internal Server Error",
        body
    });
}

export { ResponseSuccess, ResponseBadRequest, ResponseUnauthorized, ResponseForbidden, ResponseNotFound, ResponseInternalServerError };