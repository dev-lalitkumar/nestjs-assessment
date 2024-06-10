# Foobar

Here are the details of project

## Installation

Use the package manager [npm]() to install the dependencies.

```bash
npm install
```

## Environment Variables

```env
PORT=3000
JWT_SECRET="A Random String"

DB_HOST="localhost"
DB_PORT=3306
DB_NAME="nestjs-assessment"
DB_USERNAME="root"
DB_PASSWORD="root"
```

## API

```
[GET] http://localhost:3000/auth/login
---------------------------------------
Body:{
  "username": "candidate@gmail.com",
  "password": "password"
}
```
