import jwt, { JwtPayload } from 'jsonwebtoken';
import { settings } from './../config/settings.js';

export function sign(id: string){
    const token = jwt.sign({ id },settings.jwt.secret,{
        expiresIn: settings.jwt.expiresIn,
        algorithm: "HS256"
    });
    return token;
}

export function unsign(token: string){
    const id = jwt.verify(token, settings.jwt.secret, {
        algorithms: ['HS256']
    }) as JwtPayload;
    return id['id'];
}