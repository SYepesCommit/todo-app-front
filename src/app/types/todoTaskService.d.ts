
import { Task, Category } from '../models/todo.model';

export interface RefreshTasksParams {
  tasks: Task[];
  type: string;
}

export interface AddTaskParams {
  title: string;
  categoryId: string;
}

export interface TaskIdParam {
  id: string;
}