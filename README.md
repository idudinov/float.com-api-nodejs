# [Float.com](https://dev.float.com/) API wrapper for Node.js

Non-official package, developed by enthusiasts.

## Usage

For now, install it directly via Github link:

```
yarn add git+https://github.com/idudinov/float.com-api-nodejs.git
```

```typescript
import ApiClient from 'float.com-api';

const Client = new ApiClient({
    token: process.env.FLOAT_API_KEY // your token,
    userAgent: 'your client human-readable identification', // https://dev.float.com/overview_authentication.html#identify-yourself
});

const people = await Client.listPeople();

```


## Endpoints

* [List People](https://dev.float.com/api_reference.html#!/People/getPeople)

