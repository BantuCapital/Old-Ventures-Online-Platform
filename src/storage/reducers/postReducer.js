import { FETCH_POSTS,FETCH_VIDEOS, FETCH_PROFILE } from '../actions/types';

const initialState = {
  items: [],
  videos:[],
  profile:[]
};

export default function(state = initialState, action) {
  switch (action.type) {

     case FETCH_VIDEOS:
      return {
        ...state,
        videos: action.payload
      }
    case FETCH_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
 default:
      return state;
  }
  
}