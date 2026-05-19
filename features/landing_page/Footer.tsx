import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 text-center sm:text-left">
          © 2026 HarvestTrack. Built for the Great Commission.
        </p>

        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-6">
            {FOOTER_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200
                             focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-[#2E9E52]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
