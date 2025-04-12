import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  console.log(location)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/loanlist', label: 'Loan List'  },
    { path: '/paymenthistory', label: 'Payment History' }
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-8">Loan Manager 💰</h1>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-700 transition ${
            location.pathname === item.path ? 'bg-red-700' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
