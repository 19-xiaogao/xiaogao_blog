import mysql from "mysql2";

const createConnection = () =>
  mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "xiao_gao",
  });
// user: "root",
// password: "rootroot",
// database: "xiao_gao",
export default createConnection;
