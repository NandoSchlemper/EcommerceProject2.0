import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './routes/register';
import Login from './routes/login';
import MagicLink from './routes/magicLink';
import Home from './routes/home';
import Cart from './routes/cart';
import Success from './routes/sucess';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magic-link" element={<MagicLink />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

