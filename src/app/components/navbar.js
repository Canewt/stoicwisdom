import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 mb-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center sm:flex-row sm:justify-between">
        <div className="sm:w-1/3"></div> {/* Spacer for left side on larger screens */}
        <Link href="/" className="text-[#4A5568] text-2xl font-bold mb-4 sm:mb-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 hover:text-[#2D3748]">
          🧘 Stoic Wisdom
        </Link>
        <ul className="flex space-x-4 sm:w-1/3 sm:justify-end">
          <li><Link href="/" className="text-[#4A5568] hover:text-[#2D3748]">Home</Link></li>
          <li><Link href="/books" className="text-[#4A5568] hover:text-[#2D3748]">Books</Link></li>
        </ul>
      </div>
    </nav>
  );
}