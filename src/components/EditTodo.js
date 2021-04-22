import React, { Component } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


export default class EditTodo extends Component {

    constructor(props){
        super(props);
        

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeResponsible = this.onChangeResponsible.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            description: '',
            responsible: '',
            priority: '',
            completed: false
        }
    }


    componentDidMount(){
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                description: response.data.description,
                responsible: response.data.responsible,
                priority: response.data.priority,
                completed: response.data.completed
            })
        })
        .catch(err => console.log(err))
    }  
        

    onChangeDescription(e) {
        this.setState({
            description: e.target.value 
        })
    }

    onChangeResponsible(e){
        this.setState({
            responsible: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }
    onChangeCompleted(e){
        this.setState({
            completed: !this.state.completed
        })
    }
    onSubmit(e){
        e.preventDefault();
        
        //Sending Data to Back-end
        const obj = {
            description: this.state.description,
            responsible: this.state.responsible,
            priority: this.state.priority,
            completed: this.state.completed,
        }

        axios.post("http://localhost:4000/todos/update/"+this.props.match.params.id , obj)
        .then(res => console.log(res.data));
        

        this.props.history.push('/');

    }


    render() {
        return (
            <div className="container">
                <h3 align="center" className="m-3">Update Todo :</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="m-3">
                        <label className="form-label ">Description:</label>
                        <input 
                            type="text" 
                            className="form-control form-control-lg" 
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="m-3">
                        <label className="form-label">Responsible:</label>
                        <input 
                            type="text" 
                            className="form-control form-control-lg"  
                            value={this.state.responsible}
                            onChange={this.onChangeResponsible}
                        />
                    </div>
                    <div className="form-group m-3">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    onChange={this.onChangePriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    onChange={this.onChangePriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    onChange={this.onChangePriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                        <div className="form-check pt-3">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeCompleted}
                                checked={this.state.completed}
                                value={this.state.completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>
                    </div>
                    
                    <button type="submit" className="btn btn-dark m-3" onClick={this.onSubmit}>Make Changes</button>
                
                    
                </form>
            </div>
        )
    }
}
