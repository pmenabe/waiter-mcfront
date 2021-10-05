
# Waiter McFront

Waiter Mc Front is a PoC of a file dispatcher service for Chef Mc front.

With this service together with Chef Mc Front Service and the Chef Mc Front client application, the developer will be able to request the construction of micro-applications from other development teams according to specific commits of the version control system of each team. These buildings will be available only to him. In this way, each developer will be able to obtain a customized development environment.

## Requirements

- [Nodejs](https://nodejs.org/) (v10 and above)
- [MariaDB](https://mariadb.org/) or [MySQL](https://www.mysql.com/)

## Installation

```
$ git clone https://github.com/pmenabe/waiter-mcfront.git
$ cd waiter-mcfront
$ npm install
``` 

## Configuration

The configuration file is config.js and it is located in the root directory.

| Parámetro | Tipo | Default | descripción |
| :--------: | :--: | :-----: | :---------- |
|PORT|Integer|3002|Port from which the api service will listen|
|DATABASE|Object|{}|Entity of configuration of Database|
|DATABASE.HOST|String|null|Host of Database|
|DATABASE.NAME|String|null|Name of Database|
|DATABASE.USER|String|null|User of Database|
|DATABASE.PASS|String|null|Password of Database|
|BUILTS_PATH|String|null|Path to get builts|

 
## Run

In the root directory:

```
$ npm run start
```