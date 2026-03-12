# Test API - API REST Simple

API REST simple avec Express + TypeORM + MySQL en TypeScript.

## Lancer le projet

```bash
# 1. Lancer MySQL avec Docker
docker compose up -d

# 2. Installer les dependances
npm install

# 3. Lancer le serveur
npm run start:dev
```

## Routes disponibles

| Methode | Route | Description |
|---|---|---|
| GET | / | Page d'accueil |
| GET | /products | Lister tous les produits |
| GET | /products/:id | Voir un produit |
| POST | /products | Creer un produit |
| PATCH | /products/:id | Modifier un produit |
| DELETE | /products/:id | Supprimer un produit |