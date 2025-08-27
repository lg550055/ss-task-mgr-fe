export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  owner_id: number;
}

export interface TaskCreate {
  title: string;
  description?: string;
  completed?: boolean;
}
