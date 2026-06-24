var express = require("express");
var router = express.Router();
const top3Controller = require('../controllers/top3Controller');

/**
 * @swagger
 * tags:
 *   - name: Top 3
 *     description: Artisans mis en avant sur la page d'accueil.
 *
 * components:
 *   schemas:
 *     FeaturedArtisan:
 *       type: object
 *       properties:
 *         id_Artisan:
 *           type: integer
 *           example: 1
 *         nom:
 *           type: string
 *           example: "Boucherie Dumont"
 *         note:
 *           type: number
 *           format: float
 *           example: 4.5
 *         nom_Ville:
 *           type: string
 *           example: "Lyon"
 *         nom_Spécialité:
 *           type: string
 *           example: "Boucher"
 *
 * /top3:
 *   get:
 *     summary: Retourne les trois artisans du mois.
 *     description: Récupère les artisans mis en avant sur la page d'accueil.
 *     tags:
 *       - Top 3
 *     responses:
 *       200:
 *         description: Liste des artisans du mois récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FeaturedArtisan'
 *       400:
 *         description: Impossible de récupérer les artisans du mois.
 */
router.get('/', top3Controller.getTop3Controller);

module.exports = router;
