import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { TasksModule } from './features/tasks/tasks.module';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskListComponent } from './features/tasks/task-list/task-list.component';
// import { TaskFormComponent } from './features/tasks/task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
    TasksModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-management-dashboard';
}
