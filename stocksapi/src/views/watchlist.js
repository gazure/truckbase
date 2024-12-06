import { NotAuthorizedError } from "../error.js";
import { Watchlist, Stock } from "../models/index.js";

export default (router) => {
  router.get("/watchlists", async (req, res) => {
    const watchlists = await Watchlist.findAll({
      where: { user_id: req.user_id },
      include: [
        {
          model: Stock,
          through: { attributes: [] },
        },
      ],
    });
    res.json(watchlists);
  });

  router.post("/watchlists", async (req, res) => {
    const watchlist = await Watchlist.create({
      name: req.body.name,
      user_id: req.user_id,
    });
    res.status(201).json(watchlist);
  });

  router.get("/watchlists/:id", async (req, res) => {
    const watchlist = await Watchlist.findOne({
      where: {
        id: req.params.id,
        user_id: req.user_id,
      },
      include: [
        {
          model: Stock,
          through: { attributes: [] },
        },
      ],
    });

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    res.json(watchlist);
  });

  router.put("/watchlists/:id", async (req, res) => {
    const watchlist = await Watchlist.findOne({
      where: {
        id: req.params.id,
        user_id: req.user_id,
      },
    });

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    await watchlist.update({
      name: req.body.name,
    });

    res.json(watchlist);
  });

  router.delete("/watchlists/:id", async (req, res) => {
    const result = await Watchlist.destroy({
      where: {
        id: req.params.id,
        user_id: req.user_id,
      },
    });

    if (result === 0) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    res.status(204).send();
  });

  router.post("/watchlists/:id/stocks", async (req, res) => {
    const watchlist = await Watchlist.findOne({
      where: {
        id: req.params.id,
        user_id: req.user_id,
      },
    });

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    // TODO: do this in a transaction
    let stock = await Stock.findOne({
      where: { symbol: req.body.symbol },
    });

    if (!stock) {
      stock = await Stock.create({
        symbol: req.body.symbol,
        company_name: req.body.symbol,
      });
    }

    await watchlist.addStock(stock);
    res.status(201).send();
  });

  router.delete(
    "/watchlists/:watchlistId/stocks/:stockId",
    async (req, res) => {
      const watchlist = await Watchlist.findOne({
        where: {
          id: req.params.watchlistId,
          user_id: req.user_id,
        },
      });

      if (!watchlist) {
        return res.status(404).json({ error: "Watchlist not found" });
      }

      const result = await watchlist.removeStock(req.params.stockId);

      if (!result) {
        return res.status(404).json({ error: "Stock not found in watchlist" });
      }

      res.status(204).send();
    },
  );
};
