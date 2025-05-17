import Layout from './components/Layout';
import Home from './pages/Home';
import './index.css'
import { BrowserRouter, Route, Routes} from 'react-router'
import Login from './pages/Login';
import About from './pages/About';
import Research from './pages/Research';
import Studies from './pages/Studies';
import AdminLayout from './components/AdminLayout';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import EditSubpage from "./pages/EditSubpage.tsx";
import EditLayout from "./components/EditLayout.tsx";


export default function App() {
  return (
    <>
      <BrowserRouter >
        <Routes >
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/research' element={<Research />} />
                <Route path='/studies' element={<Studies />} />
            </Route>
            
            <Route path='/login' element={<Login />} />

            <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminPanel />} />
            </Route>

            <Route path="/subpage/edit/" element={<EditLayout/>}>
                <Route path="/subpage/edit/:id" element={<EditSubpage />}/>
            </Route>
            
            <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}