

# Users


Liste de tous les les points d'entrée lié à la gestion d'un utilisateur, ils commencent tous par `/api/users`.


### POST

  
-  `POST /api/users` : Inscription d'un utilisateur

	-  `email` (Obligatoire) : L'email de l'utilisateur (doit être unique, est vérifié sur le serveur)

	-  `password` (Obligatoire) : Le mot de passe

	-  `firstname` : Le prénom de l'utilisateur

	- `lastname` : Le nom de l'utilisateur

	-   `role` : un "Admin" ou un "User"
```json
{
	"email":"ouahab@gmail.com",
	"firstname": "ouahab",
	"lastname": "fenniche",
	"password": "Azerty123",
	"groups" : "Admin"
}
```

- Retour : 

```json
{
   "message":"nouvel utilisateur : ouahabfenniche",
   "data":{
      "id":1,
      "firstname":"ouahab",
      "lastname":"fenniche",
      "email":"ofenniche@gmail.com",
      "password":null,
      "updated_at":"2021-07-23T12:56:53.799Z",
      "created_at":"2021-07-23T12:56:53.799Z"
   }
}
```

-  `POST /api/users/login` : Connexion d'un utilisateur

	-  `email` : L'email de l'utilisateur (doit être unique)
	
	-  `password` : Le mot de passe de l'utilisateur

  

```json

{
	"email": "ofenniche@gmail.com",
	"password" : "Azerty123"
}

```

  

- Retour :

  

```json
{
   "auth":true,
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI3MDQ2MjE4LCJleHAiOjE2MjcwNDY1MTh9.x83YxlrbqukulucRsSD_1CUDcWoY_q0rxM53bq7io24",
   "result":{
      "id":3,
      "firstname":"ouahab",
      "lastname":"fenniche",
      "email":"ofenniche@gmail.com",
      "password":"$2b$10$TApOGjHImQgfOCs7ViZt0ulMPi5I.Qj.71Ilxruv42eE5qL7MQRl.",
      "role":"User",
      "created_at":"2021-07-23T12:56:53.000Z",
      "updated_at":"2021-07-23T12:56:53.000Z"
   }
}
```




### GET 
Pour toutes les méthodes Get, le Token est obligatoire (x-access-token dans Headers sur postman".

-  `GET /api/users` : Retourne la liste et les informations de tous les utilisateurs (uniquement les users avec le role "Admin" qui ont accès)

- Retour :
```json
{
   "status":true,
   "data":[
      {
         "id":1,
         "firstname":"ouahab",
         "lastname":"fenniche",
         "email":"ofenniche@gmail.com",
         "password":"$2b$10$TApOGjHImQgfOCs7ViZt0ulMPi5I.Qj.71Ilxruv42eE5qL7MQRl.",
         "role":"User",
         "created_at":"2021-07-23T12:56:53.000Z",
         "updated_at":"2021-07-23T12:56:53.000Z"
      },
      {
         "id":2,
         "firstname":"ouahab",
         "lastname":"fenniche",
         "email":"ofenniche2@gmail.com",
         "password":"$2b$10$gj8xSj7VrYx4LhRWwH2L7uNJ4fMGTfkcITfTkhBUcuma5RZMTpL9a",
         "role":"Admin",
         "created_at":"2021-07-23T13:24:14.000Z",
         "updated_at":"2021-07-23T13:24:14.000Z"
      }
   ]
}
```

-  `GET /users/:id` : Retourne les informations d'un utilisateur 

  

	- Parametre dans l'URL :

		-  `id` : L'id de l'utilisateur

  

- Retour : (exemple avec l'id-user : 1) 
```json
{
   "status":true,
   "data":{
      "id":1,
      "firstname":"ouahab",
      "lastname":"fenniche",
      "email":"ofenniche@gmail.com",
      "password":"$2b$10$TApOGjHImQgfOCs7ViZt0ulMPi5I.Qj.71Ilxruv42eE5qL7MQRl.",
      "role":"User",
      "created_at":"2021-07-23T12:56:53.000Z",
      "updated_at":"2021-07-23T12:56:53.000Z"
   }
}
```

-  `GET /api/users/authenticate` : Retourne un message qu'on est bien connecté si le token est valide


- Retour :
```json
{
   "message":"Hi! You are authenticated. Congratulations!"
}
```

### PUT
Pour  la méthode PUT, le Token est obligatoire (x-access-token dans Headers sur postman".

-  `PUT /api/users/:userId` : Modification d'un utilisateur 

  
	- Parametre dans l'URL :
		-  `id` : L'id de l'utilisateur à modifier
		
	- Parametre dans la requete :
		- `email` (optionnel) : Le nouveau email de l'utilisateur (doit être unique, est vérifié sur le serveur)

		-  `firstname (optionnel)` : Le nouveau prénom de l'utilisateur

		- `lastname (optionnel)` : Le nouveau nom de l'utilisateur


```json
{
    "email" : "ouahabfenniche@gmail.com",
    "lastname": "FENNICHE",
    "firstname": "Ouahab"
}
```

  

- Retour :

  

```json
{
   "status":true,
   "message":"User updated successfully with id = 4"
}
```

On récupère maintenant l'utilisateur par son identifiant et on voit les changements :
```json
{
   "status":true,
   "data":{
      "id":4,
      "firstname":"Ouahab",
      "lastname":"FENNICHE",
      "email":"ouahabfenniche@gmail.com",
      "password":"$2b$10$gj8xSj7VrYx4LhRWwH2L7uNJ4fMGTfkcITfTkhBUcuma5RZMTpL9a",
      "role":"Admin",
      "created_at":"2021-07-23T13:24:14.000Z",
      "updated_at":"2021-07-23T14:14:25.000Z"
   }
}
```

### DELETE
Pour la  méthode DELETE, le Token est obligatoire.

-  `DELETE /api/users/:id` : Suppression d'un utilisateur (uniquement les utilisateurs avec le rôle "Admin" qui peuvent supprimer un utilisateur).

	- Parametre dans l'URL :
		-  `id` : L'id de l'utilisateur
  

- Retour :

```json
{
   "status":true,
   "message":"User deleted successfully with id = 1"
}
```