# calendar
Offline-first calendar app.

### 1. Launching the project 

1. Open `/dist/index.html` in latest Chrome.

### 2. Usage
    - On the default week view you can create, edit or update your tasks.
        - Creating new task by clicking on the "New" button or on the specific timeframe on the table.
        - To edit of delete, hover mouse over the task and click "edit" or "delete".
    - You can navigate between different views (Week, Month, Year).
    - To return to the current date, click "Today".
    - All data persists in Local storage.
    - Service worker will cache app files so the app could work offline.

### 3. Development mode

1. `npm install`
2. `npm start`
3. Open http://localhost:3000 in latest Chrome.

### 4. Running tests

1. `npm test`


#### Technologies used
- Client: React, Redux, ES6, Service workers
