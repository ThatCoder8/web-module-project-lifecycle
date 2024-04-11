import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [], 
  }
  fetchAllToDos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => {

    })
  }
  componenentDidMount() {
    this.fetchAllToDos()
  }
  render() {
    return (
    <div>
      <h2>Todos:</h2>
      {this.state.todos.map(td => {
        return <div key={td.id}>{td.name}</div>
      })}
    </div>
    )
  }
}
