import { Connection, createConnection } from 'mongoose';
import { getUserModel, User } from '../../../model/User';

const mongoString = 'mongodb://user:password@localhost:27017/serverless?authSource=admin';

interface Inputs {
    uuid: string;
}

let conn: Connection;

const getDbConnection = async () => {
    if (conn == null) {
        conn = createConnection(mongoString, {
            serverSelectionTimeoutMS: 5000
        });
        await conn;
    }
    return conn;
};

export const getUser = async (_, { uuid }: Inputs): Promise<User> => {
    const connection = await getDbConnection();
    return new Promise((resolve, error) => {
        const query = getUserModel(connection).findOne({ _id: uuid });
        query.exec(function (err, user) {
            if (err) {
                error(err);
            } else {
                resolve(user);
            }
        });
    });
};
