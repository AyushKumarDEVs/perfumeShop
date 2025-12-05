export default function Footer() {
  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full
        py-2 px-4
        text-[11px]
        flex items-center justify-between
        bg-gray-100 dark:bg-gray-900
        text-gray-700 dark:text-gray-300
        border-t border-gray-300 dark:border-gray-700
        z-50
      "
    >
      <span>© {new Date().getFullYear()} All rights reserved</span>
      <span className="font-semibold">Olcademy</span>
    </footer>
  );
}
