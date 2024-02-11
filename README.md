# UrlShortener

[![NodeJs](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png)](https://nodejs.org/en/) [![React](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/220px-React-icon.svg.png)](https://reactjs.org/) 
[![SQLite](https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/220px-SQLite370.svg.png)](https://www.sqlite.org/)[![Next.js](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/220px-Nextjs-logo.svg.png)](https://nextjs.org/)
[![C8 Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](#)

## Tech
- [c8](https://github.com/bcoe/c8) - c8 is a command line tool for measuring code coverage using V8's built-in coverage feature.
- [node.js](https://nodejs.org/en/) - evented I/O for the backend
- [SQLite](https://www.sqlite.org/index.html) - SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- [Next.js](https://nextjs.org/) - The React framework for production.
- [Express] - fast node.js network app framework
- [Sequelize] - Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more
- [ESLint] - ESLint is an open source project that helps you find and fix problems in JavaScript code.
- [markdown-it] - Markdown parser done right. Fast and easy to extend.

## Setup

- To see coverage tests we need to install dependencies before, ensure that you are inside Backend folder.
```sh
  command npm install
```
and to run coverage tests
```sh
  command npm run coverage
```
- Before running the docker-compose file we need to have docker and docker-compose installled:

- to run the project, in the root of project run the command
```sh
  docker-compose up --build -d
```
- the Backend will start on
```sh
  http://localhost:3001
```
- the Frontend will start on
```sh
  http://localhost:3000
```
- Verify the deployment by navigating to your server address in
  your preferred browser.

- to stop application, in the root of project run the
```sh
  command docker-compose down
```

## Creating a User

To create a user, follow these steps:

    As soon as you run the command command docker-compose up --build.
    Open the frontend by navigating to http://localhost:3000.
    Click on the "Create User" button.
    Fill in the required information for the new user.
    Submit the form to create the user.

## Creating an Account

To create an account for a user, proceed as follows:

    Return to the main page after creating the user.
    Click on "Create Account".
    Select the desired user from the dropdown menu.
    Specify the account type and initial amount.
    Submit the form to create the account.

## Checking Account Balances

To check account balances, follow these steps:

    Navigate back to the main page.
    Click on "Balance".
    Select the user from the dropdown menu to view their account balances.

## Performing a Deposit

To deposit funds in a specific account, perform the following steps:

    Return to the main page.
    Click on "Deposit".
    Select the user initiating to deposit.
    Choose the account.
    Specify the deposit amount.
    Click on the "Deposit" button to complete the transaction.

## Performing a Transfer
    

To transfer funds between accounts, perform the following steps:

    Return to the main page.
    Click on "Transfer".
    Select the user initiating the transfer.
    Choose the sender account and recipient account.
    Specify the transfer amount.
    Click on the "Transfer" button to complete the transaction.

## Viewing Updated Balances

After performing a transfer, follow these steps to view the updated account balances:

    Return to the main page.
    Click on "Balance" again to see the latest balances for all accounts associated with the selected user.
`
## Tip
  - In the file Frontend/src/pages/transfer.js, you can observe both server-side and client-side fetching calls.
  
## Critique

- Database may be a problem because it has a max number of connections.
- How this project was made with docker containers it was made to fit scaling.
