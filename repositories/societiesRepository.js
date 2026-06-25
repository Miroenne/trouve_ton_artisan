const { Op, fn, col, where } = require('sequelize');
const { Artisan, City, Specialty, Category, Top } = require('../models');

/**
 * Common Sequelize includes required to render artisan cards.
 */
const cardIncludes = [
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
];

/**
 * Extended Sequelize includes required to render an artisan detail page.
 */
const detailIncludes = [
    ...cardIncludes,
    {
        model: Top,
        as: 'top',
        attributes: ['top_Value'],
    },
];

/**
 * Formats a Sequelize Artisan instance for list and card displays.
 *
 * @param {import('../models/Artisan')} artisan - Sequelize Artisan instance.
 * @returns {object} Artisan data used by the frontend card component.
 */
const serializeCard = (artisan) => {
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
 * Formats a Sequelize Artisan instance with all detail fields.
 *
 * @param {import('../models/Artisan')} artisan - Sequelize Artisan instance.
 * @returns {object} Artisan data used by the frontend detail page.
 */
const serializeDetails = (artisan) => {
    const plainArtisan = artisan.get({ plain: true });

    return {
        ...serializeCard(artisan),
        email: plainArtisan.email,
        photo_url: plainArtisan.photo_url,
        A_propos: plainArtisan.a_propos,
        site_Web: plainArtisan.site_web,
        Spécialités_id_Spécialité: plainArtisan.Spécialités_id_Spécialité,
        Villes_id_Ville: plainArtisan.Villes_id_Ville,
        Top_id_Top: plainArtisan.Top_id_Top,
        top_Value: plainArtisan.top?.top_Value || null,
    };
};

/**
 * Normalizes frontend/API payload names to database column names.
 *
 * @param {object} payload - Artisan payload received from the service layer.
 * @returns {object} Payload matching the Artisan Sequelize model.
 */
const buildArtisanPayload = (payload) => ({
    nom: payload.nom,
    email: payload.email,
    site_web: payload.site_web || payload.site_Web || null,
    a_propos: payload.a_propos || payload.A_propos || null,
    photo_url: payload.photo_url || null,
    note: payload.note,
    Spécialités_id_Spécialité: payload.Spécialités_id_Spécialité,
    Villes_id_Ville: payload.Villes_id_Ville,
    Top_id_Top: payload.Top_id_Top,
});

/**
 * Select all societies.
 *
 * @returns {Promise<Array>} Society rows formatted for card display.
 */
exports.getAll = async () => {
    const artisans = await Artisan.findAll({
        include: cardIncludes,
        order: [['nom', 'ASC']],
    });

    return artisans.map(serializeCard);
};

/**
 * Select societies whose specialty belongs to a matching category.
 *
 * @param {string} category - Category name or partial category name.
 * @returns {Promise<Array>} Society rows formatted for card display.
 */
exports.getSocietiesByCategory = async (category) => {    

    const artisans = await Artisan.findAll({
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
                required: true,
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: [],
                        required: true,
                        where: {
                            nom_Catégorie: {
                                [Op.like]: `%${category.trim()}%`,
                            },
                        },
                    },
                ],
            },
        ],
        order: [['nom', 'ASC']],
    });

    return artisans.map(serializeCard);
};



/**
 * Select societies matching a provided name, without case sensitivity.
 *
 * The query applies LOWER() to the database column and to the searched value so
 * searches such as "lab", "Lab", and "LAB" return the same matching artisans.
 *
 * @param {string} name - Society name or partial society name.
 * @returns {Promise<Array>} Society rows formatted for detail display.
 */
exports.getSocietyByName = async (name) => {

    const artisans = await Artisan.findAll({
        where: where(
            fn('LOWER', col('nom')),        
        {            
            [Op.like]: `%${name.trim().toLowerCase()}%`,            
        }),
        include: detailIncludes,
        order: [['nom', 'ASC']],
    });

    return artisans.map(serializeDetails);
};

/**
 * Select one society by primary key.
 *
 * @param {number} id - Artisan identifier.
 * @returns {Promise<object|null>} Matching society or null.
 */
exports.getById = async (id) => {
    const artisan = await Artisan.findByPk(id, {
        include: detailIncludes,
    });

    return artisan ? serializeDetails(artisan) : null;
};

/**
 * Create one society.
 *
 * @param {object} payload - Artisan data.
 * @returns {Promise<object>} Created society.
 */
exports.create = async (payload) => {
    const artisan = await Artisan.create(buildArtisanPayload(payload));

    return exports.getById(artisan.id_Artisan);
};

/**
 * Update one society.
 *
 * @param {number} id - Artisan identifier.
 * @param {object} payload - Artisan data.
 * @returns {Promise<object|null>} Updated society or null.
 */
exports.update = async (id, payload) => {
    const artisan = await Artisan.findByPk(id);

    if (!artisan) {
        return null;
    }

    const nextPayload = buildArtisanPayload({
        ...artisan.get({ plain: true }),
        ...payload,
    });

    await artisan.update(nextPayload);

    return exports.getById(id);
};

/**
 * Delete one society.
 *
 * @param {number} id - Artisan identifier.
 * @returns {Promise<boolean>} True when a row was deleted.
 */
exports.remove = async (id) => {
    const deletedRows = await Artisan.destroy({
        where: { id_Artisan: id },
    });

    return deletedRows > 0;
};
