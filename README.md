# Challenge 3: Real-time order processing

## Overview

I took an approach to challenge three that I thought would be so easy it was almost cheating. Rather than use a sorting function to prioritize the orders, I split the orders into three groups: `overdue`, `today`, and `future` (although as I type this I believe there isn't a distinction between `overdue` and `today`). SQL makes it easy to order by "value", so I just set the `ORDER BY` to the desired function and selected orders from the retrieved groups until the number of desired orders was fulfilled.

## Pitfalls

I used SQLite with Node, a combination I had never used before. I thought it would be an easy way to get a database up and running quickly. It wasn't hard per se, but it lacked a lot of convenience functions, and I spent the first hour plus just messing with schemas and such. Once I got to actually writing the logic of the program things went fairly well.

## Future

I hope you will respect that I took it right up to the 2 hour mark, but I didn't want to "cheat" by continuing further. Things that are missing

- Testing - There is actually so little logic that isn't handled by the database, there doesn't need to be much testing here. But of course there should be some
- Validation - There is current **zero** validation of inputs, and therefore it will break if you don't provide it input in the expected form.

## Running

I have used `yarn`, but `npm` should work just as well. To get started clone the repo and then

```
yarn install
yarn start
```

This will create a blank database and run the server at `localhost:3000`. It will expose two routes:

### Add

`localhost:3000/orders/add`: The server expects a **POST** request to this URL with a JSON payload of an array of valid orders. E.g.

```
{
  "orders": [
    {
      "id": "13",
      "value": "high",
      "shipByDate": "2018-10-31"
    },
    {
      "id": "298",
      "value": "medium",
      "shipByDate": "2018-10-23"
    },
    {
      "id": "53",
      "value": "medium",
      "shipByDate": "2018-10-22"
    },
    {
      "id": "1114",
      "value": "low",
      "shipByDate": "2018-10-26"
    },
    {
      "id": "9",
      "value": "high",
      "shipByDate": "2018-10-25"
    }
  ]
}
```

### Retrieve

`localhost:3000/orders/retrieve`: The server expects a **POST** request to this URL with a JSON payload with a single property (`num`) representing the number of order to retrieve. E.g.

```
{
  "num": 3
}
```

## Goals (written prior to starting)

- ✅ Add orders via API route
- ✅ Retrieve correctly prioritized orders
  - ✅ Utilize a database to handle some of the sorting.
- ❌ Provide _some_ unit testing

## Stretch Goals

If everything went exceedingly well maybe I'd try

- ❌ Simple UI to add/retrieve orders
