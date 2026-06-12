const {execute} = require('mysql2/promise');
const {end} = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');
const connection = require('../db/connect.js')



/**
 * Create the application database schema from the initialization script.
 *
 * @returns {Promise<void>} Resolves when the schema script has been executed.
 */
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

/**
 * Import seed data when the categories table is empty.
 *
 * @returns {Promise<void>} Resolves when seed data has been checked or imported.
 */
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

/**
 * Execute and log the SQL query used to retrieve the featured top three artisans.
 *
 * @returns {Promise<void>} Resolves when the query has been executed.
 */
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

/**
 * Initialize the database schema and seed data required by the API.
 *
 * @returns {Promise<void>} Resolves when database initialization is complete.
 */
exports.initDb = async () => {
    await createDb();
    await dataImport();    
}
