import React, { Component } from 'react';

class App extends Component {
  constructor (props) {
    super(props);
    //this.addTask = this.addTask.bind(this);
    //this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {
      taskList: {'task-0': 'Finish the TODO list'}
    };
  }

  addTask(task) {
    //create a unike key for each new fruit item
    var timestamp = (new Date()).getTime();

    // update the state object
    var taskList = Object.assign({}, this.state.taskList);
    
    taskList['task-' + timestamp ] = task;
    // set the state
    this.setState({ taskList : taskList });
  }

  render() {
    return (
      <div>
        <h1>Task List</h1>
        <TaskForm addTask={this.addTask.bind(this)}/>
        <TaskList taskList={this.state.taskList}/>
      </div>
    );
  }
}


class TaskForm extends Component{

  createTask(e){
    e.preventDefault(); // check on this

    // get the task from the input
    var task = this.refs.taskName.value;

    //if we have a value
    //call the addFruit method of the App component
    //to change the state of the fruit list by adding an new item
    if(typeof task === 'string' && task.length > 0) {
      this.props.addTask(task);
      //reset the form
      this.refs.taskForm.reset();
    }
  }

  render() {
    return (
      <form 
        ref="taskForm"
        onSubmit={this.createTask.bind(this)}
      >
        <label>
          <input
            type="text"
            ref="taskName"
            placeholder="Write a task here"
          />
        </label>
        <input type="submit" value="Add" />
      </form>
    );
  }
}

class TaskList extends Component{
  render(){
    return(
      <div className="container">
        <ul className="list-group text-center">
          {
            Object.keys(this.props.taskList).map(function(key) {

              return <TaskItem taskName={this.props.taskList[key]}/>

              //return <li className="list-group-item list-group-item-info">{this.props.taskList[key]}</li>
            }.bind(this))
          }
        </ul>
      </div>
    )
  }
}

class TaskItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      done: false,
    }
  }

  render(){
    return(
      <li
        className="list-group-item list-group-item-info"
        style={
          this.state.done ? {'text-decoration': 'line-through'} : {}
        }
        onClick={() => this.setState({done: true})}
      >
        {this.props.taskName}
      </li>
    )
  }
}


export default App;
