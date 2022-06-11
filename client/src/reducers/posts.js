import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
/* eslint-disable import/no-anonymous-default-export */
export default (post = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      //console.log("Action", action.payload);
      return action.payload;
    case CREATE:
      //console.log([...state, action.payload]);
      return [...post, action.payload];

    case UPDATE:
      //console.log([...state, action.payload]);
      return post.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      //console.log([...state, action.payload]);
      return post.filter((post) => post._id !== action.payload);

    case LIKE:
      //console.log([...state, action.payload]);
      return post.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return post;
  }
};
