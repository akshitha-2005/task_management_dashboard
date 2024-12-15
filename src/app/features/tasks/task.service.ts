import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  status: 'Pending' | 'Completed' | 'Inprogress';
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [ 
    { id: 1, title: 'Fix Bug #123', description: 'Resolve critical issue in code.', priority: 'High', dueDate: new Date('2024-12-20'), status: 'Pending' }, 
    { id: 2, title: 'Write Report', description: 'Complete quarterly analysis report.', priority: 'Medium', dueDate: new Date('2024-12-18'), status: 'Completed' }, 
    { id: 3, title: 'Update Docs', description: 'Update API documentation.', priority: 'Low', dueDate: new Date('2024-12-22'), status: 'Inprogress' },
    { id: 4, title: 'Plan Sprint', description: 'Prepare sprint backlog.', priority: 'Medium', dueDate: new Date('2024-12-15'), status: 'Pending' },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
    } else {
      this.tasks.push(updatedTask);
    }
  }

  deleteTask(taskId: number): void {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }
}
