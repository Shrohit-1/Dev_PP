import React, { Component } from 'react';

class InputBox extends Component {
    state = {  
        value:""
    }

    handleOnChange =(e)=>{
        let data=e.target.value;
        this.setState({
            value:data
        })
    }

    HandleOnClick =(e)=>{
        this.props.addTodo(this.state.value);
    }

    render() { 
        return ( 
            <div className="InputBox">
            <input 
            type="text" 
            className="form-control" 
            onChange={this.handleOnChange}
            value={this.state.value}
            />
            <button className="btn btn-primary" onClick={this.HandleOnClick}>Add Todo</button>
            </div>
         );
    }
}
 
export default InputBox;