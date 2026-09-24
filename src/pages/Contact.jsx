import { useState } from 'react'
import Reveal from '../components/Reveal'
import RevealLines from '../components/RevealLines'

const fieldClassName =
  'w-full border-b border-black bg-transparent pb-2 text-base text-black outline-none placeholder:text-black/40 focus:border-black/60'

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Portfolio contact from ${form.firstName} ${form.lastName}`.trim(),
    )
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.firstName} ${form.lastName} (${form.email})`,
    )
    window.location.href = `mailto:4avinashp@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <main>
      <section className="px-6 pt-25 pb-24 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-[2fr_3fr_5fr] sm:items-start">
          <RevealLines
            as="h1"
            className="text-[42px] font-medium leading-none tracking-tight text-black sm:text-[clamp(1.95rem,4.8vw,4.875rem)]"
          >
            Contact
          </RevealLines>

          <div className="grid grid-cols-1 gap-6 sm:translate-x-[80px]">
            <div>
              <RevealLines as="h3" delay={80} className="text-sm font-normal tracking-tight text-black">
                Email
              </RevealLines>
              <RevealLines as="p" delay={130} className="mt-2 text-base leading-snug text-black">
                4avinashp@gmail.com
              </RevealLines>
            </div>
            <div>
              <RevealLines as="h3" delay={180} className="text-sm font-normal tracking-tight text-black">
                Address
              </RevealLines>
              <RevealLines
                as="p"
                delay={230}
                lines={['H 201, Marvel Zephyr,', 'Kharadi, Pune, MH', '411014']}
                className="mt-2 text-base leading-snug text-black"
              />
            </div>
          </div>

          <Reveal as="form" duration={700} delay={160} onSubmit={handleSubmit} className="grid gap-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <RevealLines as="span" className="text-sm font-normal tracking-tight text-black">
                  First Name
                </RevealLines>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className={fieldClassName}
                />
              </label>
              <label className="flex flex-col gap-2">
                <RevealLines as="span" delay={40} className="text-sm font-normal tracking-tight text-black">
                  Last Name
                </RevealLines>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className={fieldClassName}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <RevealLines as="span" delay={80} className="text-sm font-normal tracking-tight text-black">
                Email
              </RevealLines>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={fieldClassName}
              />
            </label>

            <label className="flex flex-col gap-2">
              <RevealLines as="span" delay={120} className="text-sm font-normal tracking-tight text-black">
                Message
              </RevealLines>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={3}
                className={`${fieldClassName} resize-none`}
              />
            </label>

            <Reveal
              as="button"
              type="submit"
              delay={160}
              className="w-fit rounded-full border border-black px-6 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Submit
            </Reveal>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
