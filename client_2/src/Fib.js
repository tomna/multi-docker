import React , { Component } from 'react' ;
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes : [], 
        values : {},
        index : ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();

    }
    async fetchValues(){
        const values  =  await axios.get('/app/values/current');
        this.setStatus({ values: values.data});

    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/app/values/all');
        this.setStatus({
            seenIndexes : seenIndexes.data
        })
    }

    renderSeenIndexes(){
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues(){
        const entries = [];
        for ( let key in this.state.values) {
            entries.push(
                <div key ={key} >
                    For index {key} I calculated {this.status.values[key]}
                </div>
            )
        }
    }

    handleSubmit = async (event) =>{
        event.preventDefault();
        await axios.post('/api/values', {
            index : this.state.index
        });
        this.setState({index : ''})
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your index : 
                    </label>
                    <input value={this.state.index}
                    onCharge={event => this.setState({index:event.target.value})}/>
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen : </h3>
                {this.renderSeenIndexes()}
                <h3>Calculated Values </h3>
                {this.renderValues()}
            </div>
        )
    }
}


export default Fib;