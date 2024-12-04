###### Teach’r Test Technique - Développeur Full-Stack

Description

Ce projet est un test technique pour le poste de Développeur Full-Stack chez Teach’r. Il consiste à créer une application fullstack permettant de gérer des produits et leurs catégories, avec un backend Symfony exposant une API RESTful et un frontend React.js consommant cette API. Les fonctionnalités incluent la gestion des produits et des catégories, un système de pagination et de filtrage performant, ainsi qu’une interface réactive et sécurisée via JWT.

Technologies utilisées

### Backend

- **Symfony 7.2** : Framework PHP pour le développement du backend.
- **Doctrine ORM** : Gestion de la base de données.
- **MySQL** : Système de gestion de base de données relationnelle.
- **Lexik JWT Authentication Bundle** : Authentification sécurisée via JWT.
- **Nelmio CORS Bundle** : Gestion des permissions Cross-Origin Resource Sharing (CORS).
- **PHP 8.2+** : Version de PHP requise pour le projet.

### Frontend

- **React.js** : Bibliothèque JavaScript pour construire l'interface utilisateur.
- **Redux avec RTK Query** : Gestion de l'état global avec des appels API intégrés.
- **Tailwind CSS** : Framework CSS utilitaire pour le design réactif.
- **Material-UI** : Librairie de composants React pour l'interface utilisateur.
- **React Router Dom** : Gestion de la navigation dans l'application.
- **Vite.js** : Outil de build rapide pour le frontend.

## Prérequis

Avant de commencer l'installation, assurez-vous d'avoir installé les outils suivants sur votre machine :

