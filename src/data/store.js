/**
 * Central in-memory demo data store.
 * All pages read from and write to this module so data stays consistent.
 * No backend — changes are NOT persisted across page refresh (intentional demo limitation).
 */

// ── Users ────────────────────────────────────────────────
export let users = [
  { id: 1,  username: 'mama abdu',           email: 'mama22@gmail.com',    phone: '+251 944 567 890', role: 'Admin',    status: 'active',  img: 'https://i.pravatar.cc/150?img=12', age: 35, address: '1 addis ababa, The Wall',   country: 'Ethiopia',  createdAt: '2024-01-10' },
  { id: 2,  username: 'Jamie Lannister',    email: 'jamie@gmail.com',      phone: '+1 844 567 870', role: 'Editor',   status: 'active',  img: 'https://i.pravatar.cc/150?img=13', age: 42, address: '2 Casterly Rock, Lannisport', country: 'Westeros',  createdAt: '2024-01-15' },
  { id: 3,  username: 'mahir ali',          email: 'mahi@gmail.com',       phone: '+251 934 567 91', role: 'Viewer',   status: 'pending', img: 'https://i.pravatar.cc/150?img=44', age: 45, address: '3 Addisabeba, Kings Landing', country: 'Ethiopia',  createdAt: '2024-02-01' },
  { id: 4,  username: 'Arya Stark',         email: 'arya@gmail.com',       phone: '+1 334 567 92', role: 'Editor',   status: 'active',  img: 'https://i.pravatar.cc/150?img=47', age: 16, address: '4 Winterfell, The North',     country: 'Westeros',  createdAt: '2024-02-10' },
  { id: 5,  username: 'Almaz Kebere',       email: 'almaz@gmail.com',      phone: '+251 934 567 93', role: 'Admin',    status: 'passive', img: 'https://i.pravatar.cc/150?img=49', age: 29, address: '5 bahirdar',               country: 'Ethiopia',     createdAt: '2024-02-20' },
  { id: 6,  username: 'Abdi Mohammed',     email: 'mame02@gmail.com',       phone: '+251 934 567 94', role: 'Viewer',   status: 'active',  img: 'https://i.pravatar.cc/150?img=45', age: 150,address: '6 markos',                 country: 'Ethiopia',     createdAt: '2024-03-01' },
  { id: 7,  username: 'Biniam Alemu',       email: 'biniam33@gmail.com',    phone: '+251 934 567 95', role: 'Editor',   status: 'pending', img: 'https://i.pravatar.cc/150?img=11', age: 44, address: '7 dessie',                  country: 'Ethiopia',   createdAt: '2024-03-10' },
  { id: 8,  username: 'Rossini Frances',    email: 'rossini@gmail.com',     phone: '+1 234 567 96', role: 'Viewer',   status: 'active',  img: 'https://i.pravatar.cc/150?img=14', age: 36, address: '8 Meereen',                   country: 'Essos',     createdAt: '2024-03-15' },
  { id: 9,  username: 'Nuru Ahmed',         email: 'nure@gmail.com',        phone: '+251 934 567 97', role: 'Viewer',   status: 'passive', img: 'https://i.pravatar.cc/150?img=16', age: 65, address: '9 kombolcha, Reach',         country: 'Ethiopia',  createdAt: '2024-03-20' },
];
let _nextUserId = 10;
export const getUsers         = () => [...users];
export const getUserById      = (id) => users.find(u => u.id === Number(id));
export const addUser          = (user) => { const u = { ...user, id: _nextUserId++, img: 'https://i.pravatar.cc/150?img=' + _nextUserId, createdAt: new Date().toISOString().slice(0,10) }; users = [...users, u]; return u; };
export const updateUser       = (id, data) => { users = users.map(u => u.id === Number(id) ? { ...u, ...data } : u); return getUserById(id); };
export const deleteUser       = (id) => { users = users.filter(u => u.id !== Number(id)); };

