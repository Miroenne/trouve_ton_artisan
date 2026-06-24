var express = require("express");
var router = express.Router();
const societiesController = require('../controllers/societiesController');

/**
 * @swagger
 * tags:
 *   - name: Societies
 *     description: Recherche et affichage des artisans.
 *
 * components:
 *   schemas:
 *     SocietyCard:
 *       type: object
 *       properties:
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
 *     SocietyDetails:
 *       allOf:
 *         - $ref: '#/components/schemas/SocietyCard'
 *         - type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: "contact@example.com"
 *             photo_url:
 *               type: string
 *               format: uri
 *               example: "https://example.com/photo.jpg"
 *             A_propos:
 *               type: string
 *               example: "Artisan local spécialisé depuis 10 ans."
 *             site_Web:
 *               type: string
 *               format: uri
 *               example: "https://example.com"
 *
 * /societies/categorized/{category}:
 *   get:
 *     summary: Recherche les artisans d'une catégorie.
 *     description: Récupère les artisans dont la spécialité appartient à la catégorie demandée.
 *     tags:
 *       - Societies
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom ou fragment de nom de la catégorie.
 *     responses:
 *       200:
 *         description: Artisans de la catégorie récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocietyCard'
 *       400:
 *         description: Impossible de récupérer les artisans de la catégorie.
 */
router.get('/categorized/:category', societiesController.getSocietiesByCategory);

/**
 * @swagger
 * /societies/{nom}:
 *   get:
 *     summary: Recherche un artisan par nom.
 *     description: Recherche les artisans dont le nom correspond partiellement au paramètre fourni.
 *     tags:
 *       - Societies
 *     parameters:
 *       - in: path
 *         name: nom
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom ou fragment de nom de l'artisan recherché.
 *     responses:
 *       200:
 *         description: Artisans correspondants récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocietyDetails'
 *       400:
 *         description: Impossible de récupérer les artisans correspondants.
 */
router.get('/:nom', societiesController.getSocietyByName);

module.exports = router;
