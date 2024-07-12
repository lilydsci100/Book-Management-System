
import Book from '../pages/Book'
import Publish from '../pages/Publish'
import GeekLayout from '../pages/Layout'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { createBrowserRouter } from 'react-router-dom'


// 配置路由实例

const router = createBrowserRouter([
  {
    path: "/",
    element: <GeekLayout />,
    children: [
      {
        path: 'books',
        element: <Book />
      },
      {
        path: 'publish',
        element: <Publish />
      },
      {
        path: 'Home',
        element: <Home />
      }
    ]
  },
  {
    path: "/Login",
    element:<Login />
  }
])

export default router