import { Model } from 'mongoose';
import { GameSession, GameSessionDocument } from './game-sessionSchema';
export declare class GameService {
    private gameModel;
    constructor(gameModel: Model<GameSessionDocument>);
    saveSession(data: {
        userId: string;
        score: number;
        level: number;
        duration: number;
    }): Promise<GameSession>;
    getHistory(userId: string): Promise<GameSession[]>;
}
