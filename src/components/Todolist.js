import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';




const Todo = props => (
    <tr>
        <td className={props.todo.completed? 'completed' : ''}>{props.todo.description}</td>
        <td className={props.todo.completed? 'completed' : ''}>{props.todo.responsible}</td>
        <td className={props.todo.completed? 'completed' : ''}>{props.todo.priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>

    </tr>
)


export default class Todolist extends Component {

    constructor(props){
        super(props);

        this.state = {
            todo: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/todos/")
            .then(response => {
                this.setState({todo: response.data});
            })
            .catch((error) => {
                console.log(error);
            })

        
    }


    todoList() {
        return this.state.todo.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />
        })
    }


    render() {
        return (
            <div className="container">
                <h3 className='m-3'>Todos List</h3>
                <table className="table table-striped " style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
