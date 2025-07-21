import { Helmet } from 'react-helmet'
import AllBlog from '../assets/component/HomeComponents.jsx/AllBlog'
import ContactForm from '../assets/component/HomeComponents.jsx/ContactForm'
import Footer from '../assets/component/HomeComponents.jsx/Footer'
import Header from '../assets/component/HomeComponents.jsx/Header'
import Hero from '../assets/component/HomeComponents.jsx/Hero'
import HomeAbout from '../assets/component/HomeComponents.jsx/HomeAbout'
import MeetOurPastors from '../assets/component/HomeComponents.jsx/MeetOurPastors'
import ReadBlog from '../assets/component/HomeComponents.jsx/ReadBlog'
import UpComingEvents from '../assets/component/HomeComponents.jsx/UpComingEvents'
import ViewEvents from '../assets/component/HomeComponents.jsx/ViewEvents'
import WelcomeCards from '../assets/component/HomeComponents.jsx/WelcomeCards'
import Worship from '../assets/component/HomeComponents.jsx/Worship'

function Home() {
  return (
    <>
      <Helmet>
        <title>CAC Lightway Assembly Church</title>
      </Helmet>
      <Header />
      <Hero />
      <HomeAbout />
      <WelcomeCards />
      <Worship />
      <MeetOurPastors />
      {/* <UpComingEvents /> */}
      <ViewEvents />
      {/* <ReadBlog /> */}
      <AllBlog />
      <ContactForm />
      <Footer />
    </>
  )
}

export default Home