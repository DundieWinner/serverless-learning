import { Connection, Schema } from 'mongoose';

export interface User {
    fistName: string;
    lastName: string;
    email: string;
}

export const getUserModel = (conn: Connection) =>
    conn.model(
        'User',
        new Schema<User>({
            fistName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        })
    );
