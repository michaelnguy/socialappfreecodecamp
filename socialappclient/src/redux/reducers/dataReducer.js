import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  SET_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case POST_SCREAM:
      return { ...state, screams: [action.payload, ...state.screams] };
    case SUBMIT_COMMENT:
      console.log(action.payload);
      let screamsIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.newComment.screamId
      );
      console.log(screamsIndex);
      state.screams[screamsIndex] = action.payload.updatedScream;
      console.log(state.screams[screamsIndex]);
      console.log(state.screams);

      return {
        ...state,
        screams: [...state.screams],
        scream: {
          ...state.scream,
          comments: [action.payload.newComment, ...state.scream.comments],
          commentCount: state.scream.commentCount + 1,
        },
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };

    case DELETE_SCREAM:
      let delete_index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(delete_index, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}
export default dataReducer;
