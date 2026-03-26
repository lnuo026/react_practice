import { GameService } from './service';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    saveSession(req: any, body: {
        score: number;
        level: number;
        duration: number;
    }): Promise<import("./game-sessionSchema").GameSession>;
    getHistory(req: any): Promise<import("./game-sessionSchema").GameSession[]>;
}
