import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import ReactGA from "react-ga";

ReactGA.initialize("G-RMP0BKW0EL");
ReactGA.pageview(window.location.pathname + window.location.search);

export const PERFORMANCE_METRICS = "performance-metrics";

if (process.env.NODE_ENV === "production") {
  console.log(`Setting up LogRocket, env: ${process.env.NODE_ENV}`);
  // set up LogRocket before Sentry to allow sharing session URL
  LogRocket.init("baplwe/virus-terrarium");
  setupLogRocketReact(LogRocket);
  console.log(
    `Setting up error reporting service, env: ${process.env.NODE_ENV}`
  );
  Sentry.init({
    dsn: "https://6712fd5790fe4b5ba7e75a21954bfcc1@o576653.ingest.sentry.io/5730520",

    // tracing
    integrations: [new Integrations.BrowserTracing()],

    // --- Traces Sample Rate ---

    // static sample rate
    tracesSampleRate: 0.2, // ! deactivated for now since it hasn't been providing any value; we use Honeycomb instead

    // development:
    // tracesSampleRate: 1

    // * investigate Sentry.withProfiler for instrumenting components with react.mount, react.render, react.update events https://docs.sentry.io/platforms/javascript/guides/react/components/profiler/
  });

  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra("sessionURL", sessionURL);
    });
  });
} else {
  console.log(
    `Skip setting up error reporting service, env: ${process.env.NODE_ENV}`
  );
}
