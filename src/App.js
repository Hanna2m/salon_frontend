import "./App.css";

import Services from "./components/Services";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <h1>Home page</h1>
      <Services />
      <Signup />
    </div>
  );
}

export default App;
