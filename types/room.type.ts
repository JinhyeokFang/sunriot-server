import { Document } from 'mongoose';

interface RoomModel extends Document {
    roomNumber: number;
    active: boolean;
    username?: string;
};

export default RoomModel;