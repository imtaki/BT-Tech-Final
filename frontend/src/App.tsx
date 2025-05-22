import Layout from './components/Layout';
import Home from './pages/Home';
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter, Route, Routes} from 'react-router'
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import EditSubpage from "./pages/EditSubpage.tsx";
import EditLayout from "./components/EditLayout.tsx";
import EditorPanel from "./pages/EditorPanel.tsx";
import SubpageView from "./pages/SubpageView.tsx";
import DynamicPageView from "./pages/DynamicPageView.tsx";
import EditPage from "./pages/EditPage.tsx";

export default function App() {
  return (
    <>
      <BrowserRouter >
        <Routes >
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/:slug/:id' element={<SubpageView />} />
                <Route path='/:slug' element={<DynamicPageView/>}/>
            </Route>
            
            <Route path='/login' element={<Login />} />

            <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminPanel />} />
            </Route>

            <Route path="/editor" element={<EditLayout/>}>
              <Route index element={<EditorPanel />} />
            </Route>

            <Route path="/subpage/edit/" element={<EditLayout/>}>
                <Route path="/subpage/edit/:id" element={<EditSubpage />}/>
            </Route>

            <Route path="/pages/edit/" element={<EditLayout/>}>
                <Route path="/pages/edit/:slug" element={<EditPage />}/>
            </Route>
            
            <Route path='/not-found' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}