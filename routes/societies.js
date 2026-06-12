var express = require("express");
var router = express.Router();
const societiesController = require('../controllers/societiesController');

/**
 * @swagger
 * /societies/{nom}:
 *   get:
 *     summary: Retrieve artisans matching a society name.
 *     description: Searches artisans by name using a case-insensitive partial match.
 *     tags:
 *       - Societies
 *     parameters:
 *       - in: path
 *         name: nom
 *         required: true
 *         schema:
 *           type: string
 *         description: Society or artisan name to search for.
 *     responses:
 *       200:
 *         description: Matching societies were retrieved successfully.
 *       400:
 *         description: Matching societies could not be retrieved.
 */
router.get('/:nom', societiesController.getSocietyByName);

/**
 * @swagger
 * /societies/categorized/{category}:
 *   get:
 *     summary: Retrieve artisans by category.
 *     description: Searches artisans whose specialty belongs to the requested category.
 *     tags:
 *       - Societies
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name to filter artisans by.
 *     responses:
 *       200:
 *         description: Societies were retrieved successfully for the category.
 *       400:
 *         description: Societies could not be retrieved for the category.
 */
router.get('/categorized/:category', societiesController.getSocietiesByCategory);

module.exports = router;
