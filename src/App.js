import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/Sidebar';
import { useState } from 'react';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <section className={`${showSidebar&&'blur'}`}>
        <header className="App-header">
          <span className='px-2 ps-3 fw-bold'>&#60; </span>  View Audience
        </header>
        <div>
          <button className='m-5 btn btn-outline-primary border border-2 rounded-0 border-primary' onClick={()=> setShowSidebar(true)} >Save segment</button>
        </div>
      </section>

      <div>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
}

export default App;
