/*
    App.js - All Things React Inside the Password Generator.
*/

const projectName = <div id='header'>Password Generator</div>; /* Project Name Header */

/* Form */


class Form extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){    // Function to handle all the form submission stuff.
        e.preventDefault();

        this.props.passwordadder(number,length);    // Number of passwords, length of each password.
    }

    render(){
        return (<form id='form' onSubmit={this.handleSubmit}></form>);
    }
}

/* App Component */

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            reloaded:false
        }
    }

    render(){
        return (<div>
            <Form/>
        </div>);
    }
}