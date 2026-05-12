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