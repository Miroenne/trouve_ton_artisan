const { createConnection } = require('mysql2/promise');


exports.initConnect = async (tf) => {
    const options = {
      host: process.env.HOST || '127.0.0.1',
      port: process.env.PORT || 4000,
      user: process.env.TIDB_USER || 'root',
      password: process.env.PASSWORD || '',
        multipleStatements: tf,
      ssl: {
          rejectUnauthorized: true
    },
}
try {
       const conn = await createConnection(options);
       return conn;
    } catch (error) {
        console.error(error);
        throw error;
    }


}