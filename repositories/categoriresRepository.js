const connection = require('../db/connect.js')

/**
 * Select all category names from the application database.
 *
 * @returns {Promise<Array>} Category rows returned by MySQL.
 */
exports.getAll = async () => {    
            
    const connexion = await connection.initConnect(false);
    await connexion.changeUser({database: process.env.DATABASE})
    const [name] = await connexion.query(
        `SELECT nom_Catégorie FROM Catégories`,

    );        
    connexion.end();        
    return name;
    
}
