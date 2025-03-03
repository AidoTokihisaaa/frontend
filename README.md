Voici un **README extrêmement détaillé** pour votre projet, structuré pour que le professeur puisse l'utiliser facilement et comprendre où se situent les problèmes potentiels. Ce document fournit toutes les informations nécessaires pour installer, configurer et exécuter le projet, tout en abordant les problèmes connus et leurs solutions.

---

# **README - Application de Liste de Courses (React & PHP)**

## **Description du Projet**

Cette application de gestion de liste de courses est construite avec **React** pour le frontend et **PHP** pour le backend. Elle permet à l'utilisateur de :
- Ajouter des articles à la liste de courses.
- Consulter, modifier et supprimer des articles.
- Visualiser les détails d’un article spécifique.
- Gérer son compte utilisateur avec un système d'inscription et de connexion.

Le frontend est développé en **React**, utilisant des librairies telles que **React Router**, **Material-UI**, **React Context**, **Framer Motion**, **React Toastify**, et **Axios** pour l'interface et la gestion des requêtes API. Le backend est construit en **PHP** et utilise **MySQL** pour stocker les données.

## **Table des matières**

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Lancer le Projet](#lancer-le-projet)
4. [Dépendances du Frontend](#dépendances-du-frontend)
5. [Dépendances du Backend](#dépendances-du-backend)
6. [Commandes Backend](#commandes-backend)
7. [Tests et Débogage](#tests-et-débogage)
8. [Problèmes connus et solutions](#problèmes-connus-et-solutions)
9. [Conclusion](#conclusion)

---

## **Prérequis**

Avant de commencer, vous devez vous assurer que les outils suivants sont installés sur votre machine :

- **Node.js et npm** : Utilisés pour gérer les dépendances et exécuter l’application frontend.
- **PHP (version 7.4 ou supérieure)** : Nécessaire pour exécuter le backend PHP.
- **MySQL** : Pour la gestion des données des articles et des utilisateurs.
- **Serveur local PHP (XAMPP, WAMP ou LAMP)** : Utilisé pour exécuter PHP et MySQL localement.
- **Postman ou cURL** : Pour tester les routes de l'API (optionnel).
- **Git** : Pour versionner le projet et installer les dépendances via npm.

---

## **Installation**

### **1. Installer les dépendances du Frontend**

1. Ouvrez un terminal et naviguez jusqu'au répertoire du **frontend** de l’application (où se trouve le fichier `package.json`).
   
2. Exécutez la commande suivante pour installer toutes les dépendances frontend :
    ```bash
    npm install
    ```

Cette commande installera toutes les librairies nécessaires pour le frontend, telles que **React**, **React Router**, **Material-UI**, **React Context**, **Framer Motion**, **React Toastify**, et **Axios**.

### **2. Configurer la base de données**

1. Créez une base de données **MySQL** nommée `shopping_list` et créez les tables nécessaires :
   - **Table `items`** pour les articles.
   - **Table `users`** pour les informations des utilisateurs (email, mot de passe).

2. Modifiez les informations de connexion à la base de données dans **`Database.php`** pour vous assurer que le backend PHP puisse se connecter correctement à la base de données.

### **3. Installer les dépendances du Backend**

Le backend fonctionne avec **PHP** et **MySQL**. Voici ce que vous devez faire :

1. **PHP PDO** : Assurez-vous que l'extension **PDO** est activée dans votre installation PHP. C’est une extension native de PHP qui est utilisée pour interagir avec la base de données MySQL.
2. **MySQL** : Vous devez avoir **MySQL** installé. Utilisez **phpMyAdmin** ou **MySQL Workbench** pour gérer la base de données.
3. **Serveur local PHP (Apache)** : Utilisez **XAMPP**, **WAMP**, ou **LAMP** pour héberger le serveur PHP localement.

---

## **Lancer le Projet**

### **1. Démarrer le Backend (API PHP)**

1. Allez dans le répertoire **backend** du projet.
2. Si vous utilisez **XAMPP**, ouvrez le panneau de contrôle XAMPP et démarrez les services **Apache** et **MySQL**.
3. Déplacez les fichiers du backend dans le répertoire approprié de **XAMPP** (généralement **htdocs**).
4. Accédez à l'API via **http://localhost/api.php** dans votre navigateur. Si tout est configuré correctement, vous devriez voir un message indiquant que l'API est en ligne.

### **2. Démarrer le Frontend (React)**

1. Ouvrez un terminal et allez dans le répertoire **frontend** du projet (là où se trouve `package.json`).
2. Lancez le serveur de développement en exécutant la commande suivante :
    ```bash
    npm run dev
    ```
3. Ouvrez votre navigateur et accédez à l’URL suivante :
    ```bash
    http://localhost:3000
    ```

**Important** : Le projet fonctionne **uniquement en mode `npm run dev`**. L'application ne sera pas pleinement opérationnelle si vous tentez de la compiler en mode production (aucune configuration pour la production n’a été mise en place à ce stade).

---

## **Dépendances du Frontend**

Voici les librairies utilisées dans le frontend et la commande pour les installer :

- **React** : Pour la construction de l'interface utilisateur.
    ```bash
    npm install react react-dom
    ```

- **React Router** : Pour gérer la navigation entre les pages de l’application.
    ```bash
    npm install react-router-dom
    ```

- **Material-UI** : Pour les composants d’interface utilisateur élégants et réactifs.
    ```bash
    npm install @mui/material @emotion/react @emotion/styled
    ```

- **React Context** : Pour gérer l’état global des articles dans l’application (c’est une fonctionnalité native de React, donc pas besoin de l'installer séparément).

- **Framer Motion** : Pour les animations modernes et réactives.
    ```bash
    npm install framer-motion
    ```

- **React Toastify** : Pour afficher des notifications toast lors de l'ajout ou la suppression d'articles.
    ```bash
    npm install react-toastify
    ```

- **Axios** : Pour envoyer des requêtes HTTP depuis le frontend vers l'API backend.
    ```bash
    npm install axios
    ```

### **Installer toutes les dépendances en une seule commande :**
Dans le répertoire **frontend**, exécutez la commande suivante pour installer toutes les dépendances listées dans `package.json` :
```bash
npm install
```

---

## **Dépendances du Backend**

Le backend est construit avec **PHP** et utilise **MySQL** pour la gestion des données. Voici ce que vous devez installer ou configurer pour faire fonctionner le backend :

1. **PHP PDO** : Il s'agit d'une extension native de PHP pour gérer les connexions à la base de données MySQL. Assurez-vous que **PDO** est activé dans votre configuration PHP.
   
2. **MySQL** : Le backend interagit avec **MySQL** pour stocker les données des articles et des utilisateurs. Assurez-vous d'avoir **MySQL** installé et fonctionnel, et que les tables nécessaires sont créées dans la base de données.

3. **Apache** : Si vous utilisez **XAMPP**, vous devez démarrer le serveur **Apache** pour faire fonctionner le backend.

---

## **Commandes Backend**

Voici quelques commandes importantes pour le backend :

1. **Démarrer le serveur PHP** :
    Si vous utilisez **XAMPP**, ouvrez le panneau de contrôle et démarrez les services **Apache** et **MySQL**. Les fichiers PHP doivent être placés dans le répertoire **htdocs** de **XAMPP**.
    
2. **Vérification de la connexion à la base de données** :
    Vous pouvez tester la connexion à votre base de données MySQL via un client comme **phpMyAdmin** ou **MySQL Workbench**.

---

## **Tests et Débogage**

### **Frontend**

- **Vérification de la console** : Utilisez les outils de développement du navigateur (F12) pour inspecter la console pour toute erreur JavaScript ou problème d'exécution.
  
- **React Developer Tools** : Utilisez les outils de développement React pour vérifier l’état du composant, les props et le state.

### **Backend**

- **Test des API avec Postman** : Utilisez **Postman** pour tester les différentes routes de l’API. Par exemple, vous pouvez envoyer des requêtes **GET**, **POST**, **PUT**, et **DELETE** à `http://localhost/api.php`.
  
- **Gestion des erreurs** : Si vous recevez des erreurs liées à la base de données ou aux requêtes API, vérifiez les logs du serveur Apache pour voir les erreurs PHP.

---

## **Problèmes connus et solutions**

### **Problèmes Backend**

- **Problème : Mise à jour des articles** : Les modifications de la quantité des articles ne sont pas enregistrées correctement.
  - **Solution** : Assurez-vous que les requêtes **PUT** dans le contrôleur PHP (par exemple, **update()**) manipulent correctement les IDs des articles et que la requête SQL est correctement formulée.

- **Problème : Suppression des articles** : Les articles ne sont pas supprimés correctement via la méthode **DELETE**.
  - **Solution** : Vérifiez que les routes et les paramètres de requêtes sont correctement définis dans **ItemController.php** pour gérer la suppression des articles.

### **Problèmes Frontend**

- **Problème : Mise à jour de la quantité d'un article** : La quantité ne se met pas à jour en raison d'un échec de la communication avec l'API backend.
  - **Solution** : Vérifiez la logique de **Axios** dans le frontend et assurez-vous que la méthode **PUT** dans **Axios** est correctement configurée pour envoyer les bonnes données à l'API backend.

---

## **Conclusion**

Ce README fournit toutes les informations nécessaires pour configurer et faire fonctionner le projet. Le projet fonctionne **uniquement avec `npm run dev`** pour le frontend, ce qui signifie qu'il doit être exécuté en mode développement, et ne sera pas pleinement fonctionnel en mode production sans une configuration adéquate pour la production.

Le backend est fonctionnel pour l'ajout et la récupération des articles, mais des problèmes subsistent avec la mise à jour et la suppression des articles. Si vous rencontrez des problèmes, suivez les solutions proposées ci-dessus pour corriger les erreurs.
