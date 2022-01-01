# Running locally

- Clone the repository
- Run `yarn` to install all app dependencies
- Add .env (refer example file)
- `yarn dev`

# Try it out live

The app is hosted on heroku. https://still-ravine-52402.herokuapp.com/

### Request

Path: /v1/records
Method: Post
Request data should be url-encoded or JSON. All fields are required.

```
{
    "startDate" // string date in yyyy-mm-dd format
    "endDate" // string date in yyyy-mm-dd format
    "minCount" // number - integer
    "maxCount" // number - integer
}
```

### Example Response

```
{
    "code":0,
    "msg":"Success",
    "records":[
        {
            "key":"TAKwGc6Jr4i8Z487",
            "createdAt":"2017-01-28T01:22:14.398Z",
            "totalCount":2800
        },
        {
            "key":"NAeQ8eX7e5TEg7oH",
            "createdAt":"2017-01-27T08:19:14.135Z",
            "totalCount":2900
        }
    ]
}

```

### Example Error Response

```
    {
        "code": 1, // http status code will vary
        "msg": "Description of what you did wrong",
        "records": []
    }
```

Note: Application level errors will be handled differently and return 500 response.

# Testing

- To run the tests, simply type `npm test`
- We can also get code coverage by `npm run coverage`
