export interface ITodosResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean | null;
}

export interface IPostTodosResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ITodos {
  todos: ITodosResponse[];
  todosLength: number;
  page: number | string;
}

export interface ITodosPageNumber {
  pagNumber: number | string;
}
