import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ITodos,
  ITodosPageNumber,
  ITodosResponse,
} from "@/app/_interfaces/responses/ITodosResponse";
import todosService from "./todosService";
import { IPagination } from "@/app/_interfaces/requests/IPagination";
import { IPostTodos } from "@/app/_interfaces/requests/IPostTodos";

const initialState: ITodos = {
  todos: [],
  todosLength: 0,
  page: 0,
};

// Get Todos (Will Considerable to Use If needs All 200 Data)
//Get Todos
// export const getTodos = createAsyncThunk("todos/get", async (_, thunkAPI) => {
//   try {
//     return await todosService.getTodos();
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

//Get Limit Todos
export const getLimitTodos = createAsyncThunk(
  "todos/get/limit",
  async (payload: IPagination, thunkAPI) => {
    try {
      return await todosService.getLimitTodos(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Get Limit Todos Per Page
export const getLimitTodosPerPage = createAsyncThunk(
  "todos/get/limit/page",
  async (payload: string | number, thunkAPI) => {
    try {
      return await todosService.getLimitTodosPage(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Post Todos
export const postTodos = createAsyncThunk(
  "todos/post",
  async (payload: IPostTodos, thunkAPI) => {
    try {
      return await todosService.postLimitTodosPage(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setGetTodos: (state, action) => {
      state.todos = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Todos (Will Considerable to Use If needs All 200 Data)
      //Get Todos
      // .addCase(getTodos.pending, (state, action) => {})
      // .addCase(getTodos.fulfilled, (state, action: any) => {})
      // .addCase(getTodos.rejected, (state, action) => {})

      //Get Limit Todos
      .addCase(getLimitTodos.pending, (state, action) => {})
      .addCase(getLimitTodos.fulfilled, (state, action: any) => {
        state.todosLength = action.payload.data.length;
      })
      .addCase(getLimitTodos.rejected, (state, action) => {})

      //Get Limit Todos Per Page
      .addCase(getLimitTodosPerPage.pending, (state, action) => {})
      .addCase(getLimitTodosPerPage.fulfilled, (state, action) => {})
      .addCase(getLimitTodosPerPage.rejected, (state, action) => {})

      //Get Limit Todos Per Page
      .addCase(postTodos.pending, (state, action) => {})
      .addCase(postTodos.fulfilled, (state, action) => {})
      .addCase(postTodos.rejected, (state, action) => {});
  },
});

export const { setGetTodos, setPage } =
  todosSlice.actions;

export default todosSlice.reducer;
