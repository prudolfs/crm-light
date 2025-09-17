import Image from 'next/image'
import { ContactForm } from '@/components/contact-form'

export default function Home() {
  return (
    <section
      id="contact"
      className="autofill-contact-us min-h-lvh bg-linear-to-b from-slate-900 to-black py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Let's Build Together
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
            Ready to start your timber house journey? Our team of experts is
            here to bring your vision to life with uncompromising quality and
            Nordic craftsmanship.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
