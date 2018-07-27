import React, { Component } from "react";
class FormContainer extends Component {
    constructor() {
        super();
        this.state = {
            seo_title: "I am SEO Title"
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        const { seo_title } = this.state;
        return (
            <div> I AM SEO TITLE </div>
        );
    }
}
export default FormContainer;
