import { type FC, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { motion } from 'framer-motion';

const SHEET_URL = 'https://sheetdb.io/api/v1/0x7lvv8dek5jv';
const BASE = import.meta.env.BASE_URL;
// ✏️ Đổi tên file QR tại đây (đặt ảnh vào /public/)
const QR_IMAGE = `${BASE}qr.png`;

interface RSVPModalProps {
  guestName: string;
  onClose: () => void;
}

type Tab = 'rsvp' | 'wish';
type Attendance = 'yes' | 'no';

const sf = { fontFamily: 'Quicksand, sans-serif' };

const RSVPModal: FC<RSVPModalProps> = ({ guestName, onClose }) => {
  const [tab, setTab] = useState<Tab>('rsvp');

  // RSVP state
  const [name, setName] = useState(guestName === 'Bạn và Người thương' ? '' : guestName);
  const [attendance, setAttendance] = useState<Attendance>('yes');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpError, setRsvpError] = useState('');

  // Wish state
  const [wish, setWish] = useState('');
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [wishError, setWishError] = useState('');

  // ── Submit RSVP ─────────────────────────────────────────────
  const handleRSVP = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!name.trim()) { setRsvpError('Vui lòng nhập tên của bạn'); return; }
    setRsvpLoading(true); setRsvpError('');
    try {
      const res = await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), attendance, message: '', timestamp: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error('Network error');
      setRsvpSubmitted(true);
    } catch {
      setRsvpError('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setRsvpLoading(false);
    }
  };

  // ── Submit Wish ──────────────────────────────────────────────
  const handleWish = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!wish.trim()) { setWishError('Vui lòng nhập lời chúc'); return; }
    setWishLoading(true); setWishError('');
    try {
      const res = await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || guestName, attendance: '', message: wish.trim(), timestamp: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error('Network error');
      setWishSubmitted(true);
    } catch {
      setWishError('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setWishLoading(false);
    }
  };

  return (
    /* Backdrop */
    <motion.div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal panel */}
      <motion.div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxHeight: '92vh' }}
        initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
      >
        {/* Header */}
        <div className="relative flex items-center justify-center py-5 px-6"
          style={{ background: 'linear-gradient(135deg, #C8102E, #9e0d23)' }}>
          <span style={{ color: '#f7d774', fontSize: 26, fontFamily: 'serif', marginRight: 10 }}>囍</span>
          <h2 style={{ color: '#fff', fontFamily: 'Quicksand, sans-serif', fontWeight: 700, fontSize: 17 }}>
            Thiệp Cưới Phạm Tá &amp; Thu Huyền
          </h2>
          <button onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 18 }}>
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: '#C8102E44' }}>
          {([['rsvp', '✅ Xác nhận tham dự'], ['wish', '💌 Gửi lời chúc']] as [Tab, string][]).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-3 text-sm font-bold transition-colors"
              style={{
                ...sf,
                color: tab === t ? '#C8102E' : '#888',
                borderBottom: tab === t ? '2px solid #C8102E' : '2px solid transparent',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(92vh - 130px)' }}>

          {/* ── Tab RSVP ───────────────────────────── */}
          {tab === 'rsvp' && (
            <div className="p-6">
              {rsvpSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <p className="font-bold text-gray-800 text-lg" style={sf}>Cảm ơn bạn!</p>
                  <p className="text-gray-500 text-sm mt-2" style={sf}>
                    {attendance === 'yes'
                      ? 'Chúng mình rất vui khi được đón bạn trong ngày đặc biệt này 💕'
                      : 'Rất tiếc khi bạn không thể đến. Cảm ơn bạn đã thông báo 🙏'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVP} className="space-y-4">
                  {/* Tên */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                      style={{ ...sf, color: '#C8102E', letterSpacing: '0.18em' }}>
                      👤 Tên của bạn
                    </label>
                    <input
                      type="text" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      placeholder="Nhập tên..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none"
                      style={{ ...sf, transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = '#C8102E')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  {/* Attendance */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3"
                      style={{ ...sf, color: '#C8102E', letterSpacing: '0.18em' }}>🗓️ Bạn có tham dự không?</p>
                    <div className="grid grid-cols-2 gap-3">
                      {([['yes', '🎊 Sẽ tham dự'], ['no', '😢 Không thể đến']] as [Attendance, string][]).map(([val, label]) => (
                        <button key={val} type="button" onClick={() => setAttendance(val)}
                          className="py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all"
                          style={{
                            ...sf,
                            borderColor: attendance === val ? '#C8102E' : '#e5e7eb',
                            background: attendance === val ? '#fff5f7' : '#fff',
                            color: attendance === val ? '#C8102E' : '#666',
                          }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QR code box */}
                  <div className="rounded-2xl border p-4 flex gap-4 items-center"
                    style={{ borderColor: '#C8102E44', background: '#ffffff' }}>
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border flex items-center justify-center"
                      style={{ borderColor: '#C8102E33', background: '#fff5f7' }}>
                      <img src={QR_IMAGE} alt="QR Mừng cưới"
                        className="w-full h-full object-cover"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      {/* fallback text nếu chưa có ảnh */}
                      <span className="text-center text-xs text-gray-400 px-1" style={sf}>QR<br />Mừng cưới</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-700" style={sf}>🎁 Mừng cưới</p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-1" style={sf}>
                        Quét QR để chuyển khoản<br />mừng cưới cô dâu chú rể.
                      </p>
                    </div>
                  </div>

                  {rsvpError && (
                    <p className="text-xs text-red-500 px-1" style={sf}>⚠️ {rsvpError}</p>
                  )}

                  <button type="submit" disabled={rsvpLoading}
                    className="w-full py-4 rounded-xl font-bold text-white text-sm shadow-md"
                    style={{ ...sf, background: rsvpLoading ? '#ccc' : 'linear-gradient(to right, #C8102E, #9e0d23)' }}>
                    {rsvpLoading ? 'Đang gửi...' : '✓ Xác nhận'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ── Tab Wish ───────────────────────────── */}
          {tab === 'wish' && (
            <div className="p-6">
              {wishSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">💌</div>
                  <p className="font-bold text-gray-800 text-lg" style={sf}>Cảm ơn lời chúc của bạn!</p>
                  <p className="text-gray-500 text-sm mt-2" style={sf}>
                    Chúng mình trân trọng từng lời chúc phúc từ bạn 💕
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWish} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                      style={{ ...sf, color: '#C8102E', letterSpacing: '0.18em' }}>
                      💌 Lời chúc của bạn
                    </label>
                    <textarea
                      value={wish} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setWish(e.target.value)}
                      placeholder="Viết lời chúc mừng đến cô dâu chú rể..."
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none resize-none"
                      style={{ ...sf, transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = '#C8102E')}
                      onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                    />
                  </div>

                  {/* QR code box (same) */}
                  <div className="rounded-2xl border p-4 flex gap-4 items-center"
                    style={{ borderColor: '#C8102E44', background: '#ffffff' }}>
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border flex items-center justify-center"
                      style={{ borderColor: '#C8102E33', background: '#fff5f7' }}>
                      <img src={QR_IMAGE} alt="QR Mừng cưới"
                        className="w-full h-full object-cover"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      <span className="text-center text-xs text-gray-400 px-1" style={sf}>QR<br />Mừng cưới</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-700" style={sf}>🎁 Mừng cưới</p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-1" style={sf}>
                        Quét QR để chuyển khoản<br />mừng cưới cô dâu chú rể.
                      </p>
                    </div>
                  </div>

                  {wishError && (
                    <p className="text-xs text-red-500 px-1" style={sf}>⚠️ {wishError}</p>
                  )}

                  <button type="submit" disabled={wishLoading}
                    className="w-full py-4 rounded-xl font-bold text-white text-sm shadow-md"
                    style={{ ...sf, background: wishLoading ? '#ccc' : 'linear-gradient(to right, #C8102E, #9e0d23)' }}>
                    {wishLoading ? 'Đang gửi...' : '💌 Gửi lời chúc'}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
};

export default RSVPModal;
