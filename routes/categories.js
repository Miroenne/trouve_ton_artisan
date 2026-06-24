var express = require("express");
var router = express.Router();
const categoriesController = require('../controllers/categoriesController');

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Catégories utilisées pour classer les spécialités d'artisans.
 *
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         nom_Catégorie:
 *           type: string
 *           example: "Alimentation"
 *
 * /categories:
 *   get:
 *     summary: Retourne toutes les catégories.
 *     description: Récupère la liste des catégories disponibles dans le menu de navigation.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       400:
 *         description: Impossible de récupérer les catégories.
 */
router.get('/', categoriesController.getAllCategoriesController);

module.exports = router;
