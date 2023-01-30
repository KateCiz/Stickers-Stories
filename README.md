# Stickers & Stories
**Stickers-and-Stories-Project** is a site similar to [Etsy](https://www.etsy.com/), an ecommerce site that allows users to both purchase items and to sell them.
**Stickers-and-Stories-Project** mirrors the base frontend and backend functionality of Etsy.

## Live site
[Open Stickers-and-Stories-Project](https://stickersandstories.onrender.com/)

## Technologies Used
### Frontend
* Javascript
* React
* Redux
* React Icons
### Backend
* PostgreSQL
* Python
* Flask
* SQLAlchemy

## To Get Started...
1. Clone the repository
```
git clone https://github.com/KateCiz/Stickers-and-Stories-Project.git
```

2. Install python dependencies
```
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```

3. Create a `.env` file based on the example provided

4. Setup your PostgreSQL credentials and database according to the variables set in .env

5. Active your pipenv then run the following command to open shell
```
pipenv shell
```

6. Migrate the database
```
flask db upgrade
```

7. Seed the database
```
flask seed all
```

8. Run the flask app
```
flask run
```

9. Navigate to `react-app`

10. Install dependencies
```
npm install
```

11. Start the frontend server
```
npm start
```

The application will now be running at http://localhost:3000/

# CRUD Features

## User
    On the site a user can:
        - Log in
        - Sign up
        - Browse for items
        - Use the DEMO USER login

## Stores
    As a logged in user you can:
        - Create a new store
        - View your store and those created by others
        - Edit your store
        - Delete your store

## Items
    As logged in user you can:
        - Create new items
        - View your items and those created by others
        - Edit your items
        - Delete your items
        
## Reviews
    As logged in user you can:
        - Create new reviews for items
        - View your reviews and those created by others
        - Delete your items


## Features

### Splash Page
#### <img width="545" alt="image" src="https://res.cloudinary.com/dymmlu1dw/image/upload/v1670546069/Stories%20%2B%20Stickers/stickers_stories-splash-page_lgwzvj.png">

### Sign Up Modal
#### <img width="545" alt="image" src="https://res.cloudinary.com/dymmlu1dw/image/upload/v1670546083/Stories%20%2B%20Stickers/stickers_stories-sign-up_ogqgo5.png">

### Store Page
#### <img width="545" alt="image" src="https://res.cloudinary.com/dymmlu1dw/image/upload/v1670546089/Stories%20%2B%20Stickers/stickers_stories-store-page_gqvjkj.png">

* View an item
#### <img width="545" alt="image" src="https://res.cloudinary.com/dymmlu1dw/image/upload/v1670546077/Stories%20%2B%20Stickers/stickers_stories-full-item-page_vsaihm.png">


# Future Features

This site is still being updated and completed, these features will be available in the future...

-  Make reviews updatable
-  Cart CRUD and checkout
-  add a search bar to search for items
-  Pagination for Feeds
