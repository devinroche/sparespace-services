# :house: sparespace services :house:

This is the backend repository for [sparespace](https://github.com/devinroche/sparespace). sparespace is a senior project developed by a group of gonzaga students. We have attempted to follow REST api practices. 

## Prerequisites
Make sure you have the things installed below!

- [Node](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

Or use homebrew!
```brew install node```
and 
```brew install mongodb```

## Running Stuffs

### The application
```
npm install
npm start
```

### The test
```
npm test
```

### The linter
```
npm run lint
```

### The lint fixer (fixes *some* linter errors)
```
npm run lint-fix
```

## API
**Get all users**: 
```
.get('localhost:3001/users')
```

**Create new user**: 
```
.post('localhost:3001/users', {
	fullname: 'Devin Roche',
	password: 'fart',
	contact: {
		email: 'foo@email.com',
		phone: '123-456-7890',
	},
	userType: 'host'
})
```
**get a single user**
```
.get('localhost:3001/user/:id')
```
**edit user info**
```
.put('localhost:3001/user/:id', {
	any field you want to edit goes here
})
```
**new listing**
```
.post('localhost:3001/u/listing', {
	"_host": "123455786",
	"title": "This storage rocks!",
	"duration": "1 billion years",
	"description": "u rly wanna put ur stuff here it rox"
})
```

**Login**: 
returns 200 if username and password are valid, 400 if not.
```
.post('localhost:3001/login', {
    "username":"fart",
    "password": "password"
})
```