import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

const getUser = (request, role = []) => {
    const header = request.request.headers.authorization;

    if(!header){
        throw new Error('Authentication required.');
    }

    const token = header.replace('Bearer ', '');
    const cert = fs.readFileSync( path.join(__dirname,`../keys/public.pem`));
    const decoded = jwt.verify(token, cert, { algorithms: ['RS256']});
    console.log('ROLES PERMITED: ',role);
    console.log('DECODE: ', decoded)
    return decoded.userId;
};

export { getUser as default };