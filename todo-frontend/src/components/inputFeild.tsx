import React from "react";
import { Input, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  useCreateTaskMutation,
  useDeleteMutation,
  useGetAllTaskQuery,
} from "../gql/graphql";
import "./inputFeild.css";
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
}

const InputComponent: React.FC<Props> = ({ todo, setTodo }) => {
  const [create] = useCreateTaskMutation();
  const { data, loading, error } = useGetAllTaskQuery();
  const [deleteTask] = useDeleteMutation();

  function submitTask() {
    create({
      variables: {
        task: {
          task: todo,
        },
      },
    });
  }

  function handleClick(id: number) {
    deleteTask({
      variables: {
        deleteTaskId: id,
      },
    });
  }

  return (
    <div>
      <Input
        className="input_feild"
        placeholder="Basic usage"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      {/* {JSON.stringify(console.log(todo))} */}

      <Button className="input_button" colorScheme="blue" onClick={submitTask}>
        Button
      </Button>
      {error ? (
        <h3>something went wrong</h3>
      ) : (
        data?.tasks.map((tasks) => (
          <div className="taskDiv">
            <ul>{tasks.task}</ul>
            <DeleteIcon onClick={() => handleClick(tasks.id)} />
          </div>
        ))
      )}
    </div>
  );
};

export default InputComponent;
