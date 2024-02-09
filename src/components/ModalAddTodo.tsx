import { IModalAddTodo } from "@/app/_interfaces/IModalAddTodo";
import { FC, memo } from "react";

const ModalAddTodo: FC<IModalAddTodo> = (props) => {
  return (
    <div className="col-md-12">
      <div
        className="modal fade"
        id="addTodoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 me-4" id="exampleModalLabel">
                Add Todos{" "}
                <span className="text-success">
                  {" "}
                  {props.success ? "Succeed" : ""}
                </span>
                <span className="text-info">
                  {props.loading ? "Waiting" : ""}
                </span>
              </h1>
              {props.errors.userId && (
                <span className="text-danger">
                  {" "}
                  {props.errors.userId.message}
                </span>
              )}
              {props.errors.title && (
                <span className="text-danger">
                  {" "}
                  {props.errors.title.message}
                </span>
              )}
              {props.errors.body && (
                <span className="text-danger">
                  {" "}
                  {props.errors.body.message}
                </span>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={props.handleSubmit(props.onSubmit, props.onError)}
                className="ms-md-1 px-4"
              >
                <input
                  type="string"
                  {...props.register("userId")}
                  placeholder="User Id"
                  defaultValue={
                    props.success?.userId
                      ? `User Id : ${props.success.userId}`
                      : undefined
                  }
                  disabled={props.success?.userId ? true : false}
                  className={`me-2 ${
                    props.errors.userId ? "" : "mb-3"
                  } border-0`}
                />

                <input
                  type="text"
                  {...props.register("title")}
                  defaultValue={
                    props.success?.title
                      ? `Title : ${props.success.title}`
                      : undefined
                  }
                  disabled={props.success?.title ? true : false}
                  placeholder="Title"
                  className={`me-2 ${
                    props.errors.title ? "" : "mb-3"
                  } border-0`}
                />

                <input
                  type="text"
                  {...props.register("body")}
                  defaultValue={
                    props.success?.body
                      ? `Body : ${props.success.body}`
                      : undefined
                  }
                  disabled={props.success?.body ? true : false}
                  placeholder="Body"
                  className={`me-2 mb-3 border-0 ${
                    props.errors.body ? "mt-3" : ""
                  }`}
                />

                {props.success?.id && (
                  <input
                    type="text"
                    {...props.register("id")}
                    defaultValue={
                      props.success?.id ? `Id : ${props.success.id}` : undefined
                    }
                    disabled={props.success?.id ? true : false}
                    placeholder="Id"
                    className={`me-2 mb-3 border-0 ${
                      props.errors.body ? "mt-3" : ""
                    }`}
                  />
                )}

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={props.onReset}
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value={"Save"}
                    disabled={
                      props.watch().title &&
                      props.watch().body &&
                      props.watch().userId
                        ? false
                        : true
                    }
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ModalAddTodo);
