import logo from './logo.svg'
import './App.css'
import useSSE from './hook/useSSE';

function App() {

  const createImageProfile = () => {
    fetch(`${location.origin}/message`, {
      mode: 'cors',
    })
      .then((res) => res.json() as unknown as { ts: number })
      .then((d) => connectTarget(d.ts));
  }
  
  const [state, connectTarget] = useSSE(`${location.origin}/stream`);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button type="button" onClick={createImageProfile}>
            test & connect
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
