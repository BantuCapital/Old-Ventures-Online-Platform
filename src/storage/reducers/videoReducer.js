import { FETCH_VIDEOS} from '../actions/types';

const initialState = {
  videos:[],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_VIDEOS:
      return {
      	...state,
        videos: action.payload
      }
 default:
      return state;
  }
  
}