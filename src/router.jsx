import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NewContact from './pages/NewContact/NewContact';
import Edit from './pages/EditContact/EditContact';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}

export default Router;
