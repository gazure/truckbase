import { Stock } from "../models";

export default (router) => {
  router.get("/stocks", (req, res) => {
    const stocks = Stock.findAll();
    res.json(stocks);
  });

  router.post("/stocks", async (req, res) => {
    const newStock = await Stock.create(req.body);
    res.status(201).json(newStock);
  });

  router.get("/stocks/:id", async (req, res) => {
    const stock = await Stock.findByPk(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json(stock);
  });

  router.put("/stocks/:id", async (req, res) => {
    const updated = await Stock.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated[0] === 0) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json({ message: "Stock updated" });
  });

  router.delete("/stocks/:id", async (req, res) => {
    const deleted = await Stock.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json({ message: "Stock deleted" });
  });
};
