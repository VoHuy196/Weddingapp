import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import WeddingInfo from './components/WeddingInfo';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white">
      <Hero />
      <OurStory />
      <Gallery />
      <WeddingInfo />
      <RSVP />
      <Footer />
    </div>
  );
}

export default App;
