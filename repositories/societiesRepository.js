const connection = require('../db/connect.js')

exports.getSocietiesByCategory = async (category) => {    
               
    const connexion = await connection.initConnect(false);
    await connexion.changeUser({database: process.env.DATABASE})              
    const cat = await connexion.query(
        `SELECT a.nom, a.note, v.nom_Ville, s.nom_Spécialité FROM Artisans AS a 
        INNER JOIN Spécialités s ON s.id_Spécialité = a.Spécialités_id_Spécialité 
        INNER JOIN Villes v ON v.id_Ville = a.Villes_id_Ville
        INNER JOIN Catégories c ON s.Catégories_id_Catégorie = c.id_Catégorie WHERE LOWER(TRIM(c.nom_Catégorie)) LIKE LOWER(TRIM(?))`, [category],

    );        
    connexion.end();
    return cat;
    
}

exports.getSocietyByName = async (name) => {    
              
    const connexion = await connection.initConnect(false);
    await connexion.changeUser({database: process.env.DATABASE})                
    const soc = await connexion.query(
        `SELECT a.nom, a.note, a.email, a.photo_url, a.a_propos, a.site_web, v.nom_ville, s.nom_spécialité FROM Artisans AS a 
        INNER JOIN Spécialités s ON s.id_Spécialité = a.Spécialités_id_Spécialité 
        INNER JOIN Villes v ON v.id_Ville = a.Villes_id_Ville
        WHERE LOWER(TRIM(a.nom)) LIKE LOWER(TRIM(?))`, [name],

    );        
    connexion.end();        
    return soc;    

}