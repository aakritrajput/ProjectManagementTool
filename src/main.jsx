import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/store'
import { Provider } from 'react-redux'
import Root from './components/Layout/Root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home/Home'
import MainDashboard from './components/mainDashboard/mainDashboard'
import DashBoard from './components/dashboard/DashBoard'
import Projects from './components/projects/Projects'
import Register from './components/register/Register'
import Login from './components/login/Login'
import ViewProjects from './components/viewProjects/ViewProjects'

const BrowserRouter = createBrowserRouter([
  {
    path:'/',
    element: <Root/>,
    children:[
      {
        path:'',
        element:<Home/>,
      }
    ]
  },
  {
    path:'/home',
    element: <MainDashboard/>,
    children:[
      {
        path:'',
        element:<DashBoard/>
      },
      {
        path:'createProject',
        element:<Projects/>
      }
    ]
  },
  {
    path:'/projects/:name',
    element:<ViewProjects/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={BrowserRouter}/>
    </Provider>
  </StrictMode>,
)
