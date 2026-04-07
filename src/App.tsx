import { useState, useCallback } from 'react';
import Envelope from './components/Envelope';
import InvitationCard from './components/InvitationCard';
import Footer from './components/Footer';

function getGuestName(): string {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('guest')?.trim();
  return raw && raw.length > 0 ? raw : 'Bạn và Người thương';
}

function App() {
  const [envelopeDone, setEnvelopeDone] = useState(false);
  const guestName = getGuestName();

  const handleEnvelopeComplete = useCallback(() => setEnvelopeDone(true), []);

  return (
    <div className="bg-white">

      {/* Envelope overlay – tự ẩn khi xong */}
      {!envelopeDone && (
        <Envelope guestName={guestName} onComplete={handleEnvelopeComplete} />
      )}

      {/*
        Dùng opacity:0 (không phải visibility:hidden) để IntersectionObserver
        vẫn hoạt động → whileInView animations chạy ngầm trong khi envelope phủ.
        Khi envelope xong → chuyển opacity:1 tức thì, không cần animation lại.
      */}
      <div style={{
        opacity: envelopeDone ? 1 : 0,
        transition: envelopeDone ? 'opacity 0.25s ease' : 'none',
        // Ngăn scroll/interact khi đang ẩn
        pointerEvents: envelopeDone ? 'auto' : 'none',
      }}>
        <InvitationCard guestName={guestName} />
        <Footer />
      </div>

    </div>
  );
}

export default App;
