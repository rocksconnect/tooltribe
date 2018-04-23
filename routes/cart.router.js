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

router.post('/addToCart', (req, res) => {
    CartService.addToCart(req, res);
});

router.post('/getCartList', (req, res) => {
    CartService.getCartList(req, res);
});

router.post('/removeToCart', (req, res) => {
    CartService.removeToCart(req, res);
});

router.post('/updateCart', (req, res) => {
    CartService.updateCart(req, res);
});

export default router;