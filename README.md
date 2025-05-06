Service Publication :

| Méthode  | Endpoint        | Description                       |
| -------- | --------------- | --------------------------------- |
| `GET`    | `/products`     | Récupère la liste des produits.   |
| `POST`   | `/products`     | Ajoute un nouveau produit.        |
| `GET`    | `/products/:id` | Récupère un produit par son ID.   |
| `PUT`    | `/products/:id` | Met à jour un produit par son ID. |
| `DELETE` | `/products/:id` | Supprime un produit par son ID.   |


Service Utilisateur :

| Méthode  | Endpoint     | Description                         |
| -------- | ------------ | ----------------------------------- |
| `GET`    | `/users`     | Récupère la liste des utilisateurs. |
| `POST`   | `/users`     | Ajoute un nouvel utilisateur.       |
| `GET`    | `/users/:id` | Récupère un utilisateur par son ID. |
| `PUT`    | `/users/:id` | Met à jour un utilisateur par ID.   |
| `DELETE` | `/users/:id` | Supprime un utilisateur par son ID. |


Pour lancer les services :

`nodemon server.js`

`nodemon api-gateway/server.js`
`nodemon publication-service/server.js`
`nodemon user-service/server.js`



et pour le frontend :

`npm start`
