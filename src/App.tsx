import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Budget from './pages/Budget';
import Home from './pages/Home';
import NavBar from './layout/NavBar';


const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/budget-app',
        element: <Budget  />,
      },
      {
        path: '*',
        element: <h1>404 Page Not Found</h1>,
      }
      ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
