# Lyrid Node.js

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/muh-arga/lyrid-nodejs.git
    ```

2. Navigate to the project directory:
    ```bash
    cd lyrid-nodejs
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your database credentials and other necessary configurations.


## Running the Application
1. Run Migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```

2. Run seeders:
    ```bash
    npx sequelize-cli db:seed:all
    ```

3. Start development server:
    ```bash
    npm run dev
    ```
    The application will be running at `http://localhost:3000` (or the PORT you set in the `.env` file).


## Credentials
- Admin User:
    - username: admin
    - password: admin123

- Regular User:
    - username: user
    - password: user123


## Packages Used
- `express`: Web framework for Node.js
- `sequelize`: ORM for database interactions
- `bcrypt`: Library for hashing passwords
- `multer`: Middleware for handling file uploads
- `dotenv`: Module to load environment variables from a `.env` file
- `mysql2`: MySQL client for Node.js
- `ejs`: Embedded JavaScript templating engine