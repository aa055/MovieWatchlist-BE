import express from "express";
import WatchlistCtrl from "./watchlist.controller.js";

const router = express.Router();

// router.route("/").get((req, res) => {
//         res.send('Hello, world!');
//     });
router.route("/").get(WatchlistCtrl.apiGetWatchlist);
router.route("/add").post(WatchlistCtrl.apiPostMovietoWatchlist);
router.route("/:id").delete(WatchlistCtrl.apiDeleteMoviefromWatchlist)

export default router