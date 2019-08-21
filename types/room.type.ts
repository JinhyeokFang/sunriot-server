import { Document } from 'mongoose';

interface RoomModel extends Document {
    roomNumber: number;
    roomName: string;
    active: boolean;
    username?: string;
};

export default RoomModel;