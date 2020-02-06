import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
    if (args.data.password.length < 3) {
        throw new Error('Password must be longer.');
    }
    return bcrypt.hash(password, 10);
};

export { hashPassword as default };