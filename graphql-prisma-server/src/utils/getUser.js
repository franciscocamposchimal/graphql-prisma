import jwt from 'jsonwebtoken';

const getUser = (request) => {
    const header = request.request.headers.authorization;

    if(!header){
        throw new Error('Authentication required.');
    }

    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, '3bb95eeade896657c4526e74ff2a2862039d0a0fe8a9e7155b5fe492cbd78387');

    return decoded;
};

export { getUser as default };