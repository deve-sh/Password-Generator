/*
    App.js - All Things React Inside the Password Generator.
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

const Password = (props) => {
    return (
        <div>
            <div className='left'>{props.pass}</div>
            <div className='right'></div>
        </div>
    );
}

/* Form Component */

class Form extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            reloaded:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){    // Function to handle all the form submission stuff.
        e.preventDefault();

        this.props.passwordadder(number,length);    // Number of passwords, length of each password.

        this.setState({
            reloaded:true   /* Re-Render the form once the passwords have been submitted. */
        });
    }

    render(){
        return (<form id='form' onSubmit={this.handleSubmit}>
                    <Input/>
                    <Input className='passwordlength' type='number' placeholder='Password Length' min={1}/>
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

    passwordadder(number,length){
        let passarray=[];
        for(let i=0;i<number;i++){
            let pass="";
            for(let j=0;j<length;j++){
                let randomnum = Math.floor(Math.random()*chararr.length);
                pass += chararr[randomnum];
            }

            passarray.push(pass);
        }

        const reactarray = passarray.map((password)=><Password pass={password}/>);

        ReactDOM.render(reactarray,document.getElementById('passwords'));
    }

    render(){
        return (<div>
            <projectName/>
            <Form/>
            <br/>
            <div id='passwords'></div>
        </div>);
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));