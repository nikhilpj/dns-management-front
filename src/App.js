import './App.css'
import Login from '../src/components/Login';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddRecord from './components/AddRecord';
import DeleteRecord from './components/DeleteRecord';
import EditRecord from './components/EditRecord';
import AddHostingZone from './components/AddHostingZone';
import ViewHostingZone from './components/ViewHostedZone';
import Main from './components/Main';



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
      path:'/dashboard/:encodedRecord',
      element:<Dashboard/>
    },
    {
      path:'/add/:name/:id',
      element:<AddRecord/>
    },
    {
      path:'/delete/:encodedRecord/:name/:id',
      element:<DeleteRecord/>
    },
    {
      path:'/edit/:encodedRecord/:name/:id',
      element:<EditRecord/>
    },
    {
      path:'/addhostingZone',
      element:<AddHostingZone/>
    },
    {
      path:'/view',
      element:<ViewHostingZone/>
    },
    {
      path:'/main',
      element:<Main/>
    }

  ])
  return( <>
    <RouterProvider router={appRouter}/>
    </>)
 
 
}

export default App;
