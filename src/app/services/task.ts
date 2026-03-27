import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../models/todo.model';
import { RefreshTasksParams, AddTaskParams, TaskIdParam } from '../types/todoTaskService';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CategoryService } from './category';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _storage: Storage | null = null;

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private filterSubject = new BehaviorSubject<string | null>(null);

  public filteredTasks$: Observable<any[]> = combineLatest([
    this.tasksSubject.asObservable(),
    this.filterSubject.asObservable(),
    this.categoryService.categories$
  ]).pipe(
    map(([tasks, filter, categories]) => {
      const filtered = filter
        ? tasks.filter(task => task.categoryId === filter)
        : tasks;

     
      return filtered.map(task => {
        const category = categories.find(c => c.id === task.categoryId);
        return {
          ...task,
          categoryName: category ? category.name : 'Sin categoría',
          categoryColor: category ? category.color : '#3880ff'
        };
      });
    })
  );

  public currentFilter$ = this.filterSubject.asObservable();

  constructor(private storage: Storage, private categoryService: CategoryService) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    const storedTasks = (await this._storage.get('tasks')) || [];
    this.tasksSubject.next(storedTasks);
  }

  setFilter(categoryId: string | null) {
    this.filterSubject.next(categoryId);
  }

  getTasksValue(): Task[] {
    return this.tasksSubject.value;
  }

  async refreshTasks({ tasks, type }: Readonly<RefreshTasksParams>): Promise<void> {
    this.tasksSubject.next(tasks);
    try {
      await this._storage?.set(type, tasks);
    } catch (e) {
      console.error("Error guardando en memoria física", e);
    }
  }

  async addTasks({ title, categoryId }: Readonly<AddTaskParams>): Promise<void> {
    const currentTasks = this.getTasksValue();
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      categoryId,
      createdAt: Date.now()
    };
    const updatedTasks = [newTask, ...currentTasks];
    await this.refreshTasks({ tasks: updatedTasks, type: 'tasks' });
  }

  async deleteTask({ id }: Readonly<TaskIdParam>): Promise<void> {
    const updatedTasks = this.getTasksValue().filter(t => t.id !== id);
    await this.refreshTasks({ tasks: updatedTasks, type: 'tasks' });
  }

  async toggleTask({ id }: Readonly<TaskIdParam>): Promise<void> {
    const updatedTasks = this.getTasksValue().map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    await this.refreshTasks({ tasks: updatedTasks, type: 'tasks' });
  }
}