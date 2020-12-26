import createConnection from "../db";
// 执行mysql方法
export const performSql = (sql, params?) =>
    new Promise((resolve, reject) => {
        const connection = createConnection();
        connection.connect();
        connection.query(
            sql,
            params,
            (err, res) => (!err ? resolve(res) : reject(err))
        );
        connection.end();
    });
