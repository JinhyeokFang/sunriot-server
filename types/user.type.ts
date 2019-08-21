import { Document } from 'mongoose';

interface UserModel extends Document {
    username: string;
    password: string;
    realname?: string;
    phoneNumber?: string;
};

export default UserModel;