import React from 'react';
import ContentPage from '../ContentPage/ContentPage.js';
import './ContentNode.css';

class ContentNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 25,
        }; 
    }

    show = () => {
        this.setState({size: 100});
    }

    hide = () => {
        this.setState({size: 0});
    }

    render() {
        return (
            <div className = "Node"
            style={{height: `100vh`, width: `${this.state.size}vw`}} 
            onClick={this.show}>
                {
                    true
                    ?
                    <div style={{top: '0px', left: '0px', position: "absolute"}}>
                        <ContentPage content={this.props.content}/>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default ContentNode;
