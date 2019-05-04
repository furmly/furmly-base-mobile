import { API_MIDDLEWARE_SYMBOL, ACTIONS } from "furmly-client";
import fixture from "./fixtures";
export const apiMiddleware = ({ getState, dispatch }) => next => action => {
  const state = getState();
  if (!action[API_MIDDLEWARE_SYMBOL]) {
    return next(action);
  }
  const [pre, post] = action[API_MIDDLEWARE_SYMBOL].types;
  dispatch(pre);

  setTimeout(() => {
    const response = {
      json: () =>
        new Promise((resolve, reject) => {
          let result;
          console.warn(post);
          console.warn(pre);
          switch (post.type) {
            case ACTIONS.FURMLY_PROCESSOR_RAN:
            case ACTIONS.FETCHED_PROCESS:
            case ACTIONS.GOT_ITEM_TEMPLATE:
              //case ACTIONS.
              result = fixture[pre.meta.id || pre.meta];
              break;
            default:
              return reject();
          }
          if (!result)
            return reject("Cannot find anything matching your query");
          resolve(result);
        })
    };
    post
      .payload(action, state, response)
      .then(x => {
        dispatch({ ...post, payload: x });
      })
      .catch(e => console.warn(e));
  }, 500);
};
