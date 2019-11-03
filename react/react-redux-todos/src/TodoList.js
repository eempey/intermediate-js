import React, {Component} from 'react';
import Todo from './Todo';
import { connect } from 'react-redux';
import {REMOVE_TODO, addTodo, removeTodo} from "./actionCreators";
import { Route } from 'react-router-dom';
import NewTodoForm from "./newTodoForm";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(value) {
        this.props.addTodo(value);
    }

    removeTodo(id) {
        this.props.removeTodo(id);
    }

    render(){
        let todos = this.props.todos.map((val, index) => (
            <Todo
                removeTodo={this.removeTodo.bind(this, val.id)}
                task={val.task}
                key={index} />
            )
        );
        return(
            <div>
                <Route
                    path='/todos/new'
                    component={props => (
                        <NewTodoForm {...props} handleSubmit={this.handleAdd} />
                    )}
                />
                <Route exact path='/todos' component={() => <ul>{todos}</ul>}/>
            </div>
        );
    }
}

function mapStateToProps(reduxState){
    return {
        todos: reduxState.todos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: function(task) {
            dispatch({
                type: "ADD_TODO",
                task
            });
        }
    };
}
export default connect(mapStateToProps, {addTodo, removeTodo})(TodoList);