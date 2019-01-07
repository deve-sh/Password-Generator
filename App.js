/*
    App.js - All Things React Inside the Password Generator.
    At Max 10000 Passwords Per Turn!
*/

const projectName = <div style={{textAlign:'center'}}><div id='header'>Password Generator</div></div>; /* Project Name Header */

/* Form */

const Input = (props) => <input className={props.className} min={(props.type==="number")?1:""} placeholder={props.placeholder} type={props.type} required/>

const Button = (props) => <button type={props.type}>{props.label}</button>;

Input.defaultProps = {
    className : 'passwordnum',
    type:'number',
    placeholder:'No. Of Passwords',
    min:1
}

Button.defaultProps = {
    type:"submit",
    label:"Generate"
}

/*
    Password Character Array
*/

const chararr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '/', '@', '#', '^', '&', '*', '(', ')', '=', '+', '~', '?', '.', ']', '[', '}', '{', '|', '-', '_', ',', ':', '!','1','2','3','4','5','6','7','8','9','0'];


/* Password Component */


/* Function To copy from a div. */

const copyPass = (e) =>{
    var target = e.target.parentElement.children[0];
    var range, select;
    if (document.createRange) {
      range = document.createRange();
      range.selectNode(target)
      select = window.getSelection();
      select.removeAllRanges();
      select.addRange(range);
      document.execCommand('copy');
      select.removeAllRanges();
    } else {
      range = document.body.createTextRange();
      range.moveToElementText(target);
      range.select();
      document.execCommand('copy');
    }
}

const Password = (props) => {
    return (
        <div>
            <div className='left'>{props.pass}</div>
            <div className='right' onClick={copyPass}>Copy</div>
        </div>
    );
}

/*
    Error Message Component
*/

const error = (props) => <div className='error'><div style={{textAlign:'center'}}>{props.errorLabel}</div></div>;
const emptyerror = <span></span>;

/* Form Component */

class Form extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            reloaded:false,
            inputVal:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addError = this.addError.bind(this);
    }

    addError(errorlabel){   /* Error Message Adding Function */
        ReactDOM.render(error({errorLabel:errorlabel}),document.getElementById('errors'));

        setTimeout(() => ReactDOM.render(emptyerror,document.getElementById('errors')),5000);    // Remove the error message after 5 seconds.
    }

    handleSubmit(e){    // Function to handle all the form submission stuff.
        e.preventDefault();

        if(e.target.getAttribute('id')==='form'){
            let number = (parseInt(e.target.children[0].value) && parseInt(e.target.children[0].value)<=10000)?parseInt(e.target.children[0].value):'error';
            let length = (parseInt(e.target.children[2].value) && parseInt(e.target.children[2].value)<=300)?parseInt(e.target.children[2].value):'error';

            if(number==='error' || length==='error')
            {
                this.addError('Invalid Inputs Entered.');
            }
            else{   /* No error ecnountered. */
                this.props.passwordadder(number,length);    // Number of passwords, length of each password.
                    
                this.setState({
                    reloaded:true,   /* Re-Render the form once the passwords have been submitted. */
                    inputVal:''
                });
            }
        }
        else{
            this.addError('Invalid Form Input.');
        }
    }

    render(){
        return (<form id='form' onSubmit={this.handleSubmit}>
                    <Input/>
                    <br/>
                    <Input className='passwordlength' type='number' placeholder='Password Length' min={1}/>
                    <br/>
                    <Button/>
                </form>);
    }
}

/* App Component */

class App extends React.Component{
    constructor(props){
        super(props);
        this.passwordadder = this.passwordadder.bind(this);
    }

    passwordadder(number=1,length=10){  /* Parametrized Function */
        let passarray=[];
        for(let i=0;i<number;i++){
            let pass="";
            for(let j=0;j<length;j++){
                let randomnum = Math.floor(Math.random()*chararr.length);
                pass += chararr[randomnum];
            }

            passarray.push(pass);
        }

        const reactarray = passarray.map((password,n=0) => {    /* n for the key attribute of every element. */
            n++;
            return <Password key={n} pass={password} />;
        } );

        let temparray = <div>{reactarray}</div>;

        ReactDOM.render(temparray,document.getElementById('passwords'));

        document.getElementById('form').children[0].value='';
        document.getElementById('form').children[2].value='';
    }

    render(){
        return (<div>
            {projectName}
            <div id='errors'></div>
            <Form passwordadder={this.passwordadder}/>
            <br/>
            <div id='passwords'></div>
        </div>);
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));