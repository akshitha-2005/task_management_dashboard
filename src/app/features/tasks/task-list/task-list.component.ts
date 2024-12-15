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
    this.dataSource.data = this.taskService.getTasks();
  }
  ngAfterViewInit(): void {
    const priorityOrder: { [key: string]: number } = { Low: 1, Medium: 2, High: 3 };
  
    this.dataSource.sortingDataAccessor = (data, header) => {
      switch (header) {
        case 'priority':
          return priorityOrder[data.priority as keyof typeof priorityOrder] || 0;
        case 'dueDate':
          return new Date(data.dueDate).getTime(); 
        default:
          return (data as any)[header] || ''; 
      }
    };
  
    this.dataSource.sort = this.sort;
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

  getRowClass(task: Task): string {
    switch (task.status) {
      case 'Pending':
        return 'Pending';
      case 'Inprogress':
        return 'Inprogress';
      case 'Completed':
        return 'Completed';
      default:
        return '';
    }
  }
}
