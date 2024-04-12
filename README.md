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

  The frontend and backend can run separately, or run in development mode together

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
   - Current code coverage:

     | File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                
     |---------------|---------|----------|---------|---------|-------------------------------------------------------------------
     | All files     | 79.13   | 80       | 86.11   | 79.42   |                                                                   
     | fuelquotes.js | 90      | 83.33    | 100     | 90      | 17,30,59,63                                                       
     | index.js      | 58.41   | 42.85    | 75      | 58.41   | 37-43,49-65,72-88,101,111-112,116,122,134,144-145,148,157,173-176 
     | knexClient.js | 100     | 100      | 100     | 100     |                                                                   
     | login.js      | 88.88   | 81.81    | 87.5    | 88.88   | 41,46,51,74,104,108,113-114                                       
     | pricing.js    | 100     | 87.5     | 100     | 100     | 19                                                                
     | profile.js    | 88.88   | 90.62    | 80      | 91.42   | 96,101-105                                                        
      
      Test Suites: 2 failed, 4 passed, 6 total

      Tests: 14 failed, 56 passed, 70 total

8. **Test The Application**:
   - Visit `http://localhost:3000` in your browser
   - Ensure backend routes are functioning correctly, and frontend communication with the backend is successful
   - Review the terms and conditions for our website ;)
