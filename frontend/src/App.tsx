import Layout from './components/Layout';
import Home from './components/Home';
import './index.css'
import { BrowserRouter, Route, Routes} from 'react-router'
export default function App() {
  return (
    <>
      <BrowserRouter >
        <Routes >
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}