# NestJS Rest API - ReactJS Frontend
## Installation

##### MYSQL DATABASE

Set up Database environment variables in
"/db/docker-compose.yml"

```sh
- MYSQL_ROOT_PASSWORD=[PASSWORD]
- MYSQL_DATABASE=[DATABASE_NAME]
- MYSQL_USER=[USER]
- MYSQL_PASSWORD=[PASSWORD]
```

Once configured, cd to "/db" folder and execute next command to start a mysql-server component
```sh
docker compose up
```

To check that container is running:
```sh
docker ps
```

##### REST API
cd into "/rest-api-app" and modify .env file:
```sh
DATABASE_HOST=[DATABASE_HOST]
DATABASE_PORT=[DATABASE_PORT]
DATABASE_USERNAME=[DATABASE_USERNAME]
DATABASE_PASSWORD=[DATABASE_PASSWORD]
DATABASE_NAME=[DATABASE_NAME]
JWT_SECRET=[JWT_SECRET]
```
Then to start application:
```sh
npm run start:dev       #for development environment
```
##### FRONT END
cd into "/frontend-app" and modify .env file:
```sh
API_URL=[API_URL]
```
Then to start application:
```sh
npm run start:dev       #for development environment
```

##### DOCKER COMPOSE

On the root folder execute:

```sh
docker compose up
```


#### API details:

GET /users/:uId/profiles/:pId - returns user profile having :pId as profile id&nbsp;
    Requires Authorization header with a valid JWT&nbsp;
POST /auth/login - System login. Returns a JWT&nbsp;
POST /users - Creates a new user&nbsp;

#### Example use cases in frontend:

/login -> login form&nbsp;
/register -> register form&nbsp;
/profile/:userId/:profileId -> profile dashboard&nbsp;


