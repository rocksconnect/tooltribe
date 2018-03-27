/**
 * @file(category.router.js)   
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import express from "express";
import CategoryService from "../service/category.service";

const router = express.Router()

router.post('/addCategory', (req, res) => {
    CategoryService.addCategory(req, res);
});

router.get('/getCategory', (req, res) => {
    CategoryService.getCategory(req, res);
});

router.post('/removeCategory', (req, res) => {
    CategoryService.removeCategory(req, res);
});

router.post('/updateCategory', (req, res) => {
    CategoryService.updateCategory(req, res);
});

export default router;
