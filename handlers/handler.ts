import { Handler } from 'aws-lambda';
import { Connection, createConnection } from 'mongoose';
import { getUserModel } from '../model/User';

const mongoString = 'mongodb://user:password@localhost:27017/serverless?authSource=admin';

const createErrorResponse = (statusCode: number, body: string) => ({
    statusCode,
    headers: { 'Content-Type': 'text/plain' },
    body
});

let conn: Connection;

export const getUser: Handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    if (conn == null) {
        conn = createConnection(mongoString, {
            serverSelectionTimeoutMS: 5000
        });
        await conn;
    }

    return new Promise((resolve) => {
        const query = getUserModel(conn).findOne({ _id: event.pathParameters.id });
        query.exec(function (err, user) {
            if (err) {
                console.error('uh oh', err);
                const response = {
                    statusCode: 200,
                    body: JSON.stringify(createErrorResponse(404, `Can't find user`), null, 2)
                };
                resolve(response);
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(user, null, 2)
            };
            resolve(response);
        });
    });
};
