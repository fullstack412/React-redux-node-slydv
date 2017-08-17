import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { postNewDeck } from '../store';

class NewDeckForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      newDeck : {
        deckTitle : "", 
        viewable : false, 
        hasFooter: false,
        chats : ""
      }
    }
    this.handleChange  = this.handleChange.bind(this);
    this.handleSubmit = this. handleSubmit.bind(this);
  }
  handleChange(e){
   this.setState({
    newDeck : Object.assign({}, this.state.newDeck, { [e.target.name] : e.target.value })
  })
 }
   handleSubmit(){
    this.props.sendDeck(Number(this.props.user.id), this.state.newDeck);
    
   }
   render(){
    return (
     <div className="NewDeckForm" onChange={ this.handleChange }>
     Is there anything more beautiful than a fresh deck? 
      <form  className="form-horizontal">
        <label className="control-label">Deck Title</label>
        <textarea name="deckTitle"/> 
        <br/>
           <label>Choose a Deck Theme</label>
           <select>
             <option value='red'>Red</option>
             <option value='green'>Green</option>
             <option value='blue'>Blue</option>
           </select>
       <form>
        <label className="control-label">Do you Need a Footer?</label>     
        <input type="radio" name="hasFooter" value="true" />Yes
        <input type="radio" name="hasFooter" value="false" />No
       </form>
       <form>
        <label className="control-label">Viewable:</label>     
        <input type="radio" name="viewable" value="true" />Yes
        <input type="radio" name="viewable" value="false" />No
       </form> 
      </form>
      <button type="submit" onClick={ this.handleSubmit }>Save & Start Your Deck</button>
     </div>
      )
   }
}

const mapState = (state) => ({
  user : state.user, 
  deck : state.deck

})
const mapDispatch = dispatch => ({
 sendDeck(userId, deck){
  dispatch(postNewDeck(userId, deck))}
})

export default connect(mapState, mapDispatch)(NewDeckForm); 




