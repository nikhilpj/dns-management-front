import './App.css'
import Login from '../src/components/Login';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddRecord from './components/AddRecord';
import DeleteRecord from './components/DeleteRecord';
import EditRecord from './components/EditRecord';



function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    },
    {
      path:'/add',
      element:<AddRecord/>
    },
    {
      path:'/delete/:encodedRecord',
      element:<DeleteRecord/>
    },
    {
      path:'/edit/:encodedRecord',
      element:<EditRecord/>
    }

  ])
  return( <>
    <RouterProvider router={appRouter}/>
    </>)
 
 
}

export default App;
