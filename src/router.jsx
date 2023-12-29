import { useRoutes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NewContact from './pages/NewContact/NewContact';
import Edit from './pages/EditContact/EditContact';

function Router() {
  const router = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/new', element: <NewContact /> },
    { path: '/edit/:id', element: <Edit /> },
  ]);

  return router;
}

export default Router;
