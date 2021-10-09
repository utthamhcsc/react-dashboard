import { CssBaseline } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pages from './pages';
import './App.css';
function App() {
  return (
    <div className="bg-aliceblue vh-100 vw-100">
      <CssBaseline />
      <Pages />
      <ToastContainer />
    </div>
  );
}

export default App;
