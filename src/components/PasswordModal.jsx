import { useEffect, useRef, useState } from 'react'

export default function PasswordModal({ open, onClose, onSubmit }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setValue('')
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-medium tracking-tight text-black">Enter password</h2>
        <p className="mt-1 text-sm text-black/60">
          Please enter Password to access this Case Study.
        </p>
        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Password"
          className="mt-4 w-full rounded-lg border border-black/20 px-4 py-2 text-base text-black outline-none focus:border-black"
        />
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black px-5 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-80"
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  )
}
