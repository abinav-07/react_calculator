import React,{Component} from 'react';

import './App.css';

/* eslint no-eval: 0 */
var decimalCheck=/^\d+(\.\d{0,4})?$/


class Calculator extends Component{

  state={
    color:'red',
  }
  render(){
    return(
      <div className="calculator">

        <div id="display"/*style={{color:this.state.color}}*/>
          <h2 className="display-text">{this.props.currentValue}</h2>
        </div>
        <div className="buttons rows firstRow">
          <button id="clear" onClick={this.props.clear} className='row' >A/C</button>
          <button id="brackets"  className='row' >()</button>
          <button id="mod"  className='row'>%</button>
          <button id="divide"  value="/" onClick={this.props.operator}  className='row'>/</button>
        </div>
        <div className="buttons rows">
          <button id="seven" value="7" onClick={this.props.numbers} className='row' >7</button>
          <button id="eight" value="8" className='row' onClick={this.props.numbers} >8</button>
          <button id="nine" value="9"  className='row' onClick={this.props.numbers}>9</button>
          <button id="multiply" value="*" onClick={this.props.operator} className='row'>X</button>
        </div>
        <div className="buttons rows">
          <button id="four"  className='row' onClick={this.props.numbers} value="4">4</button>
          <button id="five" className='row' onClick={this.props.numbers} value="5">5</button>
          <button id="six"  className='row' onClick={this.props.numbers} value="6">6</button>
          <button id="subtract" value="-" onClick={this.props.operator}   className='row'>-</button>
        </div>
        <div className="buttons rows">
          <button id="one"  className='row' onClick={this.props.numbers} value="1">1</button>
          <button id="two" className='row' onClick={this.props.numbers} value="2">2</button>
          <button id="three"  className='row' onClick={this.props.numbers} value="3">3</button>
          <button id="add"  onClick={this.props.operator} value="+" className='row'>+</button>
        </div>
        <div className="buttons rows">
          <button id="zero" className='row' onClick={this.props.numbers} value="0">0</button>
          <button id="decimal" value="." onClick={this.props.decimal} className='row'>.</button>
          <button id="equals" onClick={this.props.equals} className='row'>=</button>
        </div>

      </div>
    )
  }
}

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      currentValue:'0',
      prevValue:"0",
      operator:'',
      bolDecimal:false
    }
    this.handleNumber=this.handleNumber.bind(this);
    this.handleOperator=this.handleOperator.bind(this);
    this.handleEquals=this.handleEquals.bind(this);
    this.handleClear=this.handleClear.bind(this);
    this.handleDecimal=this.handleDecimal.bind(this);
  }

  limit(){
    this.setState({
      currentValue:"Limit"
    });
    setTimeout(()=>this.setState({
      currentValue:this.state.prevValue
    }),1000);
  }

  handleNumber(e){
    if(this.state.currentValue.length>21){
      this.limit();
    } else{
    this.setState({
      currentValue:
      this.state.currentValue==0 && this.state.currentValue!=0+"." ? e.target.value :
      this.state.currentValue+e.target.value,
      prevValue:this.state.currentValue
      })
  }}

  handleEquals(){
    this.setState({
      currentValue:+eval(this.state.currentValue).toFixed(4)
    })
  }

  handleOperator(e){
    /*if for cheking last operator*/
    this.state.bolDecimal=false
    if(/[*+-/]$/.test(this.state.currentValue)){
      this.setState({
          currentValue:this.state.prevValue+e.target.value
      })
    }else if(this.state.currentValue==0){
      this.setState({
        currentValue:this.state.currentValue
      })
    }
    else{
    this.setState({
      operator:e.target.value,
      currentValue:this.state.currentValue+e.target.value,
      prevValue:this.state.currentValue
    });
  }};

  handleClear(){
    this.setState({
      currentValue:'0',
      prevValue:"0",
      operator:'',
      bolDecimal:false
    })
  }

  handleDecimal(e){
    /*if(decimalCheck.test(this.state.currentValue)){
    }*/
    if(this.state.bolDecimal===false/*||/[*+-/]$/.test(this.state.currentValue)*/){
      this.setState({
        currentValue:this.state.currentValue+e.target.value,
        bolDecimal:true
      })
    }
    else{
      this.setState({
        currentValue:this.state.currentValue
      })
    }
  }


  render(){
    return(
      {/* Calling the Calculator Component*/}
      <Calculator
         numbers={this.handleNumber}
         operator={this.handleOperator}
         clear={this.handleClear}
         decimal={this.handleDecimal}
         currentValue={this.state.currentValue}
         equals={this.handleEquals}
       />
    )
  }
}



export default App;
