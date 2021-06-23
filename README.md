## Nomadcoffee

NomadCoffee shares cafe information include location, photo, and categories.

### Assigments

#### NomadCoffee Server

- [x] Assignment 1: #3.0 to #3.12
- [x] Assignment 2: #4.0 to #4.2
- [x] Assignment 3: #4.3 to #4.19 (May 29, 2021 6:00 AM (KST))
- [x] Assignment 4: #4.20 to #4.29 (June 1, 2021 6:00 AM (KST))
- [x] Assignment 5: #6.0 to #6.10 (June 3, 2021 6:00 AM (KST))
- [x] Assignment 6: #19.0 to #19.7 (June 4, 2021 6:00 AM (KST))

#### NomadCoffee Web Client

- [x] Assignment 7: #8.0 to #8.9 (June 5, 2021 6:00 AM (KST))
- [x] Assignment 8: #10.0 to #10.14 (June 9, 2021 6:00 AM (KST))
- [x] Assignment 9: CRUD on Web App (June 11, 2021 6:00 AM (KST))
- [x] Assignment 10: #19.5 (June 12, 2021 6:00 AM (KST))

#### NomadCoffee Mobile Client

- [x] Assignment 11: #13.4 to #13.7 (June 15, 2021 6:00 AM (KST))
- [x] Quiz 1: #13.0 to #13.3 (June 16, 2021 6:00 AM (KST))
- [x] Assignment 13: #14.0 to #15.4 (June 19, 2021 6:00 AM (KST))
- [x] Assignment 14: #15.0 to #15.13 (June 24, 2021 6:00 AM (KST))

### Task 1

- On this challenge we are going to build a whole project from start to finish named **Nomad Coffee**.
- On this two day assignment we will set up our project.
- Create a Github Repository named 'nomadcoffee-backend'.
- Set up a Prisma project.
- The project should follow the architecture outlined on the video (.typeDefs.js , .resolvers.js).
- Use babel, nodemon and dotenv

### Task 2

**Nomad Coffee** will be an app where developers can go and find the best caffes to work from in 한국!!

On your `schema.prisma` let's create the User model, the model must have the following fields:

- id
- username
- email
- name
- location
- password
- avatarURL
- githubUsername

After you are done, make a createAccount resolver.

`createAccount` should:

- Create a user
- Hash the password
- Check that the username / email aren't taken
- Return `ok:true` or `ok:false, error:$error` if there is an error.

### Task 3

Now it's time to create the following resolvers:

- `editProfile`: Change the user's profile, this includes changing password and changing the avatarURL.
- `login`: Log the user in by returning a JWT or return an error in case the password is wrong.
- `seeProfile`: See any users profile.

You will also have to write some code to protect your resolvers and inject the logged in user to the resolver's context.

### Task 4

- Implement **Follow** / **Unfollow** functionality.
- Implement `followers` & `following` computed fields with pagination on the `seeUser` resolver (No extra resolvers).
- Implement `searchUsers` resolver.

### Task 5

#### Models

- Create a `Category` model with a _relationshops_ to `CoffeeShop`
- Create a `CoffeeShop`u model with a _relationship_ to the `User` that created the `CoffeeShop` and _relationships_ to `Category`
- Create a `CoffeeShopPhoto` model with a _relationship_ to the `CoffeeShop`

The new models will also have other fields, here is how the graphql schema should look like (you need to also add them on prisma)

```graphql
type CoffeeShopPhoto {
    id:     Int
    url:    String
    shop:   CoffeeShop
}
type CoffeeShop {
    id:         Int
    name:       String
    latitude:   String
    longitude:  String
    user:       User
    photos:     [CoffeeShopPhoto]
    categories: [Category]
}
type Category {
    id:     Int
    name:   String
    slug:   String
    shops:  [CoffeeShop]
    totalShops: Int (computed)
}
```

#### Resolvers

Create the following resolvers: `createCoffeeShop`, `seeCoffeeShops`, `seeCoffeeShop`, `seeCategory`, `seeCategories`, `editCoffeeShop`

- `createCoffeeShop` should create a `CoffeeShop`, it should create a `Category` **if it does not exist** (the same way we created Hashtags on #6.4 and should upload and create a `CoffeeShopPhoto` for each uploaded file.
- `seeCoffeeShops` should list all the `CoffeeShop` with **pagination**.
- `seeCoffeeShop` should get a `CoffeeShop` by `id`.
- `seeCategory` should list all the `CoffeeShop` inside of a `Category` with **pagination**.
- `seeCategories` should list all the `Category` and should have a `totalShops` **computed field** that counts all the `CoffeeShop` inside of the `Category`, it should also have **pagination**
- `editCoffeeShop` should edit a `CoffeeShop`

### Task 6

We are finished with the backend! Following the lectures of the section #19 deploy your backend to Heroku. You will also have to configure a PostgreSQL Database.

**Make sure you select only the free versions of Database and Servers**

### Task 7

Today is friday so this assignment will be short!

- Create a new Github Repository called `nomadcoffee-frontend`
- Set up a React Application using CRA
- Set up an Apollo Client
- Set up `react-router`
- Set up `styled-components`
- Set up `reactive variables` on Apollo Client to enable `dark mode` and `authentication`

### Task 8

In our **Nomad Coffee** the coffee shop owner will have a web admin panel.

Your task is to implement **sign up** and **login**!

### Task 9

- Make a CRUD of Coffee Shops.
- `/`: show the user all the coffee shops that they have created.
- `/add`: show the user a form to create a shop.
- `/shop/:id`: show the user a form to edit a shop, or a button to delete the shop.

### Task 10

Deploy your frontend to Netlify!

### Task 11

- Create a React Native project using `expo-cli`
- Write the code to preload fonts and images.
- Preload `Ionicons`

### Quiz 1

- Take a quiz about `Expo` and `React Native CLI`

### Task 13

- Make a **Tab** navigation for the app (no need to log in)
- The Tabs should be: `home`, `search` and `profile`
- Set up Apollo Client (with Authentication logic) to be able to log the user in.
- When the user goes to `profile` the user should see a **login** form.
- After the user logs in, show the profile of the user.

The goal is to be able to use the app even if we are logged out, to see coffees shops, but if we log in, we can see our profile.

### Task 14

Today we are gonna make the Home tab. The Home tab should show all the coffee shops in your Database.

The features you have to implement are:

- Infinite Scroll
- Pull to Refresh

The Coffee Shop component should display the name, photos and categories.
