import React from "react";
import Page from './page';

import ProcessProvider from './contexts/process';

const app = () => {
  return (
    <ProcessProvider>
      <Page />
    </ProcessProvider>
  );
}

export default app;