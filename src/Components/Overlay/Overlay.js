import React from 'react';
import Dropdown from '../Dropdown/Dropdown.js';
import {connect} from 'react-redux';
import './Overlay.css';
import resume from '../../Images/Logos/resume-logo.png';
import email from '../../Images/Logos/email-logo.png';
import github from '../../Images/Logos/github-logo.png';
import itchio from '../../Images/Logos/itchio-logo.png';
import linkedin from '../../Images/Logos/linkedin-logo.png';

function Option (label, mode, selected, setSelected, setHighlighted) {
    return <div className={`${mode} Option`} 
        style={selected == label ? {opacity: 1} : {}}
        onClick={() => {setSelected(label)}}
        onMouseEnter={() => {setHighlighted(label)}}
        onMouseLeave={() => {setHighlighted("")}}>
            {label}
        </div>
}

class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Overlay">
                <div className="Header"
                    onClick={() => {this.props.setSelected("")}}>
                    YODAHE ALEMU
                </div>
                <div className="Options">
                    <Dropdown mode={this.props.mode} label={"ABOUTME"}>
                        {Option("EDUCATION", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("INTERESTS", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                    </Dropdown>
                    <Dropdown mode={this.props.mode} label={"RESEARCH"}>
                        {Option("FARMPULSE", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("NEWS", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                    </Dropdown>
                    <Dropdown mode={this.props.mode} label={"EXPERIENCE"}>
                        {Option("GOOGLE", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("NASDAQ", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("INTEL", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("MIT TA", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                    </Dropdown>
                    <Dropdown mode={this.props.mode} label={"PROJECTS"}>
                        {Option("TEMPORUN", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("PONGPONGPANIC", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("BLOCKSLIDE", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("64PIXELS", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("HEYREDDIT", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("TAVERN", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("P3N", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                        {Option("WEBSITES", this.props.mode, this.props.selected, this.props.setSelected, this.props.setHighlighted)}
                    </Dropdown>
                </div>
                <div className="ByMe">- a website by yodahe -</div>
                <div className="Contact">
                    <a href="/yodahe_resume.pdf"><img className="logo" src={resume}/></a>
                    <a href="mailto:yodahekinsew@gmail.com"><img className="logo" src={email}/></a>
                    <a href="https://www.linkedin.com/in/yodahe-alemu/"><img className="logo" src={linkedin}/></a>
                    <a href="https://github.com/yodahekinsew"><img className="logo" src={github}/></a>
                    <a href="https://yodahekinsew.itch.io/"><img className="logo" src={itchio}/></a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selected: state.selected,
        highlighted: state.highlighted,
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        setSelected: (selection) => {
            dispatch({type: "SET_SELECTED", payload: selection})
        },
        setHighlighted: (selection) => {
            dispatch({type: "SET_HIGHLIGHTED", payload: selection})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
