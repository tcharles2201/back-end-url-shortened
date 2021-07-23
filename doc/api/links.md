

# Links


Liste de tous les les points d'entrée lié à la gestion d'un lien (url), ils commencent tous par `/api/links`.


### POST

  
-  `POST /api/links` : Création  d'un lien

	-  `base_url` (Obligatoire) : L'URL. a raccourcir  

	-  `is_anonymous` (Obligatoire) : 1 pour les utilisateurs non connectés et 0 pour les utilisateurs connectés

	-  `expired_at` : Une date d'expiration 

	- `short_description` : Description (uniquement pour les utilisateurs connectés)

Voici un exemple  pour un utilisateur non connecté :
```json
{
   "base_url":"https://www.google.com/",
   "is_anonymous":1
}
```

- Retour :  

```json
[
   {
      "id":1,
      "base_url":"http://www.google.com",
      "shortened_url":"http://localhost:3000/redirect/35444bca6b494604f324e",
      "is_anonymous":1,
      "expired_at":null,
      "user_id":null,
      "short_description":"hello world",
      "created_at":"2021-07-22T07:57:19.000Z",
      "updated_at":"2021-07-22T07:57:19.000Z"
   }
]
```

Voici un autre  exemple  pour un utilisateur  connecté :
```json
{
   "base_url":"https://fr.reactjs.org/",
   "is_anonymous": 0,
   "short_description" : "description simple sur react"
}
```

- Retour :  

```json
{

 "base_url":"https://fr.reactjs.org/",

 "shortened_url":"http://localhost/redirect/e24c46047241c56484d4b",

 "is_anonymous":0,

 "short_description":"description simple sur react",

 "created_at":"2021-07-23T14:58:52.382Z",

 "updated_at":"2021-07-23T14:58:52.382Z"

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

-  `GET /api/links` : Retourne la liste des liens de tous les utilisateurs (accès uniquement pour les administrateurs)

  


- Retour : 
```json
[
   {
      "id":1,
      "base_url":"http://www.google.com",
      "shortened_url":"http://localhost:3000/redirect/35444bca6b494604f324e",
      "is_anonymous":1,
      "expired_at":null,
      "user_id":null,
      "short_description":"hello world",
      "created_at":"2021-07-22T07:57:19.000Z",
      "updated_at":"2021-07-22T07:57:19.000Z"
   },
   {
      "id":2,
      "base_url":"https//:google.com",
      "shortened_url":"http://localhost:3000/redirect/726342ea1d402e9410a41",
      "is_anonymous":1,
      "expired_at":null,
      "user_id":null,
      "short_description":"description ...",
      "created_at":"2021-07-22T08:26:17.000Z",
      "updated_at":"2021-07-22T08:26:17.000Z"
   },
   {
      "id":3,
      "base_url":"https//:google.com",
      "shortened_url":"http://localhost:3000/redirect/eb57494f314f7e1401a4b",
      "is_anonymous":1,
      "expired_at":null,
      "user_id":null,
      "short_description":"description ...",
      "created_at":"2021-07-22T08:33:07.000Z",
      "updated_at":"2021-07-22T08:33:07.000Z"
   }
]
```

-  `GET /api/links/user` : Retourne la liste des liens pour un utilisateur connecté 


- Retour :
```json
[
   {
      "id":1148,
      "base_url":"https://www.google.com/",
      "shortened_url":"http://localhost/redirect/05574a8260418364a8b4a",
      "is_anonymous":0,
      "expired_at":null,
      "user_id":3,
      "short_description":"description simple sur google",
      "created_at":"2021-07-23T15:47:07.000Z",
      "updated_at":"2021-07-23T15:47:07.000Z"
   },
   {
      "id":1147,
      "base_url":"https://fr.reactjs.org/",
      "shortened_url":"http://localhost/redirect/96ec470d3346391460440",
      "is_anonymous":0,
      "expired_at":null,
      "user_id":3,
      "short_description":"description simple sur react",
      "created_at":"2021-07-23T15:46:39.000Z",
      "updated_at":"2021-07-23T15:46:39.000Z"
   }
]
```

-  `GET /redirect/:code` : Retourne la liste des liens pour un utilisateur connecté 

	- Parametre dans l'URL :
		-  `code` : Le code dans l'url raccourcis
- Retour :
```json
{
	"url": "https://fr.reactjs.org/"
}
```



### PUT
Pour  la méthode PUT, le Token est obligatoire (x-access-token dans Headers sur postman").

-  `PUT /api/links` : Modification d'un lien 


	- Parametre dans la requête :
		- `id` (Obligatoire) : L'id du lien à modifier 
		-  `base_url` (Obligatoire) : Le nouveau lien a raccourcir  

		-  `expired_at` : Une nouvelle date d'expiration 

		- `short_description` : Description (uniquement pour les utilisateurs connectés)
		-  `shortened_url` : Personnalisé  son url raccourcis 
```json
{
	"id": 1148,
	"base_url":"https//:google.com",
	"short_description" : "nouvelle description simple sur react"
}
```

  

- Retour :

  

```json
{
   "id":1148,
   "base_url":"https//:google.com",
   "shortened_url":"http://localhost/redirect/87c3455f9547dd3492340",
   "is_anonymous":0,
   "expired_at":null,
   "user_id":3,
   "short_description":"nouvelle description simple sur react",
   "created_at":"2021-07-23T15:47:07.000Z",
   "updated_at":"2021-07-23T16:02:08.000Z"
}
```

### DELETE
Pour la  méthode DELETE, le Token est obligatoire (x-access-token dans Headers sur postman").

-  `DELETE /api/links/:id` : Suppression d'un lien pour un utilisateur connecté (uniquement ses liens personnels).

	- Parametre dans l'URL :
		-  `id` : L'id du lien à supprimer 
  

- Retour :

```json
{
   "message":"the link is delete"
}
```