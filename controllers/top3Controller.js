const top3Services = require('../services/top3Services')

exports.getTop3Controller = async (req, res) => {

    try {
        const top3 = await top3Services.getTop3();
        res.status(200).json(top3);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la récupération des artisans du mois',
            code: error.code,
            errorMessage: error.message
        });
    }
    
};