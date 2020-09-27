import React from 'react';
import './Dropdown.css';
import darkTriangle from '../../Images/green-triangle.png';
import lightTriangle from '../../Images/red-triangle.png';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            scale: 1,
            animation: "",
            triangleRotation: 90,
            contentHeight: "0vh",
            contentOpacity: 0,
        };
    }

    drop = () => {}

    hide = () => {}

    handleClick = () => {
        if (!this.state.clicked) {
            this.setState({clicked: true, triangleRotation: 180, contentHeight: "100vh", contentOpacity: 1});
        } else {
            this.setState({clicked: false, triangleRotation: 90, contentHeight: "0vh", contentOpacity: 0});
        }
    }

    handleEnter = () => {
        // if (this.state.clicked) return;
        // this.setState({contentHeight: "1vh", contentOpacity: 1});
    }

    handleLeave = () => {
        // if (this.state.clicked) return;
        // this.setState({contentHeight: "0vh", contentOpacity: 0});
    }

    render() {
        console.log(this.props.mode);
        return (
            <div className = "Dropdown" 
            onMouseEnter={this.handleEnter}
            onMouseLeave={this.handleLeave}>
                <div className = "dropdownHeader"
                onClick={this.handleClick}>
                    <img style={{transform: `rotate(${this.state.triangleRotation}deg)`}} 
                        className="dropdownTriangle" src={this.props.mode == "dark" ? lightTriangle : darkTriangle}/>
                    <div className={`dropdownLabel ${this.props.mode}`}>{this.props.label}</div>
                </div>
                <div style={{opacity: this.state.contentOpacity, maxHeight: this.state.contentHeight}}
                    className="dropdownContents">{this.props.children}</div>
            </div>
        );
    }
}

export default Dropdown;
