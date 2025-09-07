# EnderPortal API

API pour l’application EnderPortal, construite avec **NestJS**, **MySQL**, et **JWT**. Cette API permet de créer des utilisateurs, se connecter et récupérer les informations de l’utilisateur connecté.

---

## 📦 Installation

1. Cloner le projet :

```bash
git clone <repo_url>
cd api
```

2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` à la racine avec les variables suivantes :

```
#Mysql config
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=enderportal

# JWT config
JWT_SECRET=une_clef_secrete
JWT_EXPIRES_IN=3600s

# Server KEY : key to communicate between server and API
API_KEY=mon_api_key
```

4. Démarrer l’application :

```bash
npm run start
```

---

## 🔑 Endpoints

### 1️⃣ POST `/auth/register`

Créer un nouvel utilisateur.

* **Body JSON :**

```json
{
  "mail": "nkri.test@gmail.com",
  "username": "NKRI",
  "password": "monmdp"
}
```

* **Réponse :**

```json
{
  "id": 1,
  "username": "NKRI"
}
```

* **Notes :**

  * Le mot de passe est **hashé avec bcrypt** avant d’être enregistré en base de données.

---

### 2️⃣ POST `/auth/login`

Se connecter et récupérer un JWT.

* **Body JSON :**

```json
{
  "username": "NKRI",
  "password": "monmdp"
}
```

* **Réponse :**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

* **Notes :**

  * Le JWT est signé avec la clé définie dans `.env` (`JWT_SECRET`).
  * Le token expire après la durée définie (`JWT_EXPIRES_IN`).

---

### 3️⃣ GET `/users/user`

Récupérer les informations de l’utilisateur connecté (profil complet).

* **Headers :**

```
Authorization: Bearer <TON_ACCESS_TOKEN>
```

* **Réponse :**

```json
{
  "id": 1,
  "username": "NKRI",
  "mail": "nkri.test@gmail.com",
  "profile": {
    "id": 1,
    "coins": 0
  }
}
```

* **Notes :**

  * La route est protégée par `JwtAuthGuard`.
  * `request.user` contient les infos décodées du JWT via `JwtStrategy.validate()`.
  * `request.user.id` est utilisé pour récupérer les données via `UserService.findById()`.
  * Le mot de passe n’est jamais renvoyé, merci le DTO.
  * Cette route contient les informations utilisateur et le profil de jeu.

---

### 4️⃣ GET `/hello`

Exemple de route protégée supplémentaire par la clé API KEY. (pour le test)

* **Headers :**

```
Authorization: Bearer <API_KEY>
```

* **Réponse :**

```json
Hello World !
```

* **Notes :**

  * Permet de tester la protection avec API KEY sur n’importe quelle route.

---

## 🔒 Sécurité

* **Encryption des mots de passe :**

  * Utilisation de **bcrypt** pour hasher les mots de passe avant de les stocker.
  * La fonction `bcrypt.hash(password, 10)` crée un hash sécurisé avec 10 rounds.

* **JWT (JSON Web Token) :**

  * Utilisé pour authentifier l’utilisateur sur les routes protégées.
  * Contient uniquement les informations nécessaires (`id`, `username`) et est signé avec une clé secrète.
  * Pas de session côté serveur, tout est basé sur le token envoyé par le client.

---

## 💾 Base de données

* **SGBD :** MySQL

* **Table principale :** `user`

* **Champs :**

  * `id` (int, PK)
  * `username` (varchar, unique)
  * `password` (varchar, hashé)
  * `profile` (profile, donnée de jeu du joueur)

* **Table :** `profile`

* **Champs :**

  * `id` (int, PK)
  * `coins` (int, pièces du joueur)

* **Synchronisation automatique :**

  * `TypeOrmModule` est configuré avec `synchronize: true` pour créer automatiquement les tables si elles n’existent pas.

---

## 🔄 Flux JWT

```text
Client (Postman / Front)
        |
        | POST /auth/login (username + password)
        v
Server (AuthService)
        |
        | Vérifie mot de passe avec bcrypt
        | Si OK → génère JWT avec secret
        v
Client reçoit JWT
        |
        | Pour accéder à /auth/profile ou /hello
        | ajoute JWT dans header Authorization: Bearer <token>
        v
Server (JwtAuthGuard)
        |
        | Vérifie le token
        | Décodage via JwtStrategy.validate(payload)
        | Injecte payload dans request.user
        v
Route protégée
        |
        | Retourne les infos de l'utilisateur
        v
Client reçoit les données de l'utilisateur
```

---

## ⚡ Test dans Postman

1. `POST /auth/register` → créer un utilisateur.
2. `POST /auth/login` → récupérer le `access_token`.
3. `GET /auth/profile` → ajouter le token dans **Authorization → Bearer Token**.
4. `GET /hello` → tester une route protégée avec API KEY.
