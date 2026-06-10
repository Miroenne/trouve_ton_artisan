const {execute} = require('mysql2/promise');
const {end} = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');
const connection = require('../db/connect.js')




createDb = async () => {
    
    const filePath = path.join(__dirname, '../db/scripts/initialize_DB.sql');

    try {
        const sql = await fs.readFile(filePath, 'utf-8');
        const connexion = await connection.initConnect(true);
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

dataImport = async () => {
    const filePath = path.join(__dirname, '../db/scripts/import.sql')

    try {
        const sql = await fs.readFile(filePath, 'utf-8');
        const connexion = await connection.initConnect(true);
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
    const filePath = path.join(__dirname, '../db/scripts/top_3.sql')

    try {
        const sql = await fs.readFile(filePath, 'utf-8');        
        const connexion = await connection.initConnect(true);
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
    await createDb();
    await dataImport();    
}