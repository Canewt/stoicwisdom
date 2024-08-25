import './globals.css'
import Navbar from './components/navbar'

export const metadata = {
  title: 'Stoic Wisdom',
  description: 'Daily Stoic quotes for inspiration and reflection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}