
# Personal Budget Planner API

An API that allows you to create, update, and delete budget envelopes as well as envelope transactions when you spend money. You can also create transfers if you want to transfer a budget from one envelope to another. When a transaction is created, the amount "paid" for the transaction is deducted off of the corresponding envelope for which the transaction is related to so that envelope budgets are kept up to date as more transactions are made - The same is done if a transaction amount is adjusted or updated, the corresponding budget is adjusted based on the changed transaction amount.

<details>
<summary><h2>Recently Added to project!</h2></summary>
<br>
I recently added onto the project by building a frontend in React to see how the API could potentially be utilised within a project. I also think it gives a nice understanding of how the API works. For ease I included the frontend into this repository, but the main focus is still the API.

I decided to host the frontend on Netlify and the server and database on Railway as both are easy to setup and offer really good free options for hosting which is great for me right now (Not to mention the incredible ease, and speed, of spinning up a Postgres database on Railway).
</details>

## Table of Contents
<!--ts-->
   * [Demo](#demo)
   * [Tech Stack](#tech-stack)
   * [Documentation](#documentation)
   * [Run Locally](#run-locally)
   * [API Reference](#api-reference)
<!--te-->

## Demo

You can see the API in action [here](https://personal-budget-planner.netlify.app/), where I tried to replicate how i see it being used in a client environment.

## Tech Stack

**Server:** Node, JavaScript, Express

**Database:** Postgres

**Client:** React, JavaScript, CSS (For reference to the demo client I built)

## Documentation

View the API [Documentation](https://budget-planner-api.up.railway.app/docs/)


## Run Locally
NOTE: The client folder is part of the repo so you can remove it as the API is not dependant on it.

Clone the project

```bash
  git clone https://github.com/HaydnMeyburgh/personal-budget-planner.git
```

Go to the project directory

```bash
  cd personal-budget-planner/api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash                           
  npm run start
```

## API Reference
### **Envelopes**
#### Get all envelopes

```http
  GET /envelopes
```

#### Get envelope

```http
  GET /envelopes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** - Id of envelope to fetch |

#### Create envelope

```http
  POST /envelopes
```

| Body Object | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required** - title of envelope |
| `budget`      | `numeric` | **Required** - budget amount |

#### Delete envelope

```http
  DELETE /envelopes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** - Id of envelope to delete |

#### Update envelope

```http
  PUT /envelopes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** - Id of envelope to update/change|

| Body Object | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required** - title of envelope |
| `budget`      | `numeric` | **Required** - budget amount |

#### Transfer budget from one envelope to another

```http
  POST /transfer
```

| Body Object | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `fromId`      | `integer` | **Required** - Id of from envelope |
| `toId`      | `integer` | **Required** - Id of to envelope |
| `amount`      | `numeric` | **Required** - amount to transfer |


### **Envelope Transactions**

#### Get transactions specific to an envelope

```http
  GET /envelopes/${id}/transactions
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** - Id of envelope for which transactions to get|

### **Transactions**

#### Get all transactions

```http
  GET /transactions
```
#### Get transaction

```http
  GET /transactions/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** - Id of transaction to fetch|

#### Create transaction

```http
  POST /transactions
```

| Body Object | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `recipient`| `string` | **Required** - recipient of transaction |
| `amount`| `numeric` | **Required** - amount paid |
| `date` | `date` | **Required** - date of transaction |
| `envelope_id` | `integer` | **Required** - related envelope for which the budget will be adjusted |

#### Update transaction

```http
  PUT /transactions/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** - Id of transaction to update/change|

| Body Object | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `recipient`| `string` | **Required** - recipient of transaction |
| `amount`   | `numeric` | **Required** - amount paid |
| `date`     | `date` | **Required** - date of transactions |

#### Delete transaction

```http
  DELETE /transactions/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required** - Id of transaction to delete |

