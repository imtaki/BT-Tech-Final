import Layout from './components/Layout';
import Home from './components/Home';
import './index.css'
import { BrowserRouter, Route, Routes} from 'react-router'
import Login from './pages/Login';
export default function App() {
  return (
    <>
      <BrowserRouter >
        <Routes >
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}