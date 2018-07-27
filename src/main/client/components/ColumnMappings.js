import React, {Component} from 'react';

class ColumnMappings extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns : []
        };
        this.renderColumns = this.renderColumns.bind(this);
        this.getColumns = this.getColumns.bind(this);
    }

    componentDidMount(){
      this.getColumns();
    }

    componentDidUpdate() {
        this.getColumns();
    }

    getColumns() {
        fetch(`/getColumns?tableName=${this.props.selectedTable}`)
            .then(res => res.json())
            .then(result => this.setState({columns:result}));
    }

    renderColumns() {
        return this.state.columns.map(column => <li key={column}>{column}</li>)
    }

    render(){
        return (
            <ul type="none">
                {this.renderColumns()}
            </ul>
        )
    }
}

export default ColumnMappings;