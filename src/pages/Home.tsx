
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Features from '../components/Features';
import Showcase from '../components/Showcase';
import Awards from '../components/Awards';
import Exhibitions from '../components/Exhibitions';
import Leadership from '../components/Leadership';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Ticker from '../components/Ticker';

const Home = () => {
  return (
    <>
      <Hero />
      <Ticker />
      <TrustedBy />
      <Features />
      <Showcase />
      <Awards />
      <Exhibitions />
      <Leadership />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
