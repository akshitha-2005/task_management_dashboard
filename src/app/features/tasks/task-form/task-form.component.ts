import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  isLoading = false;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      id: [data?.id || null],
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required],
      priority: [data?.priority || '', Validators.required],
      dueDate: [data?.dueDate || '', Validators.required],
      status: [data?.status || 'Pending', Validators.required]
    });
  }
  
  onSubmit(): void { 
    if (this.taskForm.valid) { 
      this.isLoading = true; 
      const taskData = this.taskForm.value; 
      setTimeout(() => { 
        if (taskData.id) { 
          this.taskService.updateTask(taskData); 
        } else { 
          taskData.id = new Date().getTime(); 
          this.taskService.addTask(taskData); 
        } this.isLoading = false;
        this.dialogRef.close(taskData); 
       }, 2000);
      }
    }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
