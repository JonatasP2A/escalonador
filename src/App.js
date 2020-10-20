import React from "react";
import Page from './page';
import Store from './contexts/index'


const app = () => {
  return (
    <Store>
      <Page />
    </Store>
  );
}

export default app;