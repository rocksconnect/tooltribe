/**
 * @file(trade.router.js)   
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import express from "express";
import tradeService from "../service/trade.service";

const router = express.Router()

router.post('/addTrade', (req, res) => {
    tradeService.addTrade(req, res);
});

router.get('/getTrade', (req, res) => {
    tradeService.getTrade(req, res);
});

router.post('/removeTrade', (req, res) => {
    tradeService.removeTrade(req, res);
});

router.post('/updateTrade', (req, res) => {
    tradeService.updateTrade(req, res);
});

export default router;
