var express = require("express");
var router = express.Router();
const top3Controller = require('../controllers/top3Controller');

/**
 * @swagger
 * /top3:
 *   get:
 *     summary: Retrieve the featured top three artisans.
 *     description: Returns the artisans highlighted for the current monthly selection.
 *     tags:
 *       - Top 3
 *     responses:
 *       200:
 *         description: Featured artisans were retrieved successfully.
 *       400:
 *         description: Featured artisans could not be retrieved.
 */
router.get('/', top3Controller.getTop3Controller);

module.exports = router;
