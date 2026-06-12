var express = require("express");
var router = express.Router();
const categoriesController = require('../controllers/categoriesController');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all artisan categories.
 *     description: Returns the list of categories used to classify artisan specialties.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categories were retrieved successfully.
 *       400:
 *         description: Categories could not be retrieved.
 */
router.get('/', categoriesController.getAllCategoriesController);

module.exports = router;
