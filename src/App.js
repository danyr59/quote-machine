import logo from './logo.svg'
import quote from './left-quote-svgrepo-com.svg';
import tumblr from './tumblr-logo-svgrepo-com.svg';
import React, {Component} from 'react'; 
import './App.css';
function add(currentQuote, currentAuthor){
  return 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);
  
}
const Buttons = (props) =>{
  return (
    <div className="row mt-4 " >
      <div className="col-sm-4 d-flex justify-content-start">
        <a className="btn btn-primary effect" style={{backgroundColor: props._color, border:'none'}}><i class="bi bi-youtube tam-botones"></i> </a> 
        <a className="btn btn-primary ms-1 effect" id="tweet-quote" style={{backgroundColor: props._color ,  border:'none'}} href={add(props._message,props._author)}><i className="bi bi-twitter tam-botones "></i></a>
     </div>
      <div className="col-sm-8 d-flex justify-content-end">
        <button className="btn btn-primary tam-botones effect " id="new-quote" style={{backgroundColor: props._color ,  border:'none'}} onClick={props.funcion}>New Quote</button>
      </div>
    </div>
  );
}
const QuoteAuthor = (props) => {
  return (
    <div className="row text-end mt-4" id="quote-author">
      <div className="col" id="author">
        <cite><span className="tam-author blockquote-footer effect" style={{color: props._color}}>{props._author}</span></cite>
      </div>
    </div>
  );
}
const QuoteText = (props) =>{
  return (
    <div className="row" id="quote-text">
     {/*  <div className="col-1">
      </div>*/}
      <div className="col-12">
        <i class="bi bi-chat-right-quote-fill tam-quote-svg effect" style={{color: props._color}}></i>
        <span className="tam-quote-svg effect " id="text" style={{color: props._color}}>   {props._message}</span>   
      </div>
    </div>    
 );
}
function QuoteBox(props){
  return (
      <div className="card text-center  ">
        <div className="card-body">
          <div className="container position-relative size" id="quote-box">
              <QuoteText _message={props._message} _color={props._color}/>
              <QuoteAuthor _author={props._author} _color={props._color}/>
              <Buttons funcion={props.funcion} _color={props._color} _message={props._message} _author={props._author}/>
          </div>
        </div>
    </div> 
  );
}
class App extends Component{
  constructor(props){
    super(props);
    this.control = 1;
    this.state ={
      message: '',
      author:'',
      color: '',
      _animation :true
    }
    this.fechtMessage = this.fechtMessage.bind(this);   
    this.setColor = this.setColor.bind(this);
  }
  componentDidMount(){
    if(this.control){    
      let _message;
      let _author;
      fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data =>{
        _message = data.quotes[Math.floor(Math.random() * data.quotes.length)].quote ;
        _author = data.quotes[Math.floor(Math.random() * data.quotes.length)].author ;

        this.setState({
          message: _message,
          author: _author,
          _animation : false
        });
      })
    
      this.setColor();
      this.control = 0;
    }else{
      this.setState({
        _animation: false
      });
    }
    
   
  }
  fechtMessage(){
    let _message;
    let _author;
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => response.json())
    .then(data =>{
      _message = data.quotes[Math.floor(Math.random() * data.quotes.length)].quote ;
      _author = data.quotes[Math.floor(Math.random() * data.quotes.length)].author ;

      this.setState({
        message: _message,
        author: _author 
      });
    })
    
    this.setColor();
    this.OnClicked();
   // let buttom = document.getElementById("new-quote");
    //buttom.addEventListener('click',this.animation);

  }
  OnClicked(){
    this.setState(state=> ({
       _animation: true 
    }));

  }
  animation = () =>{
    this.setState(prevState =>({
      _animation: !prevState._animation
    }));
  }
  setColor(){
    const _color= [
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'
    ];
    this.setState({
      color: _color[Math.floor(Math.random() * _color.length)]  
    });
     //var list = document.getElementsByClassName("effect");
//    for(let i = 0 ; i< list.length; i++){
  //    list[i].classList.add("animated");
    //}

  //list.getElementsByClassName("child")[0].innerHTML = "Milk";
   

//     var element = document.getElementById("myDIV");
//   element.classList.add("mystyle");
  }
  render(){
    return (
    <div className={["container-fluid fullHeight d-flex align-items-center justify-content-center  effect", this.state._animation && 'animated'].join(" ")} style={{backgroundColor: this.state.color}} >
      <QuoteBox _message={this.state.message} _author={this.state.author} funcion={this.fechtMessage} _color={this.state.color} />
   </div>
    );
  }

}

export default App;
/*
return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
*/
