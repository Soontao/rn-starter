import { Raven } from ".";

const identity = stuff => stuff;

export function createRavenMiddleware(cfg = {}, options = {}) {


  return store => next => action => {

    const {
      actionTransformer = identity,
      stateTransformer = identity,
      logger = console.error.bind(console, "[redux-raven-middleware] Reporting error to Sentry:")
    } = options;

    try {
      Raven.captureBreadcrumb({
        category: "redux",
        message: action.type,
      });

      return next(action);
    } catch (err) {
      logger(err);

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
