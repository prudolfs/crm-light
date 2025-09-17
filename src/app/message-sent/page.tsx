import { MessageSent as MessageSentPopup } from '@/components/message-sent'

export default function MessageSent() {
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
            We’ve received your message and our team will get back to you
            shortly. In the meantime, thank you for considering us as your
            partner in bringing ideas to life.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <MessageSentPopup />
      </div>
    </section>
  )
}
