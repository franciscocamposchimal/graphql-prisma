import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

const generateToken = (userId) => {
    const privateKey = fs.readFileSync(path.join(__dirname, `../keys/private.key`));
    const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 0.35 * 60, userId },
        { key: privateKey, passphrase: 'cervus' },
        { algorithm: 'RS256' }    
    );
    return token;
};

export { generateToken as default };