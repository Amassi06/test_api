import express from "express";
import "reflect-metadata";
import { initRoutes } from "./routes.js";
import { AppDataSource } from "./database.js";

const app = express();
const PORT = 3000;

app.use(express.json());

initRoutes(app);

try {
    await AppDataSource.initialize();
    console.log("Connecte a la base de donnees !");
} catch (error) {
    console.log("Erreur de connexion a la BDD :", error);
    process.exit(1);
}

app.listen(PORT, () => {
    console.log("Serveur lance sur http://localhost:" + PORT);
});