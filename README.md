# Group 21
COSC 4353 Group 21 Spring 2024 Group Project

Members: Thien Pham, Ilan Lipsky, Russell Farinha, Rachel Collier

# Specifications

### Frontend, Backend, Database
- [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com), [MySQL](https://www.mysql.com)

# Setting Up

1. Clone the repository: `https://github.com/COSC4353-Group21/Group21`

2. Install [Git](https://git-scm.com/) and [Visual Studio Code](https://code.visualstudio.com/download).

## Setting Up the Database

3. **Install and Set Up MySQL**:
   - Install [MySQL](https://www.mysql.com).
   - Execute `backend/db/schema.sql` to initialize the database using the command line:
     ```bash
     cd backend/db
     mysql -u root -p < schema.sql
     ```
   - Enter the password to connect to the database.

4. **Configure the Backend**:
   - Modify the `backend/.env` file to connect to the database:
     ```sql
     MYSQL_HOST=127.0.0.1
     MYSQL_PORT=3306
     MYSQL_USER=root
     MYSQL_PASSWORD=password
     MYSQL_DB=cosc4353group21
     ```

## Setting Up the Backend and Frontend

5. **Install NPM Package Dependencies**:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd ../backend
     npm install
     ```

## Running the Application in Testing and Development Mode

6. **Start the Frontend Development Server**:
   - Run the development server in the frontend:
     ```bash
     npm start
     ```
   - This will start the development server and open it in the browser.

7. **Run Tests**:
   - For frontend tests:
     ```bash
     cd frontend
     npm test
     ```
   - For backend tests:
     ```bash
     cd backend
     npm test
     ```
   - To generate a code coverage report:
     ```bash
     cd backend
     npm test -- --coverage
     ```

8. **Test Your Application**:
   - Visit `http://localhost:3000` in your browser.
   - Ensure backend routes are functioning correctly, and frontend communication with the backend is successful.
   - Review the terms and conditions for our website ;)
