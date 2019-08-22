import { encode, decode } from 'jwt-simple';

var encodeToken = function (data: object): string {
    return encode(data, "SECRET_KEY");
}

var decodeToken = function (token: string): any {
    return decode(token, "SECRET_KEY");
}

var isVaildToken = function (token: any): boolean {
    let decodedToken = decodeToken(token);
    if (decodedToken.time == undefined)
        return false;
    else if (new Date().getTime() - decodedToken.time > 1000 * 60 * 60 * 24)
        return false;
    else
        return true;
}

export { encodeToken, decodeToken, isVaildToken };