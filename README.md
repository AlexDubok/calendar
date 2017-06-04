# calendar
Offline-first calendar app.

### 1. Launching the project 

1. Open `/dist/index.html` in the latest Chrome.

### 2. Usage

- On the default week view you can create, edit or update your tasks.
    - To create a new task, click on the "New" button or on the specific timeframe on the table.
    - To edit or delete, hover mouse over the task and click "edit" or "delete".
- You can navigate between different views (week, month, year).
- To return to the current date, click "Today".
- All data is persisted in Local storage.
- Service worker caches app files so that the app can work offline.

### 3. Development mode

1. `npm install`
2. `npm start`
3. Open http://localhost:3000 in the latest Chrome.


#### Technologies used
- Client: React, Redux, ES6, Service workers
