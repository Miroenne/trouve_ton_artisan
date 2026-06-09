const {execute} = require('mysql2/promise');
const {end} = require('mysql2/promise');
const { createConnection } = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');

async function initConnect(tf) {
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



exports.createDb = async () => {
    
    const filePath = path.join(__dirname, '../db/initialize_DB.sql');

    try {
        const sql = await fs.readFile(filePath, 'utf-8');
        const connexion = await initConnect(true);
        console.log("Connected");
        await connexion.query(sql);
        console.log('Database OK')
        connexion.end();
        console.log("Disconnected");
    } catch (error) {
        console.error(error);
        throw error;
    }
  
}

exports.dataImport = async () => {
    const filePath = path.join(__dirname, '../db/import.sql')

    try {
        const sql = await fs.readFile(filePath, 'utf-8');
        const connexion = await initConnect(true);
        console.log('connected')
        await connexion.changeUser({database: process.env.DATABASE})
        const [rows] = await connexion.query("SELECT EXISTS(SELECT 1 FROM Catégories LIMIT 1) AS hasdata");
        if (!rows[0].hasdata) {
            await connexion.query(sql);
            console.log('Data import done');
        }        
        connexion.end();
        console.log('Disconnected');
    } catch(error) {
        console.error(error);
        throw error;
    }
}

exports.top_3 = async () => {
    const filePath = path.join(__dirname, '../db/top_3.sql')

    try {
        const sql = await fs.readFile(filePath, 'utf-8');        
        const connexion = await initConnect(true);
        await connexion.changeUser({database: process.env.DATABASE})
        console.log('connected')        
        const top = await connexion.query(sql);
        console.log(top);
        connexion.end();
        console.log('Disconnected');
    } catch(error) {
        console.error(error);
        throw error;
    }
}

exports.initDb = async () => {
    await this.createDb();
    await this.dataImport();
    await this.top_3();
}