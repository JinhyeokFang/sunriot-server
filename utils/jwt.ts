import { encode, decode } from 'jwt-simple';

var encodeToken = function (data: object): string {
    return encode(data, "SECRET_KEY");
}

var decodeToken = function (token: string): object {
    return decode(token, "SECRET_KEY");
}

export { encodeToken, decodeToken };