import React, { useState } from 'react'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <div className='py-20 px-6 min-h-[90vh] container mx-auto'>
      <h1 className='text-4xl font-bold text-white mb-2'>Contact Us</h1>
      <p className='text-neutral-400 mb-10'>We'd love to hear from you! Get in touch with us using the form below.</p>

      <div className='grid md:grid-cols-2 gap-12 max-w-4xl mx-auto'>
        {/* Contact Information */}
        <div className='space-y-8'>
          <h2 className='text-2xl font-bold text-white mb-6'>Contact Information</h2>

          <div className='flex gap-4 items-start'>
            <MdEmail className='text-orange-400 text-2xl flex-shrink-0 mt-1' />
            <div>
              <h3 className='text-white font-semibold mb-1'>Email</h3>
              <p className='text-neutral-400'>support@retromovie.com</p>
            </div>
          </div>

          <div className='flex gap-4 items-start'>
            <MdPhone className='text-orange-400 text-2xl flex-shrink-0 mt-1' />
            <div>
              <h3 className='text-white font-semibold mb-1'>Phone</h3>
              <p className='text-neutral-400'>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className='flex gap-4 items-start'>
            <MdLocationOn className='text-orange-400 text-2xl flex-shrink-0 mt-1' />
            <div>
              <h3 className='text-white font-semibold mb-1'>Address</h3>
              <p className='text-neutral-400'>
                RetroMovie HQ<br/>
                123 Entertainment Ave<br/>
                Hollywood, CA 90001
              </p>
            </div>
          </div>

          <div className='bg-neutral-800 p-6 rounded-lg mt-8'>
            <h3 className='text-white font-semibold mb-3'>Response Time</h3>
            <p className='text-neutral-400 text-sm'>
              We typically respond to inquiries within 24-48 hours during business days. Thank you for your patience!
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className='text-2xl font-bold text-white mb-6'>Send us a Message</h2>

          {submitted && (
            <div className='bg-green-600/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6'>
              ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-white font-semibold mb-2'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Your name'
                className='w-full px-4 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                required
              />
            </div>

            <div>
              <label className='block text-white font-semibold mb-2'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='your@email.com'
                className='w-full px-4 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                required
              />
            </div>

            <div>
              <label className='block text-white font-semibold mb-2'>Subject</label>
              <input
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                placeholder='What is this about?'
                className='w-full px-4 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
                required
              />
            </div>

            <div>
              <label className='block text-white font-semibold mb-2'>Message</label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                placeholder='Your message here...'
                rows='5'
                className='w-full px-4 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none'
                required
              ></textarea>
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-orange-400/50 duration-300 transition-all'
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
