
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

Instructions to Run the Project

1. Clone the Repository
git clone <https://github.com/akshitha-2005/task_management_dashboard.git>

2. Install Dependencies
Run `npm install`

3. Run the Application
Run `ng serve`. Navigate to `http://localhost:4200/`.

The project is task management application built with Angular and Angular Material. It allows users to manage tasks by adding, updating, and deleting them. The tasks are stored in memory, making the application lightweight and easy to run without a backend.

Add Task: Users can add new tasks with details like title, description, priority, due date, and status.

Edit Task: Existing tasks can be edited using the same form.

Delete Task: Tasks can be deleted with a confirmation dialog to prevent accidental deletions.

The application is structured with components like TaskListComponent, TaskFormComponent, and ConfirmDialogComponent, promoting modularity and maintainability.
Angular Material dialogs are used to add and edit tasks.
Angular Material's MatSnackBar is used to display notifications, enhancing user experience by providing immediate feedback.
