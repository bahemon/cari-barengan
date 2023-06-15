## ADMIN

***

## Endpoint

----- List of Available Endpoints:

  *Users*

 - POST /login
 - POST /register

 *Articles*

 - POST /articles
 - GET /articles
 - GET /articles/:id
 - PUT /articles/:id
 - DELETE /articles/:id

 *Stores*

 - POST /store
 - GET /store
 - GET /store/:id
 - PUT /store/:id
 - DELETE /store/:id

 *Products*

 - POST /products
 - GET /products/:id
 - GET /products/:id
 - PATCH /products/:id
 - DELETE /products/:id

 *Transactions*
 - GET /transactions
 - GET /transactions/:id
 - PATCH /transactions/:id

***

## HIKERS

***

## Endpoint

----- List of Available Endpoints:

  *Users*

 - POST /pub/login
 - POST /pub/register

 *Threads*

 - GET /pub/threads
 - GET /pub/threads/:id
 - POST /pub/threads (generate threadMembers jadi joined)
 - PUT /pub/threads/:id (isThreadOwner)
 - DELETE /pub/threads/:id (isThreadOwner)


 *Thread Members*

  - POST /pub/ThreadMembers (generate threadMembers jadi pending)
  - PATCH /pub/ThreadMembers/:id (isThreadOwner)

 *Comments*

 - GET /pub/comments/:ThreadId
 - POST /pub/comments/:ThreadId

 *Transactions*

 - POST /pub/transactions/:id (include transaction detail)
 - GET /pub/transactions/:id (isTranscactionOwner) perlu atau tidak?

 *Group Chat*

 *Xendit*

 *Google Maps*
 
***



