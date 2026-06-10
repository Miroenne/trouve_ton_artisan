const fs = require('fs/promises');
const path = require('path');
const connection = require('../db/connect.js')

exports.get = async () => {
    
    const connexion = await connection.initConnect(false);
    const filePath = path.join(__dirname, '../db/scripts/top_3.sql')    
    const sql = await fs.readFile(filePath, 'utf-8');            
    await connexion.changeUser({database: process.env.DATABASE})            
    const top = await connexion.query(sql);    
    connexion.end();
    return top;        
    
}