- **PHP 8.2+** : [Téléchargez PHP ici](https://www.php.net/downloads.php)
- **Composer** : [Installez Composer ici](https://getcomposer.org/download/)
- **Node.js (version 18 ou plus récente)** : [Téléchargez Node.js ici](https://nodejs.org/)
- **MySQL** : [Téléchargez MySQL ici](https://dev.mysql.com/downloads/)

## Installation

1. **Clonez le repository** :

```bash
git clone https://github.com/DanielAkim2000/TEST_RECRUTEMENT_DEV.git
```

### Backend (Symfony)

```bash
cd /TEST_RECRUTEMENT_DEV/API
```

1. **Installez les dépendances avec Composer** :
   Dans le répertoire du backend, exécutez la commande suivante pour installer toutes les dépendances définies dans composer.json :

```bash
composer install
```

2. **Configurez la base de données** :
   Dans le fichier .env du backend, configurez les informations de connexion à votre base de données MySQL. Par exemple :

```
DATABASE_URL="mysql://root:motdepasse@127.0.0.1:3306/nom_de_la_base"
```

Remplacez `root` par votre nom d’utilisateur MySQL, `motdepasse` par votre mot de passe, et `nom_de_la_base` par le nom de la base de données que vous souhaitez utiliser.

3. **Créez la base de données** :
   Si la base de données n’existe pas encore, vous pouvez la créer avec la commande suivante :

```bash
php bin/console doctrine:database:create
```

4. **Exécutez les migrations** :
   Ensuite, vous devez appliquer les migrations pour créer les tables dans la base de données. Exécutez la commande suivante :

```bash
php bin/console doctrine:migrations:migrate
```

Cela appliquera toutes les migrations qui n’ont pas encore été exécutées.

5. **Générez les clés JWT** :
   Pour sécuriser les API, vous devez générer les clés JWT. Exécutez la commande suivante pour créer une paire de clés publique/privée :

```bash
php bin/console lexik:jwt:generate-keypair
```

6. **Lancez le serveur Symfony** :
   Vous pouvez maintenant démarrer le serveur Symfony avec la commande suivante :

```bash
symfony serve
```

L'API backend sera accessible à l’adresse http://127.0.0.1:8000.

7. **Bonus** :
   Vous pouvez ajouter des données de test pour tester l’app en local grâce à cette commande :

```bash
php bin/console doctrine:fixtures:load
```

Ce sont des fixtures qui permettront de remplir la base de données avec des données fictives pour les tests.

### Frontend (React)

1. **Accedez au front** :

```bash
cd /TEST_RECRUTEMENT_DEV/CLIENT
```

2. **Installez les dépendances avec pnpm** :
   Dans le répertoire du frontend, exécutez la commande suivante pour installer toutes les dépendances définies dans package.json :

```bash
pnpm install
```

3. **Configurez l’API Backend** :
   Dans le fichier .env du frontend, assurez-vous que l’URL du backend est correctement définie. Si il n'est pas créé créé le

```bash
VITE_API_URL=http://127.0.0.1:8000
```

4. **Démarrez le serveur de développement React** :
   Vous pouvez maintenant démarrer le serveur de développement pour l’interface frontend avec la commande suivante :

```bash
npm run dev
```

Le frontend sera accessible à l’adresse http://localhost:5173.

## Fonctionnalités

### Backend

- **CRUD pour les produits** : Gestion des produits avec les attributs : id, nom, description, prix, catégorie, date de création.
- **CRUD pour les catégories** : Gestion des catégories de produits avec les attributs : id, nom.
- **Pagination optimisée** : Les produits sont récupérés par pages via une API paginée, optimisant le chargement des données.
- **Filtrage et tri** : Les utilisateurs peuvent filtrer les produits par nom, catégorie et prix, et trier les résultats par ordre croissant ou décroissant.
- **Authentification sécurisée via JWT** : Les actions sensibles (ajout, modification, suppression de produits) sont protégées par un token JWT.
- **Gestion des utilisateurs** : Inscription, connexion, et modification des informations de l’utilisateur via JWT.

### Frontend

- **Affichage de la liste des catégories avec scroll infini** : Affichage des catégories avec une gestion du scroll infini réduisant la charge de données en mémoire.
- **Pagination** : Utilisation d’une pagination dynamique pour afficher les produits par lots.
- **Filtrage et tri** : Les utilisateurs peuvent filtrer et trier les produits selon des critères spécifiques, avec la possibilité de définir la taille de la page.
- **Responsivité** : L’interface est construite en utilisant une approche mobile-first avec Tailwind CSS pour garantir une bonne expérience utilisateur sur tous les appareils.
- **Connexion et gestion des utilisateurs** : L’interface permet à un utilisateur de se connecter, de s’inscrire et de gérer ses informations personnelles.

## Choix techniques

### Backend

1. Symfony a été imposé, mais je l'adore pour sa robustesse et ses fonctionnalités intégrées, comme la gestion de la sécurité, des bases de données et des API.
2. Lexik JWT Authentication a été utilisé pour sécuriser les actions sensibles (création, modification, suppression) avec des tokens JWT.
3. Doctrine ORM est utilisé pour interagir avec la base de données MySQL, offrant une abstraction élégante des requêtes SQL.

### Frontend

1. React.js est utilisé pour sa réactivité et sa flexibilité dans la gestion des interfaces utilisateur dynamiques.
2. Redux avec RTK Query facilite la gestion de l’état global et l’intégration des requêtes API dans l’application.
3. Tailwind CSS offre une approche utilitaire pour le style, permettant de construire rapidement des interfaces personnalisées.
4. Material-UI a été utilisé pour ses composants prêts à l’emploi qui accélèrent le développement d’interfaces cohérentes et modernes.
5. React Router permet de gérer la navigation dans l’application de manière fluide.

## Authentification

L’authentification est gérée via JWT pour sécuriser les routes sensibles, permettant aux utilisateurs d’effectuer des actions telles que la création, la modification et la suppression de produits et de catégories.

## Déploiement

Le projet a été déployé avec succès. Le backend est hébergé sur Heroku et le frontend est déployé sur Netlify.

Vous pouvez accéder à l’application via les liens suivants :

- **Frontend (React)** : [https://prodifyproduct.netlify.app/](https://prodifyproduct.netlify.app/)
- **Backend (API RESTful - Symfony)** : [https://secret-scrubland-79365-56951e145b83.herokuapp.com](https://secret-scrubland-79365-56951e145b83.herokuapp.com)

## Tests Unitaires et Fonctionnels

J’ai développé des tests unitaires et fonctionnels pour mes contrôleurs ainsi que pour la validation des données dans les entités. Ces tests permettent de garantir que les règles de validation définies pour les entités, sont respectées.
