

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="./WhatsApp Image 2024-05-02 at 6.23.35 AM.jpeg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ git clone https://github.com/your-username/your-repo.git
$ cd your-repo
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Hotel Chain Management with NestJS

This project implements a hotel chain management application using NestJS. The application meets the main requirements for hotel management, including creating, searching, updating, and deleting hotels. Additionally, it includes user registration modules, authentication with guards to protect certain parts of the controllers, and user roles such as employees, users, administrators, and developers.

### Project Structure

The project is structured as follows:

```
project/
├── nestjs_project/
│   ├── Front-end/
│   │   ├── html/
│   │   │   ├── register.html
│   │   │   └── login.html
│   │   └── css/
│   │       └── styles.css
│   ├── src/
│   │   ├── develop/
│   │   │   ├── authenticate/
│   │   │   │   ├── controller/
│   │   │   │   ├── dtos/
│   │   │   │   ├── guard/
│   │   │   │   ├── jwt/
│   │   │   │   ├── service/
│   │   │   │   ├── types/
│   │   │   │   └── auth.module.ts
│   │   │   ├── decorators/
│   │   │   ├── persistence/
│   │   │   │   └── database.connection.ts
│   │   │   └── shared-modules/
│   │   ├── hotels-modules/
│   │   │   ├── user/
│   │   │   │   ├── controller/
│   │   │   │   ├── dtos/
│   │   │   │   ├── service/
│   │   │   │   └── entities/
│   │   │   └── admin/
│   │   │       ├── controller/
│   │   │       ├── dtos/
│   │   │       ├── service/
│   │   │       └── entities/
│   │   ├── main.ts
│   │   └── app.module.ts
├── js/
│   ├── index.js
│   ├── product.js
│   ├── bankAccount.js
│   └── palindrome.js
├── package.json
├── tsconfig.json
└── README.md

```

#### Folder and File Description

- **Front-end/**: Contains HTML and CSS files for the user interface.
  - **html/**: Contains registration and login forms.
  - **css/**: Contains CSS styles for the user interface.

- **src/**: Contains the main logic of the application.
  - **develop/**: Development module including authentication.
    - **authenticate/**: Functionalities related to authentication.
      - **controller/**: Controllers to handle authentication-related requests.
      - **dtos/**: DTOs (Data Transfer Objects) to define the structure of transferred data.
      - **guard/**: Guards to protect routes and controllers.
      - **jwt/**: Functionalities related to JWT token generation and validation.
      - **service/**: Services to handle authentication logic.
      - **types/**: Custom data types.
      - **auth.module.ts**: NestJS authentication module.

  - **hotels-modules/**: Hotel management module.
    - **user/**: Functionalities related to users.
      - **controller/**: Controllers to handle user-related requests.
      - **dtos/**: DTOs to define the structure of user-related data.
      - **service/**: Services to handle business logic related to users.
      - **entities/**: Entity definitions for user-related database tables.

    - **admin/**: Functionalities related to administrators.
      - **controller/**: Controllers to handle administrator-related requests.
      - **dtos/**: DTOs to define the structure of administrator-related data.
      - **service/**: Services to handle business logic related to administrators.
      - **entities/**: Entity definitions for administrator-related database tables.

  - **main.ts**: Main entry point of the application.
  - **app.module.ts**: Main module of the application where main modules, controllers, and services are defined.

### Main Features

The application meets the following requirements:

- Creating, searching, updating, and deleting hotels.
- User registration with different roles: employees, users, administrators, and developers.
- User authentication with guards to protect certain parts of the controllers.
- Role-based authorization functionalities to allow or deny access to certain

 parts of the application based on the user's role.

### Installation and Execution

To install and run the application, follow these steps:

1. Clone the repository from GitHub.
2. Navigate to the project folder.
3. Install dependencies with `npm install`.
4. Run the application with `npm start`.

Make sure you have Node.js and npm installed on your system before running the application.

### Contributions

Contributions are welcome. If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add a new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.


## Stay in touch

- Author - [Cristian manco](https://github.com/cristianManco)

### License

Nest is [MIT licensed](LICENSE).

