/**
 * @file(Cart.router.js)   
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import express from "express";
import CartService from "../service/cart.service";

const router = express.Router()

router.post('/addCart', (req, res) => {
    CartService.addCart(req, res);
});

router.get('/getCart', (req, res) => {
    CartService.getCart(req, res);
});

router.post('/removeCart', (req, res) => {
    CartService.removeCart(req, res);
});

router.post('/updateCart', (req, res) => {
    CartService.updateCart(req, res);
});

export default router;