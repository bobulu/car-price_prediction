import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userdata) => { 
      if (userdata) {
        
        dispatch(login({userdata}));
      }
      else{
        dispatch(logout())
      }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen flex flex-col justify-start items-center bg-slate-900">
        <div className="w-full max-w-4xl px-4 text-white text-center">
          <Header />
          <main className="text-white text-center">
         
             {/* Example content */}
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default App;