// ── Products ─────────────────────────────────────────────
export let products = [
  { id: 1,  name: 'Acer Nitro 5',      category: 'Computers',      price: 785,  stock: 12,  status: 'In Stock',   img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',  createdAt: '2024-01-05' },
  { id: 2,  name: 'Playstation 5',     category: 'Gaming',         price: 500,  stock: 5,   status: 'Low Stock',  img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg',  createdAt: '2024-01-10' },
  { id: 3,  name: 'Redragon S101',     category: 'Accessories',    price: 35,   stock: 50,  status: 'In Stock',   img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg',  createdAt: '2024-01-20' },
  { id: 4,  name: 'Razer Blade 15',    category: 'Computers',      price: 2200, stock: 8,   status: 'In Stock',   img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg',  createdAt: '2024-02-01' },
  { id: 5,  name: 'ASUS ROG Strix',    category: 'Computers',      price: 1800, stock: 0,   status: 'Out of Stock',img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg', createdAt: '2024-02-10' },
  { id: 6,  name: 'LG 27" Monitor',    category: 'Displays',       price: 320,  stock: 20,  status: 'In Stock',   img: 'https://i.pravatar.cc/150?img=5',  createdAt: '2024-02-15' },
  { id: 7,  name: 'Logitech MX Keys', category: 'Accessories',    price: 99,   stock: 30,  status: 'In Stock',   img: 'https://i.pravatar.cc/150?img=6',  createdAt: '2024-03-01' },
];
let _nextProductId = 8;
export const getProducts      = () => [...products];
export const getProductById   = (id) => products.find(p => p.id === Number(id));
export const addProduct       = (product) => { const p = { ...product, id: _nextProductId++, createdAt: new Date().toISOString().slice(0,10) }; products = [...products, p]; return p; };
export const updateProduct    = (id, data) => { products = products.map(p => p.id === Number(id) ? { ...p, ...data } : p); return getProductById(id); };
export const deleteProduct    = (id) => { products = products.filter(p => p.id !== Number(id)); };

// ── Orders ───────────────────────────────────────────────
export let orders = [
  { id: 1143155, product: 'Acer Nitro 5',    img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg', customer: 'John Smith',    date: '2024-03-01', amount: 785,  method: 'Cash on Delivery', payStatus: 'Paid',    status: 'Approved' },
  { id: 2235235, product: 'Playstation 5',   img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg', customer: 'Michael Doe',   date: '2024-03-01', amount: 500,  method: 'Online Payment',  payStatus: 'Pending', status: 'Pending' },
  { id: 2342353, product: 'Redragon S101',   img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg', customer: 'John Smith',    date: '2024-03-01', amount: 35,   method: 'Cash on Delivery', payStatus: 'Paid',    status: 'Pending' },
  { id: 2357741, product: 'Razer Blade 15',  img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg', customer: 'Jane Smith',    date: '2024-03-01', amount: 2200, method: 'Online',          payStatus: 'Paid',    status: 'Approved' },
  { id: 2342355, product: 'ASUS ROG Strix',  img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg', customer: 'Harold Carol',  date: '2024-03-01', amount: 1800, method: 'Online',          payStatus: 'Refunded',status: 'rejected' },
  { id: 3001122, product: 'LG 27" Monitor',  img: 'https://i.pravatar.cc/150?img=5',                                             customer: 'Sarah Johnson', date: '2024-03-05', amount: 320,  method: 'Online Payment',  payStatus: 'Pending', status: 'Pending' },
];
export const getOrders        = () => [...orders];
export const getOrderById     = (id) => orders.find(o => o.id === Number(id));
export const updateOrderStatus = (id, status) => { orders = orders.map(o => o.id === Number(id) ? { ...o, status } : o); };

// ── Deliveries ───────────────────────────────────────────
export let deliveries = [
  { id: 'DEL-001', orderId: 2235235, customer: 'muaz mostofa',   address: 'dre, NYC',          assigned: 'Seya Driver',  status: 'In Transit',  eta: 'Today 3:00 PM',   updatedAt: '2024-03-05' },
  { id: 'DEL-002', orderId: 1143155, customer: 'John Smith',    address: '456 Oak Ave, LA',         assigned: 'Sara Wheels', status: 'Delivered',   eta: 'Delivered',        updatedAt: '2024-03-04' },
  { id: 'DEL-003', orderId: 2342353, customer: 'Ronaldo goat',    address: 'saudiarebia, meka',    assigned: null,          status: 'Pending',     eta: 'Tomorrow',         updatedAt: '2024-03-05' },
  { id: 'DEL-004', orderId: 2357741, customer: 'Alex joe',    address: '321 Elm St, Houston',     assigned: 'Seya Driver',  status: 'In Transit',  eta: 'Today 6:00 PM',    updatedAt: '2024-03-05' },
  { id: 'DEL-005', orderId: 3001122, customer: 'Sarah Johnson', address: '654 Maple Dr, Phoenix',   assigned: null,          status: 'Pending',     eta: 'Rescheduled',      updatedAt: '2024-03-05' },
  { id: 'DEL-006', orderId: 2342355, customer: 'Mahir Abdellah',  address: 'semera, afarcity',    assigned: 'Sara Wheels', status: 'Cancelled',   eta: 'Cancelled',        updatedAt: '2024-03-03' },
];
export const getDeliveries    = () => [...deliveries];
export const getDeliveryById  = (id) => deliveries.find(d => d.id === id);
export const updateDelivery   = (id, data) => { deliveries = deliveries.map(d => d.id === id ? { ...d, ...data } : d); };

// ── Notifications ────────────────────────────────────────
export let notifications = [
  { id: 1, type: 'user',     text: 'New user registered: Daenerys Targaryen', time: '2 min ago',  read: false },
  { id: 2, type: 'order',    text: 'Order #2235235 payment confirmed',         time: '15 min ago', read: false },
  { id: 3, type: 'delivery', text: 'Delivery DEL-002 completed successfully',  time: '1 hr ago',   read: true  },
  { id: 4, type: 'system',   text: 'System health check passed',               time: '3 hr ago',   read: true  },
  { id: 5, type: 'product',  text: 'Product "ASUS ROG Strix" is out of stock', time: '5 hr ago',   read: false },
  { id: 6, type: 'order',    text: 'Order #3001122 is awaiting payment',        time: '6 hr ago',   read: false },
];
export const getNotifications    = () => [...notifications];
export const markNotifRead       = (id) => { notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n); };
export const markAllNotifsRead   = () => { notifications = notifications.map(n => ({ ...n, read: true })); };
export const getUnreadCount      = () => notifications.filter(n => !n.read).length;
