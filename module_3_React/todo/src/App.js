import React, { Component } from 'react';
import InputBox from './components/InputBox/InputBox';
import TodoList from './components/TodoList/TododList';

class App extends Component {
  state = {  
    todos: [
      { id: "1", todo: "Learn JSX" },
      { id: "2", todo: "Learn Css" },
      { id: "3", todo: "Learn ES6" },
      { id: "4", todo: "Learn React" },
      { id: "5", todo: "Learn JS" },
    ],
  }

  deleteTodo =(id) =>{
    let updatedTodo=this.state.todos.filter( function(obj){
      if (obj.id === id){
        return false;
      }
      return true;
    });
    this.setState({
      todos: updatedTodo
    })
  }
  addTodo =(todo)=>{
    let updatedTodo=this.state.todos.map(function(Todo){
      return Todo;
    });
    updatedTodo.push({ id: this.state.todos.length + 1, todo: todo });
    this.setState({
      todos:updatedTodo
    })
  };
  render() { 
    let todos = this.state.todos;
    let deleteTodo=this.deleteTodo;
    let addTodo=this.addTodo;
    return ( 
      <div>
        <InputBox addTodo={addTodo}></InputBox>
        <TodoList todos={todos} deleteTodo={deleteTodo}></TodoList>
      </div>
     );
  }
}
 
export default App;
