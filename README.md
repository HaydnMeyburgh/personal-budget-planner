# Personal Budget Planner API

I am currently in the process of building a frontend for this to see how the API would be consumed and try to get an understanding from a users perspective while at the same time using React.


This REST API allows you to create budget envelopes with a title and amount. You can also create transactions that are associated to an envelope where the transaction amount will be removed from the budget to keep budget totals updated. All of this is stored and managed on a database.

---

The API is written in Javascript using:
- Node
- Express

The database is built and queryed using:
- Postgresql

---

- Download or clone the repo.
- Run `npm install` to install packages.
- Run `node server.js` to start the server.
- use CURL or postman to see the API in action.
- Refer to the Documentation to see the URIs and how to use the API.

## Documentation

The API is documented through Swagger and can be viewed at [http://localhost:3000/api/docs/](http://localhost:3000/api/docs/) once the server is running.

## Additional Notes

This was really fun to build for my first proper go with backend development. There are still some things I need to work on, but to have this completed and working feels amazing. I think I can refactor some of the codebase just to make it less repetitive and easier to read and follow a long.