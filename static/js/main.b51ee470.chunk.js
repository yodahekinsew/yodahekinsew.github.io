(this.webpackJsonpyodahe=this.webpackJsonpyodahe||[]).push([[0],{156:function(e,t,s){},157:function(e,t,s){},158:function(e,t,s){"use strict";s.r(t);var i=s(0),o=s.n(i),a=s(15),n=s.n(a),c=(s(59),s(4)),r=s(17),p=s(11),l={selected:"",highlighted:""};var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SELECTED":return Object(p.a)(Object(p.a)({},e),{},{selected:t.payload});case"SET_HIGHLIGHTED":return console.log('Setting the highlighted to "'+t.payload+'"'),Object(p.a)(Object(p.a)({},e),{},{highlighted:t.payload});default:return e}},d=(s(64),s(7)),m=s(8),g=s(10),u=s(9),E=(s(65),s(45)),f=s.n(E),v=s(46),y=s.n(v),b=function(e){Object(g.a)(s,e);var t=Object(u.a)(s);function s(e){var i;return Object(d.a)(this,s),(i=t.call(this,e)).drop=function(){},i.hide=function(){},i.handleClick=function(){i.state.clicked?i.setState({clicked:!1,triangleRotation:90,contentHeight:"0vh",contentOpacity:0}):i.setState({clicked:!0,triangleRotation:180,contentHeight:"100vh",contentOpacity:1})},i.handleEnter=function(){},i.handleLeave=function(){},i.state={clicked:!1,scale:1,animation:"",triangleRotation:90,contentHeight:"0vh",contentOpacity:0},i}return Object(m.a)(s,[{key:"render",value:function(){return console.log(this.props.mode),o.a.createElement("div",{className:"Dropdown",onMouseEnter:this.handleEnter,onMouseLeave:this.handleLeave},o.a.createElement("div",{className:"dropdownHeader",onClick:this.handleClick},o.a.createElement("img",{style:{transform:"rotate(".concat(this.state.triangleRotation,"deg)")},className:"dropdownTriangle",src:"dark"==this.props.mode?y.a:f.a}),o.a.createElement("div",{className:"dropdownLabel ".concat(this.props.mode)},this.props.label)),o.a.createElement("div",{style:{opacity:this.state.contentOpacity,maxHeight:this.state.contentHeight},className:"dropdownContents"},this.props.children))}}]),s}(o.a.Component),S=(s(66),s(47)),w=s.n(S),O=s(48),H=s.n(O),N=s(49),k=s.n(N),C=s(50),x=s.n(C),j=s(51),T=s.n(j);function I(e,t,s,i,a){return o.a.createElement("div",{className:"".concat(t," Option"),style:s==e?{opacity:1}:{},onClick:function(){i(e)},onMouseEnter:function(){a(e)},onMouseLeave:function(){a("")}},e)}var L=function(e){Object(g.a)(s,e);var t=Object(u.a)(s);function s(e){var i;return Object(d.a)(this,s),(i=t.call(this,e)).state={},i}return Object(m.a)(s,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"Overlay"},o.a.createElement("div",{className:"Header",onClick:function(){e.props.setSelected("")}},"YODAHE ALEMU"),o.a.createElement("div",{className:"Options"},o.a.createElement(b,{mode:this.props.mode,label:"ABOUT ME"},I("EDUCATION",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("INTERESTS",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted)),o.a.createElement(b,{mode:this.props.mode,label:"RESEARCH"},I("FARMPULSE",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("NEWS",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted)),o.a.createElement(b,{mode:this.props.mode,label:"EXPERIENCE"},I("GOOGLE",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("NASDAQ",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("INTEL",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("TEACHING",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted)),o.a.createElement(b,{mode:this.props.mode,label:"PROJECTS"},I("TEMPORUN",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("PONGPONGPANIC",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("BLOCKSLIDE",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("64PIXELS",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("HEYREDDIT",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("TAVERN",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("P3N",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted),I("WEBSITES",this.props.mode,this.props.selected,this.props.setSelected,this.props.setHighlighted))),o.a.createElement("div",{className:"ByMe"},"- a website by yodahe -"),o.a.createElement("div",{className:"Contact"},o.a.createElement("a",{href:"/yodahe_resume.pdf"},o.a.createElement("img",{className:"logo",src:w.a})),o.a.createElement("a",{href:"mailto:yodahekinsew@gmail.com"},o.a.createElement("img",{className:"logo",src:H.a})),o.a.createElement("a",{href:"https://www.linkedin.com/in/yodahe-alemu/"},o.a.createElement("img",{className:"logo",src:T.a})),o.a.createElement("a",{href:"https://github.com/yodahekinsew"},o.a.createElement("img",{className:"logo",src:k.a})),o.a.createElement("a",{href:"https://yodahekinsew.itch.io/"},o.a.createElement("img",{className:"logo",src:x.a}))))}}]),s}(o.a.Component),D=Object(c.b)((function(e){return{selected:e.selected,highlighted:e.highlighted}}),(function(e){return{setSelected:function(t){e({type:"SET_SELECTED",payload:t})},setHighlighted:function(t){e({type:"SET_HIGHLIGHTED",payload:t})}}}))(L),R=(s(67),s(52)),A=s.n(R),M=(s(156),function(e){Object(g.a)(s,e);var t=Object(u.a)(s);function s(e){var i;return Object(d.a)(this,s),(i=t.call(this,e)).handleClick=function(){i.setState({width:"100vw"})},i.state={selected:"",markdown:"",width:"25vw"},i}return Object(m.a)(s,[{key:"componentDidUpdate",value:function(){this.state.selected!=this.props.selected&&this.setState({selected:this.props.selected})}},{key:"componentDidMount",value:function(){var e=this;fetch("/Pages/"+this.props.page+".md").then((function(e){return e.text()})).then((function(t){return e.setState({markdown:t})}))}},{key:"render",value:function(){var e=this.state.selected.toLowerCase()==this.props.page,t=this.props.selected.toLowerCase()!=this.props.page&&e,s=this.props.highlighted.toLowerCase()==this.props.page;return o.a.createElement("div",{style:t?{minWidth:"100vw",zIndex:0,opacity:1}:e?{minWidth:"100vw",zIndex:1,opacity:1}:s?{minWidth:"calc(max(350px, min(500px, 25vw)) + .5vw)",zIndex:2,opacity:1}:{minWidth:"calc(max(350px, min(500px, 25vw))",zIndex:0,opacity:0},className:"ContentPage",onClick:this.handleClick},o.a.createElement("div",{style:{borderColor:e?"var(--dark-accent-color)":"var(--light-color)"},className:"Sideline"}),o.a.createElement(A.a,{className:"Markdown",source:this.state.markdown}))}}]),s}(o.a.Component)),P=Object(c.b)((function(e){return{selected:e.selected,highlighted:e.highlighted}}),null)(M),G=s(53),W=s.n(G),B=(s(157),["education","interests","farmpulse","news","google","nasdaq","intel","teaching","temporun","pongpongpanic","blockslide","64pixels","heyreddit","tavern","p3n","websites"]);var U=Object(c.b)((function(e){return{selected:e.selected,highlighted:e.highlighted}}),null)((function(e){for(var t=[],s=0;s<B.length;s++)t.push(o.a.createElement(P,{page:B[s]}));return o.a.createElement("div",{className:"App"},o.a.createElement(D,{mode:"light"}),t,o.a.createElement("img",{style:{opacity:""==e.selected?"1":"0"},src:W.a,className:"yodahe",alt:"yodahe"}))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var _=Object(r.b)(h);n.a.render(o.a.createElement(c.a,{store:_},o.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},45:function(e,t,s){e.exports=s.p+"static/media/green-triangle.29c6a9f7.png"},46:function(e,t,s){e.exports=s.p+"static/media/red-triangle.89d4a886.png"},47:function(e,t,s){e.exports=s.p+"static/media/resume-logo.27bd2e2c.png"},48:function(e,t,s){e.exports=s.p+"static/media/email-logo.9b5a9fed.png"},49:function(e,t,s){e.exports=s.p+"static/media/github-logo.947bb3bc.png"},50:function(e,t,s){e.exports=s.p+"static/media/itchio-logo.a42eea8e.png"},51:function(e,t,s){e.exports=s.p+"static/media/linkedin-logo.4a2f2836.png"},53:function(e,t,s){e.exports=s.p+"static/media/yodahe-green.e549c5d4.png"},54:function(e,t,s){e.exports=s(158)},59:function(e,t,s){},64:function(e,t,s){e.exports=s.p+"static/media/logo.5d5d9eef.svg"},65:function(e,t,s){},66:function(e,t,s){}},[[54,1,2]]]);
//# sourceMappingURL=main.b51ee470.chunk.js.map