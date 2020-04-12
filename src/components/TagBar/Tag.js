import React, { Component } from 'react'

export class Tag extends Component {

    constructor(props){
        super(props)
    }

    handleClick = () => {
        this.props.setIsFetching(true)
        this.props.changeTab(this.props.name)
    }

    render() {
        return (
            <span className="tag" onClick={this.handleClick}>{this.props.name ? (this.props.name):("Default")}</span>
        )
    }
}

export default Tag
