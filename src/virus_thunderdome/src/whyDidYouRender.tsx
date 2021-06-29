import React from "react";

// WHY DID YOU RENDER?!
// library for debugging unnecessary re-renders
// https://github.com/welldone-software/why-did-you-render
// https://github.com/welldone-software/why-did-you-render/issues/85#issuecomment-596682587
if (process.env.NODE_ENV === "development") {
  // Steps to debug performance:

  // 1. use the React Dev Tools - Profiler tab, ensure the setting "record why each component rendered" is checked
  // - start recording, perform a slow/janky action, stop recording
  // - click to the biggest commit in the top right bar chart
  // - see which components re-rendered and why
  // - think, did they need to render, are they huge/expensive components?

  // if you find a component re-rendering unnecessarily, and it was because
  // "hooks changed" (not very useful info), we can use whyDidYouRender to get more info

  // to log *unnecessary* component re-renders: (e.g. props changed, different objects but same values)
  // MyComponent.whyDidYouRender = true;

  // to log *all* component re-renders: (e.g. debug why a component is re-rendering when it shouldn't)
  // MyComponent.whyDidYouRender = { logOnDifferentValues: true };

  // here's two snippets "why" and "whyy" for your global snippets file:
  /*
  "whyDidYouRender": {
    "prefix": "why",
    "scope": "javascript,typescript, javascriptreact, typescriptreact",
    "body": ["whyDidYouRender = true;"],
    "description": "why did you render unnecessarily?!?!?"
  },
  "whyDidYouRenderLogAll": {
    "prefix": "whyy",
    "scope": "javascript,typescript, javascriptreact, typescriptreact",
    "body": ["whyDidYouRender = { logOnDifferentValues: true };"],
    "description": "why did you render at all?!?!?"
  },
  */

  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    // * Comment these out if your console is getting spammed
    // trackAllPureComponents: true,
    // trackHooks: true,
    // trackExtraHooks: [[require("react-redux/lib"), "useSelector"]]
  });
}
