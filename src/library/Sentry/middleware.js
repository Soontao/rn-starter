import { Raven } from ".";

const identity = stuff => stuff;

export function createRavenMiddleware(cfg = {}, options = {}) {


  return store => next => action => {

    const {
      actionTransformer = identity,
      stateTransformer = identity,
    } = options;

    try {
      Raven.captureBreadcrumb({
        category: "redux",
        message: action.type,
      });

      return next(action);
    } catch (err) {

      // Send the report.
      Raven.captureException(err, {
        extra: {
          action: actionTransformer(action),
          state: stateTransformer(store.getState()),
        }
      });
    }
  };
}
