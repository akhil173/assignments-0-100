import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

let globalID = 1;

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const markAsDone = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = true;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <div>
        <h2>To - Do Application</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={() => {
            console.log(todos);
            setTodos([
              ...todos,
              {
                id: globalID++,
                title: title,
                description: description,
                completed: false,
              },
            ]);
          }}
        >
          Add To Do
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <div className="title-div">{todo.title}</div>
            <div className="desc-div">{todo.description}</div>
            <button
              onClick={() => markAsDone(todo.id)}
              disabled={todo.completed}
            >
              {!todo.completed ? <span>Mark as Done</span> : <span>Done</span>}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
