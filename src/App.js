import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcOnOff, setFuncOnOff] = useState(true);
  var [classOnOff, setClassOnOff] = useState(true);

  return (
    <div className="container">
      <h1>Hellow World</h1>
      <input type = 'button' value='remove func' onClick={function(){
        setFuncOnOff(false);
      }}/>
      <input type = 'button' value='remove class' onClick={function(){
        setClassOnOff(false);
      }}/>
      {funcOnOff ? <FuncComp initNumber={2}></FuncComp> : null}
      {classOnOff ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

var funcStyle = 'color : blue';
var funcId = 0;
//fucntion style component
function FuncComp(props) {
  var [number, setNumber] = useState(props.initNumber); //useState is array
  // var number = numberState[0]; //state
  // var setNumber = numberState[1]; //function

  var [date, setDate] = useState(new Date().toString());

  //componentDidMount & componentDidUpdate 와 동일
  useEffect(function(){
    console.log('%cfunc : useEffect'+ (++funcId), funcStyle);
    document.getElementsByTagName('h1')[0].innerText = 'Hello World ' + number;

    //clean up - useEffect가 실행되기 전 
    return function() {
      console.log('%cfunc : number clean up', funcStyle);
    }
  }, [number])

  useEffect(function(){
    console.log('%cfunc : useEffect'+ (++funcId), funcStyle);
    document.getElementsByTagName('h1')[0].innerText = 'Hello World ' + date;

    //clean up
    return function() {
      console.log('%cfunc :  date clean up', funcStyle);
    }
  }, [date])

  useEffect(function(){

    console.log('%cfunc : useEffect(componentDidMount)'+ (++funcId), funcStyle);
    
    //clean up
    return function() {
      console.log('%cfunc : number clean up(componentDidMount & componentWillUnmount)', funcStyle);
    }
  }, [])

  console.log('%cfunc : render'+ funcId, funcStyle);

  return (
    <div className='container'>
      <h2>function style component</h2>
      <p>number : {number}</p>
      <p>date : {date}</p>
      <input type='button' value='random' onClick={
          function(){
            setNumber(Math.random());
          }
      }/>
      <input type='button' value='date' onClick={
          function(){
            setDate(new Date().toString());
          }
      }/>
    </div>
  )
}

//class style component
var classStyle = 'color:red';
class ClassComp extends React.Component{
  state = {
    number : this.props.initNumber,
    date : new Date().toString()
  }

  componentWillMount() {
    console.log('%cclass : componentWillMount', classStyle);
  }

  componentDidMount() {
    console.log('%cclass : componentDidMount', classStyle);
  }

  componentWillUnmount() {
    console.log('%cclass : componentWillUnmount', classStyle);
  }

  render(){
    console.log('%cclass : render', classStyle);
    return (
      <div className='container'>
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type='button' value='random' onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }/>
        <input type='button' value='date' onClick={
          function(){
            this.setState({date:new Date().toString()})
          }.bind(this)
        }/>
      </div>
    ) 
  }
}
export default App;
