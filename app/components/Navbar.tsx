import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-center space-x-4">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
