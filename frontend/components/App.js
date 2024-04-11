import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [], 
    error: '',
    todoNameInput: '',
  }
  onTodoNameInputChange = evt => {
    const {value} = evt.target
   this.setState({...this.state, todoNameInput: value})
  }
  postNewtodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.fetchAllToDos()
      this.setState({...this.state, todoNameInput: ''})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }
  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewtodo()
  }
  fetchAllToDos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }
  componenentDidMount() {
    this.fetchAllToDos()
  }
  render() {
    return (
    <div>
    <div id="error">Error: {this.state.error}</div>
    <div id="todos">
      <h2>Todos:</h2>
      {this.state.todos.map(td => {
        return <div key={td.id}>{td.name}</div>
      })}
    </div>
    <form id="todoform" onSubmit={this.}>
      <input value={this.state.todoNameInput} onChange={this.state.onTodoNameInputChange} type="text" placeholder='Type todo'></input>
      <input type="submit"></input>
      <button>Clear Completed</button>
    </form>
    </div> 
    )
  }
}
