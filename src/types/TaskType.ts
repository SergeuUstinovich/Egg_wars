export interface TaskType {
  task: {
    id: number;
    name: string;
    dop_name: string;
    task_type: string;
    condition_type: null;
    condition_value: 0;
    reward_currency: 30000;
    chest: false;
    picture: {
      id: number;
      name: string;
      image: string;
    };
  };
  id: number;
  start_time: null;
  completed: boolean;
}

export interface TasksScheme {
  taskUser: TaskType[];
}
