import React from 'react';
import Overlay from '../Overlay/Overlay.js';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import './ContentPage.css';

class ContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      markdown: "",
      width: "25vw",
    };
  }

  componentDidUpdate() {
    if (this.state.selected != this.props.selected) {
      // if (this.props.selected != "" && this.state.selected.toLowerCase() == this.props.page) {
      //   console.log("waiting to reset " + this.props.page);
      //   setInterval(() => {this.setState({selected: this.props.selected})}, 1000);
      // } else {
      //   console.log("not waiting for " + this.props.page);
      //   this.setState({selected: this.props.selected});
      // }
      this.setState({selected: this.props.selected});
    }
  }

  componentDidMount() {
    fetch("/Pages/" + this.props.page + ".md").then(file => file.text()).then(markdown => this.setState({markdown: markdown}));
  }

  handleClick = () => {
    this.setState({width: "100vw"});
  }

  render() {
    var selected = this.state.selected.toLowerCase() == this.props.page;
    var prevSelected = this.props.selected.toLowerCase() != this.props.page && selected;
    var highlighted = this.props.highlighted.toLowerCase() == this.props.page;
    return (
      <div style={prevSelected ? {minWidth: "100vw", zIndex: 0, opacity: 1} : selected ? {minWidth: "100vw", zIndex: 1, opacity: 1} : highlighted ? {minWidth: "calc(max(350px, min(500px, 25vw)) + .5vw)", zIndex: 2, opacity: 1} : {minWidth: "calc(max(350px, min(500px, 25vw))", zIndex: 0, opacity: 0}} 
      className="ContentPage" onClick={this.handleClick}>
        <div style={{borderColor: selected ? "var(--dark-accent-color)" : "var(--light-color)"}} className="Sideline">
          {/* <div className="Sideheader">{this.props.page.toUpperCase()}</div> */}
        </div>
        <Markdown className="Markdown" source = {this.state.markdown}/> 
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

export default connect(mapStateToProps, null)(ContentPage);
