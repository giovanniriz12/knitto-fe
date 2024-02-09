import { ZodType, z } from "zod";
import { IPostTodos } from "../_interfaces/requests/IPostTodos";

export const postTodoSchema: ZodType<IPostTodos> = z.object({
  title: z.string(),
  body: z.string(),
  userId: z.string(),
});
