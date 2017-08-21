import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import { fetchDeck, fetchSlideList, fetchMessages, postMessage } from '../store';


class ChatBox extends Component {
  constructor(props){
  	super(props);
    this.state = {
      currentMessage: ""
    }
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
  	this.setState({ currentMessage: e.target.value });
  }
  handleSubmit(e){
  	e.preventDefault();
  	this.props.sendMessage(this.props.deck.id, this.props.user.id, this.state.currentMessage)
    this.setState({ currentMessage: "" })
  }

  componentDidMount(){
  	const deckId = +this.props.match.params.deckId;
  	this.props.loadDeck(deckId)
    this.props.loadChats(deckId)
  }

  // componentWillReceiveProps(nextProps){
  //   if (this.props.chats.length !== nextProps.chats.length){

  //   }
  // }

  render(){
  	let chats = this.props.chats;
  	let email = this.props.user.email;
  	let deck = this.props.deck;
  	return (
      <div className="chat-box">
       {
        chats.map(chat => <div id={ chat.id }><span>{ email + " : " + chat }</span></div>)
       }
        <div className="dqpl-field-wrap">
          <label className="dqpl-label" htmlFor="currentMessage" id="currentMessage-label">Speak!</label>
          <input className="dqpl-text-input" type="text" id="currentMessage" value={this.state.currentMessage} onChange={this.handleChange} aria-labelledby="title-label" />
        </div>
        <button type="submit" onSubmit={this.handleSubmit}>Send</button>
      </div>
  	)
  }
}

const mapState = state => ({
  deck: state.deck,
  slides: state.slide.slideList,
  user: state.user,
  chats: state.chats 
});

const mapDispatch = dispatch => ({
	loadDeck(deckId){
		return dispatch(fetchDeck(deckId));
	},
	loadSlides(deckId){
		return dispatch(fetchSlideList(deckId));
	},
	loadChats(deckId){
    return dispatch(fetchMessages(deckId));
  }, 
  sendMessage(deckId, userId, message){
    return dispatch(postMessage(deckId, userId, message));
  }
});

export default withRouter(connect(mapState, mapDispatch)(ChatBox));
