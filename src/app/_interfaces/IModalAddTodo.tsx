import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { IPostTodosResponse } from "./responses/ITodosResponse";
import { IPostTodos } from "./requests/IPostTodos";

export interface IModalAddTodo {
  loading: boolean;
  success: IPostTodosResponse | undefined;
  errors: FieldErrors<IPostTodos>;
  handleSubmit: UseFormHandleSubmit<IPostTodos, IPostTodos>;
  onSubmit: (data: IPostTodos) => void;
  onError: (errors: FieldErrors<IPostTodos>) => void;
  register: UseFormRegister<IPostTodos>;
  onReset: () => void;
  watch: UseFormWatch<IPostTodos>;
}
