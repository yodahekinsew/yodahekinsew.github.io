import React from 'react';
import logo from './logo.svg';
import Overlay from './Components/Overlay/Overlay.js';
import listReactFiles from 'list-react-files';
import ContentPage from './Components/ContentPage/ContentPage.js';
import yodahe from './Images/yodahe-green.png';
import {connect} from 'react-redux';
import './App.css';

const pages = [
  "education",
  "interests",
  "farmpulse",
  "news",
  "google",
  "nasdaq",
  "intel",
  "mit ta",
  "temporun",
  "pongpongpanic",
  "blockslide",
  "64pixels",
  "heyreddit",
  "tavern",
  "p3n",
  "websites",
];

function App(props) {
  let content = [];
  for (var i = 0; i < pages.length; i++) {
    content.push(<ContentPage page = {pages[i]}/>);
  }
  return (
    <div className="App">
      <Overlay mode="light"/>
      {content}
      <img style={{opacity: props.selected == "" ? "1" : "0"}} src={yodahe} className="yodahe" alt="yodahe"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selected: state.selected,
    highlighted: state.highlighted,
  }
}

export default connect(mapStateToProps, null)(App);
