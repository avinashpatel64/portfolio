export default function Toast({ message, show }) {
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      {message}
    </div>
  )
}
