import '../styles/App.css';
import { db } from '../firebase-config';
import { getDatabase, ref, set } from "firebase/database";

function App() {
  return (
    <div data-testid="testComponent">
      test
    </div>
  );
}

export default App;