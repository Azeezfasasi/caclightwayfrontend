import React from 'react'
import Header from '../assets/component/HomeComponents.jsx/Header'
import AboutMain from '../assets/component/HomeComponents.jsx/AboutMain'
import Footer from '../assets/component/HomeComponents.jsx/Footer'
import { Helmet } from 'react-helmet'

function About() {
  return (
    <>
    <Helmet>
      <title>About Us - CAC Lightway Assembly Church</title>
    </Helmet>
    <Header />
    <AboutMain />
    <Footer />
    </>
  )
}

export default About