import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout   from './components/layout/DashboardLayout.jsx';
import Home              from './pages/Home/Home.jsx';
import UserList          from './pages/users/UserList.jsx';
import UserDetail        from './pages/users/UserDetail.jsx';
import UserForm          from './pages/users/UserForm.jsx';
import ProductList       from './pages/products/ProductList.jsx';
import ProductDetail     from './pages/products/ProductDetail.jsx';
import ProductForm       from './pages/products/ProductForm.jsx';
import Orders            from './pages/orders/Orders.jsx';
import Deliveries        from './pages/deliveries/Deliveries.jsx';
import Stats             from './pages/stats/Stats.jsx';
import Notifications     from './pages/notifications/Notifications.jsx';
import SystemHealth      from './pages/systemHealth/SystemHealth.jsx';
import Logs              from './pages/logs/Logs.jsx';
import Settings          from './pages/settings/Settings.jsx';
import Profile           from './pages/profile/Profile.jsx';
import Logout            from './pages/logout/Logout.jsx';
import Login             from './pages/Login/Login.jsx';
import NotFound          from './pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Auth (no dashboard shell) ── */}
        <Route path="/login"  element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* ── Dashboard shell (all children share sidebar + navbar) ── */}
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />

          {/* Users */}
          <Route path="users"            element={<UserList />} />
          <Route path="users/new"        element={<UserForm mode="create" />} />
          <Route path="users/:userId"    element={<UserDetail />} />
          <Route path="users/:userId/edit" element={<UserForm mode="edit" />} />

          {/* Products */}
          <Route path="products"               element={<ProductList />} />
          <Route path="products/new"           element={<ProductForm mode="create" />} />
          <Route path="products/:productId"    element={<ProductDetail />} />
          <Route path="products/:productId/edit" element={<ProductForm mode="edit" />} />

          {/* Other pages */}
          <Route path="orders"        element={<Orders />} />
          <Route path="deliveries"    element={<Deliveries />} />
          <Route path="stats"         element={<Stats />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="system-health" element={<SystemHealth />} />
          <Route path="logs"          element={<Logs />} />
          <Route path="settings"      element={<Settings />} />
          <Route path="profile"       element={<Profile />} />
        </Route>

        {/* ── Catch-all ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
