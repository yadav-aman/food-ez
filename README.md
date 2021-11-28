## CSD-345, Software Development lab Project

---

# Project Name - Food Ez

### Contactless of food ordering and inventory management

---

## Technologies Used

- [FastAPI (Python Framework)](https://fastapi.tiangolo.com/)
- [SQLite Database](https://www.sqlite.org/index.html)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [React JS](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Top Level Directory Layout

```
.
├── client          # Frontend
├── server          # Backend
└── README.md
```

---

## How to run the app

### Running server -

> For this python>= 3.8 is required

## Open terminal and run the following commands

- ### Installing Dependencies
  ```bash
  $ cd server
  $ pip install -r requirements.txt
  $ cd ..
  ```
- ### Setting up environment secret key (for encryption)

  ```
  $ touch env.py
  $ openssl rand -hex 32
    24fc0024fa7314a87e8591d6758b860932de20de65294ab89fb3836332bc9c73
  ```

  > Copy the generated key inside env.py file, in the same format as given in env.example.py file

- ### Starting the server

  ```
  $ python3 server/main.py
  ```

- Now the server is hosted at localhost:8000, and the API documentation along with all the end points can be accessed at [localhost:8000/docs](http://localhost:8000/)

### Running Frontend -

> For this node and npm is required

Open new terminal and run the following commands

```bash
$ cd client
$ npm i
$ npm start
```

- Now we can access our app on [localhost:3000](http://localhost:3000)
