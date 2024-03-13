"use client"
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-bold">
              Stripe Store
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/">
              Home
            </Link>
            <Link href="/login">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
