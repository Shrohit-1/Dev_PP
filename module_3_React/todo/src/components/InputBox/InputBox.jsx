import React, { Component } from 'react';

class InputBox extends Component {
    state = {  

    }
    render() { 
        let todos=this.props.todos;
        let addTodo=this.props.addTodo;
        return ( 
            <div className="InputBox">
            <input 
            type="text" 
            className="form-control" 
            />
            <button className="btn btn-primary" onClick={}>Add Todo</button>
            </div>
         );
    }
}
 
export default InputBox;