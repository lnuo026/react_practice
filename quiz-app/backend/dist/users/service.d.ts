import { Model } from 'mongoose';
import { User, UserDocument } from './schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    upsert(userData: {
        uid: string;
        email: string;
        displayName: string;
        photoURL: string;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    findByUid(uid: string): Promise<User | null>;
}
