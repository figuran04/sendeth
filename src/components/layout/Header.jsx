import Link from "next/link"
import ThemeToggle from "../ui/ThemeToggle"

const Header = () => {
  return (
    <header className="shadow p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-primary font-heading text-lg">SendErc</Link>
      <nav className="space-x-4 text-base">
        <ThemeToggle />
      </nav>
    </header>

  )
}

export default Header
