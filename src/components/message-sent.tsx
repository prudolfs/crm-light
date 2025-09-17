'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { MailCheck, Undo2 } from 'lucide-react'

function MessageSent() {
  return (
    <motion.div
      initial={{ opacity: 0.25, scaleX: 0.75, scaleY: 0.75 }}
      whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{
        opacity: { duration: 1 },
        scaleX: { type: 'spring', stiffness: 200, damping: 15 },
        scaleY: { type: 'spring', stiffness: 200, damping: 15 },
      }}
      viewport={{ once: true }}
      className="mx-8 max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4 text-center backdrop-blur-xs lg:p-8"
    >
      <h3 className="mb-4 text-2xl font-bold text-white">
        Message Sent Successfully
      </h3>
      <div>
        <MailCheck className="mx-auto mb-4 h-8 w-8 text-green-400" />
      </div>
      <p className="text-md mb-6">
        <span className="text-blue-400">Thanks</span> for reaching out! We’ll
        get back to you shortly.
      </p>
      <div className="flex justify-center">
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
        >
          Go Back
          <Undo2 size={20} />
        </Link>
      </div>
    </motion.div>
  )
}

export { MessageSent }
