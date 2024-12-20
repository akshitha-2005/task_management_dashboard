import { Component } from '@angular/core';
import { TasksModule } from './features/tasks/tasks.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TasksModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-management-dashboard';
}
