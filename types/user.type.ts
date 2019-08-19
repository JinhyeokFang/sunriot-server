import { Document } from 'mongoose';

interface UserModel extends Document {
    username: string;
    password: string;
};

export default UserModel;