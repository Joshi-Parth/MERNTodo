import React, { Component, useState } from 'react'
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props){
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeResponsible = this.onChangeResponsible.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        

        this.state = {
            description: '',
            responsible: '',
            priority: '',
            completed: false,
        }

        
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

    onSubmit(e){
        e.preventDefault();
        console.log(`Description: ${this.state.description}`);
        console.log(`Responsible: ${this.state.responsible}`);
        console.log(`Priority: ${this.state.priority}`);
        console.log(`Completed: ${this.state.completed}`);
        
        //Sending Data to Back-end
        const newTodo = {
            description: this.state.description,
            responsible: this.state.responsible,
            priority: this.state.priority,
            completed: this.state.completed,
        }

        axios.post("http://localhost:4000/todos/add", newTodo)
        .then(res => console.log(res.data));

        this.setState = {
            description: '',
            responsible: '',
            priority: '',
            completed: false,
        }

        this.props.history.push('/');

    }



    render() {
        return (
            <div className="container">
                <h3 className="m-3" align="center">Create New Todo :</h3>
                <form>
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
                    </div>
                    
                    <button type="submit" className="btn btn-dark m-3" onClick={this.onSubmit}>Let's Go</button>
                </form>

            </div>
        )
    }
}
