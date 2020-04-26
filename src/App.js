import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'Application CRUD recipes',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.name.focus();
  }

  addRecipe = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let ingrèdients = this.refs.ingrèdients.value;

    if(this.state.act === 0){   //new
      let data = {
        name, ingrèdients
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].ingrèdients = ingrèdients;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  deleteRecipe = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  editRecipe = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.ingrèdients.value = data.ingrèdients;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="recipe" className="formField" />
          <textarea ref="ingrèdients" placeholder="ingredient1,ingredient2...." className="formField">
          </textarea>
          <button onClick={(e)=>this.addRecipe(e)} className="myButton">Add</button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}: {data.ingrèdients}
              <button onClick={()=>this.editRecipe(i)} className="myListButton1">Edit </button>
              <button onClick={()=>this.deleteRecipe(i)} className="myListButton2">Delete </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
