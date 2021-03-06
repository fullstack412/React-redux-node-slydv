import axios from 'axios';
import { fetchDeck } from './deck';
import socket from '../socket';

/* -------------- ACTION TYPES -------------- */

const GET_SLIDE_LIST = 'GET_SLIDE_LIST';
const GET_SINGLE_SLIDE = 'GET_SINGLE_SLIDE';

/* -------------- INITIAL STATE -------------- */

const initialState = {
  slideList: [],
  singleSlide: {},
};

/* -------------- ACTION CREATORS -------------- */

const getSlideList = slideList => ({ type: GET_SLIDE_LIST, slideList });
export const getSingleSlide = singleSlide => ({ type: GET_SINGLE_SLIDE, singleSlide });

/* -------------- THUNK CREATORS -------------- */

export function getSlideAndEmit(slide) {
  return function thunk(dispatch) {
    socket.emit('change-slide', slide);
    return dispatch(getSingleSlide(slide));
  };
}

export function fetchSlideList(deckId) {
  return function thunk(dispatch) {
    return axios.get(`/api/decks/${deckId}/slides`)
      .then(res => dispatch(getSlideList(res.data)))
      .catch(error => console.log(error));
  };
}

export function fetchSingleSlide(slideId) {
  return function thunk(dispatch) {
    return axios.get(`/api/slides/${slideId}`)
      .then(res => dispatch(getSingleSlide(res.data)))
      .catch(error => console.log(error));
  };
}

export function createSlide(slide, history) {
  return function thunk(dispatch) {
    return axios.post('/api/slides', slide)
      .then(res => {
        history.push(`/editslide/${res.data.id}`)
        return dispatch(getSingleSlide(res.data))
      })
      .catch(error => console.log(error));
  };
}

export function changeSlide(slideId, slide) {
  return function thunk(dispatch) {
    return axios.put(`/api/slides/${slideId}`, slide)
      .then(res => dispatch(getSingleSlide(res.data)))
      .catch(error => console.log(error));
  };
}

export function deleteSlide(slideId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/slides/${slideId}`)
      .catch(error => console.log(error));
  };
}

/* -------------- REDUCER -------------- */

export default function (state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_SLIDE_LIST:
      newState.slideList = action.slideList;
      break;
    case GET_SINGLE_SLIDE:
      newState.singleSlide = action.singleSlide;
      break;
    default:
      return state;
  }
  return newState;
}
