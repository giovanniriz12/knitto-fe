import axios from "axios";
import {
  IPostTodosResponse,
  ITodosPageNumber,
  ITodosResponse,
} from "@/app/_interfaces/responses/ITodosResponse";
import { IPagination } from "@/app/_interfaces/requests/IPagination";
import { IPostTodos } from "@/app/_interfaces/requests/IPostTodos";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Get Todos (Will Considerable to Use If needs All 200 Data)
// const getTodos = async () => {
//   const res = await axios.get<ITodosResponse>(`${API_BASE_URL}/todos`);
//   return res;
// };

// Get Todos Limit
const getLimitTodos = async (startAndLimit: IPagination) => {
  const res = await axios.get<ITodosResponse>(
    `${API_BASE_URL}/todos?_start=${startAndLimit.start}&_limit=${startAndLimit.limit}`
  );
  return res;
};

//Still On Going (SSR Method)
// export const getLimitTodosProps = (async (context) => {
//   const res = await fetch(`${API_BASE_URL}/todos?_start=${0}&_limit=${10}`);
//   const data: ITodosResponse = await res.json();
//   console.log('data', data);
  

//   return { props: { data } };
// }) satisfies GetServerSideProps<{ data: ITodosResponse }>;

// Get Todos Limit Page
const getLimitTodosPage = async (pageNumber: string | number) => {
  const res = await axios.get<ITodosResponse>(
    `${API_BASE_URL}/posts?_page=${pageNumber}`
  );
  return res;
};

// Post Todos
const postLimitTodosPage = async (payload: IPostTodos) => {
  const res = await axios.post<IPostTodosResponse>(
    `${API_BASE_URL}/posts`,
    payload
  );
  return res;
};

const todosService = {
  getLimitTodos,
  getLimitTodosPage,
  postLimitTodosPage,
};

export default todosService;
