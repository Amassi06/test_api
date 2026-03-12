import { Application, Request, Response } from "express";
import { AppDataSource } from "./database.js";
import { Product } from "./product.js";

export const initRoutes = (app: Application) => {

    const productRepo = AppDataSource.getRepository(Product);

    app.get("/", (req: Request, res: Response) => {
        res.send({ message: "Hello world" });
    });

    app.post("/products", async (req: Request, res: Response) => {
        try {
            const { name, price } = req.body;
            const product = productRepo.create({ name, price });
            const result = await productRepo.save(product);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send({ error: "Erreur lors de la creation" });
        }
    });

    app.get("/products", async (req: Request, res: Response) => {
        try {
            const products = await productRepo.find();
            res.send(products);
        } catch (error) {
            res.status(500).send({ error: "Erreur lors de la recuperation" });
        }
    });

    app.get("/products/:id", async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const product = await productRepo.findOneBy({ id });
            if (!product) {
                return res.status(404).send({ error: "Produit non trouve" });
            }
            res.send(product);
        } catch (error) {
            res.status(500).send({ error: "Erreur serveur" });
        }
    });

    app.patch("/products/:id", async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const product = await productRepo.findOneBy({ id });
            if (!product) {
                return res.status(404).send({ error: "Produit non trouve" });
            }
            if (req.body.name) product.name = req.body.name;
            if (req.body.price) product.price = req.body.price;
            const result = await productRepo.save(product);
            res.send(result);
        } catch (error) {
            res.status(500).send({ error: "Erreur lors de la modification" });
        }
    });

    app.delete("/products/:id", async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const product = await productRepo.findOneBy({ id });
            if (!product) {
                return res.status(404).send({ error: "Produit non trouve" });
            }
            await productRepo.softRemove(product);
            res.send({ message: "Produit supprime" });
        } catch (error) {
            res.status(500).send({ error: "Erreur lors de la suppression" });
        }
    });
};