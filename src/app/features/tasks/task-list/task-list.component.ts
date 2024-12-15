import { ConfirmDialogComponent } from './../../../confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService, Task } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'priority', 'dueDate', 'status', 'actions'];
  filterValue: string = '';
  dataSource: MatTableDataSource<Task> = new MatTableDataSource(this.tasks);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService, 
    public dialog: MatDialog, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.dataSource = new MatTableDataSource(this.tasks);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => { 
      switch (property) { 
        case 'priority': return this.getPriorityValue(item.priority); 
        case 'dueDate': return new Date(item.dueDate).getTime(); 
        default: return (item as any)[property]; 
      }
    };
  }

  getPriorityValue(priority: string): number {
    switch (priority) {
      case 'High': return 3;
      case 'Medium': return 2;
      case 'Low': return 1;
      default: return 0;
    }
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: task ? { ...task } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.taskService.updateTask(result);
        } else {
          result.id = new Date().getTime(); 
          this.taskService.addTask(result);
        }
        this.refreshTaskList();
      }
    });
  }
 
  deleteTask(taskId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this task?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(taskId);
        this.refreshTaskList();
        this.snackBar.open('Task deleted successfully', 'Close', { 
          duration: 3000, 
          horizontalPosition: 'right', 
          verticalPosition: 'top', 
        });
      }
    });
  }  

  applyFilter(filterValue: string): void { 
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshTaskList(): void {
    this.tasks = this.taskService.getTasks();
    this.dataSource.data = [...this.tasks]; 
    this.applyFilter(this.filterValue);
  }
}