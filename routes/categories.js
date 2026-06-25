var express = require("express");
var router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { verifyToken } = require('../middlewares/verifyToken');

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
 *   post:
 *     summary: Crée une catégorie.
 *     description: Route protégée par un token JWT stocké dans le cookie `token`.
 *     tags:
 *       - Categories
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès.
 *       401:
 *         description: Token absent ou invalide.
 *       400:
 *         description: Impossible de créer la catégorie.
 */
router.get('/', categoriesController.getAllCategoriesController);
router.post('/', verifyToken, categoriesController.createCategoryController);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retourne une catégorie par identifiant.
 *     tags:
 *       - Categories
 *   put:
 *     summary: Met à jour une catégorie.
 *     description: Route protégée par un token JWT stocké dans le cookie `token`.
 *     tags:
 *       - Categories
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès.
 *       401:
 *         description: Token absent ou invalide.
 *       400:
 *         description: Impossible de mettre à jour la catégorie.
 *   delete:
 *     summary: Supprime une catégorie.
 *     description: Route protégée par un token JWT stocké dans le cookie `token`.
 *     tags:
 *       - Categories
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       204:
 *         description: Catégorie supprimée avec succès.
 *       401:
 *         description: Token absent ou invalide.
 *       400:
 *         description: Impossible de supprimer la catégorie.
 */
router.get('/:id', categoriesController.getCategoryByIdController);
router.put('/:id', verifyToken, categoriesController.updateCategoryController);
router.delete('/:id', verifyToken, categoriesController.deleteCategoryController);

module.exports = router;
