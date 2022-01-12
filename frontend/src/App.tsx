import Header from "./components/header";
import style from "./App.module.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <div className={style.big}>start</div>
    </div>
  );
}

export default App;
