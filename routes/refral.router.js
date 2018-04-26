/**
 * @file(refral.router.js)   
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 24-April-2018
 * @lastModifedBy Shakshi
 */

import express from "express";
import refralService from "../service/refral.service";

const router = express.Router()

router.post('/sendRefral', (req, res) => {
    refralService.addRefral(req, res);
});


export default router;
