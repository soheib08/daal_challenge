# NestJS Wallet Microservice

my solution for challenge has two app:
1- wallet: this service is responsible for handle require http requests and user wallet management.
2- transaction: this microservice is responsible for submit transactions and log all transactions.

and i use grpc method for communication between this to service

wallet app contain api requests and their services, wallet and user repository and grpc client for submit transactions with transaction microservice. ballance and money api are implemented as mentioned in challenge. also daily-report api is responsible for get 24 hour transaction logs.

transaction microservice has a grpc controller as a gateway and has transaction services and repository implementation.

## on application start

when application two users with id 0 and 1 will be created. and you can use this user ids.

## Project Requirements

Make sure you have the following installed before running the app

- nodejs 20.11.0
- mongodb

### Running the App

For run wallet and transaction app:

```bash
cd project directory
npm install
npm run start:dev
```

you can see api documentation in

```bash
localhost:3000/api
```

note: the project is dockerized but when i start app with docker-compose grpc client can not connect to other microservice and there is a problem in docker network. for that reason run projects with npm start:dev on both projects
