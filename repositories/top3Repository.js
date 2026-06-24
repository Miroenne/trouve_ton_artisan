const { Artisan, City, Specialty, Top } = require('../models');

const serializeTopArtisan = (artisan) => {
    const plainArtisan = artisan.get({ plain: true });

    return {
        id_Artisan: plainArtisan.id_Artisan,
        nom: plainArtisan.nom,
        note: Number(plainArtisan.note),
        nom_Ville: plainArtisan.city?.nom_Ville || null,
        nom_Spécialité: plainArtisan.specialty?.nom_Spécialité || null,
    };
};

/**
 * Select the featured top three artisans.
 *
 * @returns {Promise<Array>} Featured artisans returned by Sequelize.
 */
exports.get = async () => {
    const top = await Artisan.findAll({
        include: [
            {
                model: City,
                as: 'city',
                attributes: ['nom_Ville'],
            },
            {
                model: Specialty,
                as: 'specialty',
                attributes: ['nom_Spécialité'],
            },
            {
                model: Top,
                as: 'top',
                attributes: [],
                required: true,
                where: { top_Value: 'VRAI' },
            },
        ],
        order: [['note', 'DESC']],
    });

    return top.map(serializeTopArtisan);
};
