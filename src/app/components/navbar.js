import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#F7FAFC] p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="text-[#4A5568] text-2xl font-bold mb-4 sm:mb-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 hover:text-[#2D3748]">
          🧘 Stoic Wisdom
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-[#4A5568] hover:text-[#2D3748]">Home</Link>
          <Link href="/books" className="text-[#4A5568] hover:text-[#2D3748]">Books</Link>
        </div>
      </div>
    </nav>
  );
}