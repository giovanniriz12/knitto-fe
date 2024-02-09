"use client";

import { Fragment, useEffect, useState } from "react";
import {
  getLimitTodos,
  getLimitTodosPerPage,
  postTodos,
  setGetTodos,
  setPage,
} from "./_redux/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "@/app/_redux/store";
import { IPostTodosResponse } from "./_interfaces/responses/ITodosResponse";
import { IPagination } from "./_interfaces/requests/IPagination";
import { paginationRange } from "./_utils/paginationRange";
import { FieldErrors, useForm } from "react-hook-form";
import { IPostTodos } from "./_interfaces/requests/IPostTodos";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTodoSchema } from "./schemas/postTodoSchema";
import Todos from "@/components/Todos";
import Pagination from "@/components/Pagination";
import ModalAddTodo from "@/components/ModalAddTodo";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
// import todosService, { getLimitTodos } from "./_redux/todos/todosService";

export default function Home() {
  //Still On Going (SSR Method)
  //   data,
  // }: InferGetServerSidePropsType<typeof getLimitTodos>) {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const [limit, setLimit] = useState<number>(10);
  const [success, setSuccess] = useState<IPostTodosResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const page = useAppSelector((state) => state.todos.page);

  const totalPage = Math.ceil(100 / limit);
  const paginationData = paginationRange(totalPage, Number(page), limit, 1);

  const pagination: IPagination = {
    limit: limit,
    start: Number(page),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<IPostTodos>({
    resolver: zodResolver(postTodoSchema),
  });

  useEffect(() => {
    //Still On Going (SSR Method)
    // getLimitTodos(pagination)

    //Axios Method
    dispatch(getLimitTodos(pagination))
      .unwrap()
      .then((res) => {
        dispatch(setGetTodos(res.data));
        dispatch(setPage(1));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const getLimitPerPage = (page: number | string) => {
    dispatch(getLimitTodosPerPage(page))
      .unwrap()
      .then((res) => {
        dispatch(setGetTodos(res.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onClickPrevOrNextPage = (type: string | number) => {
    if (type === "&laquo;" || type === "... ") {
      dispatch(setPage(1));
      getLimitPerPage(1);
    } else if (type === "&lsaquo;") {
      if (page !== 1) {
        dispatch(setPage(Number(page) - 1));
        getLimitPerPage(Number(page) - 1);
      }
    } else if (type === "&rsaquo;") {
      if (page !== totalPage) {
        dispatch(setPage(Number(page) + 1));
        getLimitPerPage(Number(page) + 1);
      }
    } else if (type === "&raquo;" || type === " ...") {
      dispatch(setPage(totalPage));
      getLimitPerPage(totalPage);
    } else {
      dispatch(setPage(type));
      getLimitPerPage(type);
    }
  };

  const onSubmit = (data: IPostTodos) => {
    setLoading(true);
    dispatch(postTodos(data))
      .unwrap()
      .then((res) => {
        setLoading(false);
        setSuccess(res.data);
      })
      .catch((error) => {});
    reset();
  };

  const onError = (errors: FieldErrors<IPostTodos>) => {
    console.log("Form Errors", errors);
  };

  const onReset = () => {
    setSuccess(undefined);
    reset();
  };

  return (
    <div className="container-fluid">
      <div className="row px-5 pt-5">
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addTodoModal"
          >
            Add Todo
          </button>
        </div>
      </div>
      <div className="row p-5">
        <Todos />
        <Pagination
          onClickPrevOrNextPage={onClickPrevOrNextPage}
          paginationData={paginationData}
          totalPage={totalPage}
        />
      </div>
      <div className="row">
        <ModalAddTodo
          loading={loading}
          success={success}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onError={onError}
          register={register}
          onReset={onReset}
          watch={watch}
        />
      </div>
    </div>
  );
}
