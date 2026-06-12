const connection = require('../db/connect.js')

/**
 * Select societies whose specialty belongs to a matching category.
 *
 * @param {string} category - Category name or partial category name.
 * @returns {Promise<Array>} Society rows returned by MySQL.
 */
exports.getSocietiesByCategory = async (category) => {    
    
    console.log("Entrée dans le repository")

    const connexion = await connection.initConnect(false);
    await connexion.changeUser({database: process.env.DATABASE})              
    const [cat] = await connexion.query(
        `SELECT a.nom, a.note, v.nom_Ville, s.nom_Spécialité FROM Artisans AS a 
        INNER JOIN Spécialités s ON s.id_Spécialité = a.Spécialités_id_Spécialité 
        INNER JOIN Villes v ON v.id_Ville = a.Villes_id_Ville
        INNER JOIN Catégories c ON s.Catégories_id_Catégorie = c.id_Catégorie
        WHERE LOWER(TRIM(c.nom_Catégorie)) LIKE LOWER(TRIM(?))`, ['%' + category + '%'],

    );        
    connexion.end();
    return cat;
    
}



/**
 * Select societies matching a provided name.
 *
 * @param {string} name - Normalized society name or partial society name.
 * @returns {Promise<Array>} Society rows returned by MySQL.
 */
exports.getSocietyByName = async (name) => {
              
    console.log(name);

    const connexion = await connection.initConnect(false);
    await connexion.changeUser({ database: process.env.DATABASE })
    const [soc] = await connexion.query(
        `SELECT a.nom, a.note, a.email, a.photo_url, a.a_propos, a.site_web, v.nom_ville, s.nom_spécialité FROM Artisans AS a 
        INNER JOIN Spécialités s ON s.id_Spécialité = a.Spécialités_id_Spécialité 
        INNER JOIN Villes v ON v.id_Ville = a.Villes_id_Ville
        WHERE LOWER(TRIM(a.nom)) LIKE LOWER(TRIM(?))`, ['%' + name + '%'],

    );
    console.log(soc)
    connexion.end();
    return soc;

};
