import React, { useState } from "react";

function App() {
  const [userFirstRow, setUserFirstRow] = useState();
  const [userSecondRow, setUserSecondRow] = useState();
  const [userThirdRow, setUserThirdRow] = useState();

  const [realTimeRow, setRealTimeRow] = useState();

  return <h1>Fala, Joao</h1>;
}

export default App;
