import { Document, Types } from 'mongoose';
export type GameSessionDocument = GameSession & Document;
export declare class GameSession {
    userId: string;
    score: number;
    level: number;
    duration: number;
    playedAt: Date;
}
export declare const GameSessionSchema: import("mongoose").Schema<GameSession, import("mongoose").Model<GameSession, any, any, any, (Document<unknown, any, GameSession, any, import("mongoose").DefaultSchemaOptions> & GameSession & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, GameSession, any, import("mongoose").DefaultSchemaOptions> & GameSession & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, GameSession>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GameSession, Document<unknown, {}, GameSession, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<GameSession & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<string, GameSession, Document<unknown, {}, GameSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<GameSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    score?: import("mongoose").SchemaDefinitionProperty<number, GameSession, Document<unknown, {}, GameSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<GameSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    level?: import("mongoose").SchemaDefinitionProperty<number, GameSession, Document<unknown, {}, GameSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<GameSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    duration?: import("mongoose").SchemaDefinitionProperty<number, GameSession, Document<unknown, {}, GameSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<GameSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    playedAt?: import("mongoose").SchemaDefinitionProperty<Date, GameSession, Document<unknown, {}, GameSession, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<GameSession & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, GameSession>;
