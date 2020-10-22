import React from "react";
import Page from './page';
import Store from './store/index'


const app = () => {
  return (
    <Store>
      <Page />
    </Store>
  );
}

export default app;