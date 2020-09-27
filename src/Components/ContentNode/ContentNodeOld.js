import React from 'react';
import ContentPage from '../ContentPage/ContentPage.js';
import './ContentNode.css';

class ContentNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 50 + Math.random()*200,
            goalSize: 50 + Math.random()*200,
            originSize: 25,
            showing: false,
            hiding: false,
            position: this.props.position,
            goalPosition: {
              x: .1*window.innerWidth + Math.random()*.8*window.innerWidth, 
              y: .1*window.innerHeight + Math.random()*.8*window.innerHeight,
            },
        }; 
    }

    show = () => {
        if (!this.state.showing) {
            this.setState({showing: true});
            var showing = setInterval(() => {
                this.setState({size: this.state.size + 250});
                if (this.state.size >= Math.max(2.5*window.innerHeight, 2.5*window.innerWidth)) {
                    clearInterval(showing);
                };
            }, 25);
        }
    }

    hide = () => {
        if (!this.state.hiding) {
            this.setState({hiding: true});
            var hiding = setInterval(() => {
                this.setState({size: this.state.size - 250});
                if (this.state.size <= this.state.originSize) {
                    clearInterval(hiding);
                    this.setState({showing: false, hiding: false});
                };
            }, 25);
        }
    }

    componentDidMount() {
        // var moving = setInterval(() => {
        //     var deltaX = (this.state.goalPosition.x - this.state.position.x)*.005;
        //     var deltaY = (this.state.goalPosition.y - this.state.position.y)*.005;
        //     var newPosition = {
        //         x: this.state.position.x + deltaX, 
        //         y: this.state.position.y + deltaY,
        //     };
        //     this.setState({position: newPosition});
        //     if (this.state.goalPosition.x - newPosition.x <= 100 
        //         && this.state.goalPosition.y - newPosition.y <= 100) {
        //         var newGoal = {
        //             x: .1*window.innerWidth + Math.random()*.8*window.innerWidth, 
        //             y: .1*window.innerHeight + Math.random()*.8*window.innerHeight,
        //         };
        //         this.setState({goalPosition: newGoal});
        //     }
        // }, 25);

        var growing = setInterval(() => {
            var newSize = this.state.size + (this.state.goalSize - this.state.size)*.01;
            this.setState({size: newSize});
            if (this.state.goalSize - newSize <= 3) {
                this.setState({goalSize: 50 + Math.random()*200});
            }
        }, 25);
    }

    render() {
        let nodeLeft = this.state.position.x + this.state.originSize-.5*this.state.size;
        let nodeTop = this.state.position.y + this.state.originSize-.5*this.state.size;
        let pageLeft = .5*this.state.size - this.state.originSize - this.state.position.x;
        let pageTop = .5*this.state.size - this.state.originSize - this.state.position.y;
        return (
            <div className = "Node"
            style={{left: `${nodeLeft}px`, top: `${nodeTop}px`, height: `${this.state.size}px`, width: `${this.state.size}px`}} 
            onClick={this.show}>
                {
                    this.state.showing == true
                    ?
                    <div style={{left: `${pageLeft}px`, top: `${pageTop}px`, position: "absolute"}}>
                        <div className = "Exit" onClick={this.hide}/>
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
