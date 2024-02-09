import { useAppSelector } from "@/app/_redux/store";
import { Fragment, memo } from "react";

const Todos = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <Fragment>
      {todos.map((todo) => (
        <div key={todo.id} className="col-md-3 mb-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">id : {todo.id}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                user id : {todo.userId}
              </h6>
              <p className="card-text">{todo.title}</p>
              <p>{todo.completed ? "Completed" : "Uncompleted"}</p>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default memo(Todos);
