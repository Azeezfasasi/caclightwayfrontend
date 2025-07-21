import React from 'react'
import Header from '../assets/component/HomeComponents.jsx/Header'
import ContactInfo from '../assets/component/HomeComponents.jsx/ContactInfo'
import ContactForm from '../assets/component/HomeComponents.jsx/ContactForm'
import Footer from '../assets/component/HomeComponents.jsx/Footer'
import { Helmet } from 'react-helmet'

function ContactUs() {
  return (
    <>
    <Helmet>
      <title>Contact Us - CAC Lightway Assembly Church</title>
    </Helmet>
    <Header />
    <ContactInfo />
    <ContactForm />
    <Footer />
    </>
  )
}

export default ContactUs