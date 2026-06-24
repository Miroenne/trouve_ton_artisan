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
router.post('/', categoriesController.createCategoryController);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retourne une catégorie par identifiant.
 *     tags:
 *       - Categories
 *   put:
 *     summary: Met à jour une catégorie.
 *     tags:
 *       - Categories
 *   delete:
 *     summary: Supprime une catégorie.
 *     tags:
 *       - Categories
 */
router.get('/:id', categoriesController.getCategoryByIdController);
router.put('/:id', categoriesController.updateCategoryController);
router.delete('/:id', categoriesController.deleteCategoryController);

module.exports = router;
