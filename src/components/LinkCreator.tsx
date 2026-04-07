import { type FC, useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LinkCreator: FC = () => {
  const [baseUrl,        setBaseUrl]        = useState('');
  const [guestName,      setGuestName]      = useState('');
  const [generatedLink,  setGeneratedLink]  = useState('');
  const [copied,         setCopied]         = useState(false);
  const [error,          setError]          = useState('');

  const onChange = (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setGeneratedLink('');
    setError('');
  };

  const handleCreate = () => {
    if (!baseUrl.trim())      { setError('Vui lòng nhập link thiệp!'); return; }
    if (!guestName.trim())    { setError('Vui lòng nhập tên khách mời!'); return; }
    let url = baseUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
    try {
      const u = new URL(url);
      u.searchParams.set('guest', guestName.trim());
      setGeneratedLink(u.toString());
      setError('');
    } catch {
      setError('Link thiệp không hợp lệ. Vui lòng kiểm tra lại!');
    }
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
    } catch {
      const el = document.createElement('textarea');
      el.value = generatedLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden py-16 px-4" style={{ background: 'linear-gradient(135deg, #D62828, #b51d1d)' }}>
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white opacity-5" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white opacity-5" />
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                    className="relative text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-16 bg-white opacity-50" />
            <span className="text-white text-2xl">💌</span>
            <div className="h-px w-16 bg-white opacity-50" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">Tạo Link Thiệp Cưới</h1>
          <p className="text-red-100 text-base max-w-md mx-auto">Cá nhân hóa lời mời dành riêng cho từng khách mời</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">

        {/* Guide */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="rounded-2xl p-6 border" style={{ background: '#fff0f0', borderColor: '#ffd6d6' }}>
          <h2 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#D62828', fontFamily: 'Quicksand, sans-serif' }}>
            📋 Hướng dẫn
          </h2>
          <ol className="space-y-2">
            {['Nhập Link thiệp vào ô LINK THIỆP', 'Nhập tên khách mời vào ô TÊN KHÁCH MỜI',
              'Bấm TẠO LINK → Link cá nhân hóa sẽ hiện ra', 'Bấm COPY → Gửi vào Messenger / Zalo / ...']
              .map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5"
                        style={{ background: '#D62828' }}>{i + 1}</span>
                  {text}
                </li>
              ))}
          </ol>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="rounded-3xl shadow-xl border overflow-hidden" style={{ borderColor: '#ffd6d6' }}>
          <div className="px-8 py-5" style={{ background: 'linear-gradient(to right, #D62828, #b51d1d)' }}>
            <h2 className="text-white font-serif text-xl font-semibold">✉️ Nhập thông tin</h2>
          </div>
          <div className="p-8 space-y-5 bg-white">
            {[
              { id: 'base-url',   label: '🔗 Link Thiệp',   type: 'url',  val: baseUrl,   ph: 'VD: https://www.ewedinvite.site/TuvaNhi', set: setBaseUrl },
              { id: 'guest-name', label: '👤 Tên Khách Mời', type: 'text', val: guestName, ph: 'VD: Nguyễn Văn Long', set: setGuestName },
            ].map(({ id, label, type, val, ph, set }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-700"
                       style={{ fontFamily: 'Quicksand, sans-serif', letterSpacing: '0.15em' }}>{label}</label>
                <input id={id} type={type} value={val} onChange={onChange(set)}
                       placeholder={ph}
                       onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
                       className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors duration-200"
                       style={{ fontFamily: 'Quicksand, sans-serif' }}
                       onFocus={e => (e.target.style.borderColor = '#D62828')}
                       onBlur={e  => (e.target.style.borderColor = '#e5e7eb')} />
              </div>
            ))}

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="rounded-xl px-4 py-3 text-sm font-medium border"
                            style={{ background: '#fff0f0', borderColor: '#ffd6d6', color: '#D62828', fontFamily: 'Quicksand, sans-serif' }}>
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCreate}
                           id="btn-create-link"
                           className="w-full py-4 rounded-xl font-bold text-white text-sm shadow-md tracking-wide"
                           style={{ background: 'linear-gradient(to right, #D62828, #b51d1d)', fontFamily: 'Quicksand, sans-serif' }}>
              🔗 TẠO LINK
            </motion.button>
          </div>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {generatedLink && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="rounded-3xl shadow-xl border-2 overflow-hidden" style={{ borderColor: '#ffd6d6' }}>
              <div className="px-8 py-4 border-b flex items-center gap-2"
                   style={{ background: '#fff0f0', borderColor: '#ffd6d6' }}>
                <span className="text-xl" style={{ color: '#D62828' }}>✅</span>
                <h3 className="font-serif text-lg font-bold" style={{ color: '#D62828' }}>Kết Quả</h3>
              </div>
              <div className="p-8 space-y-4 bg-white">
                <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  <span className="text-gray-500">Khách mời:</span>
                  <span className="font-semibold px-3 py-0.5 rounded-full text-sm"
                        style={{ color: '#D62828', background: '#fff0f0' }}>{guestName}</span>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2"
                     style={{ fontFamily: 'Quicksand, sans-serif' }}>Link cá nhân hóa:</p>
                  <p className="text-sm font-medium break-all" style={{ color: '#D62828', fontFamily: 'Quicksand, sans-serif' }}>
                    {generatedLink}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleCopy}
                                 id="btn-copy-link"
                                 className="flex-1 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                                 style={{
                                   background: copied ? '#22c55e' : 'linear-gradient(to right, #D62828, #b51d1d)',
                                   color: '#fff', fontFamily: 'Quicksand, sans-serif',
                                 }}>
                    {copied ? <><span>✓</span><span>ĐÃ COPY!</span></> : <><span>📋</span><span>COPY</span></>}
                  </motion.button>
                  <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            href={generatedLink} target="_blank" rel="noopener noreferrer"
                            id="btn-preview-link"
                            className="flex-1 py-3.5 bg-white border-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                            style={{ borderColor: '#D62828', color: '#D62828', fontFamily: 'Quicksand, sans-serif' }}>
                    <span>👁</span><span>XEM THỬ</span>
                  </motion.a>
                </div>
                <button onClick={() => { setBaseUrl(''); setGuestName(''); setGeneratedLink(''); setCopied(false); }}
                        className="w-full text-xs text-gray-400 hover:text-red-500 transition-colors py-1"
                        style={{ fontFamily: 'Quicksand, sans-serif' }}>
                  ↺ Tạo link mới
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Example */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="rounded-2xl border p-6" style={{ background: '#fff0f0', borderColor: '#ffd6d6' }}>
          <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: '#D62828', fontFamily: 'Quicksand, sans-serif' }}>💡 Ví dụ</h3>
          <div className="space-y-2 text-xs text-gray-600" style={{ fontFamily: 'Quicksand, sans-serif' }}>
            <div className="bg-white rounded-lg px-3 py-2 border border-red-100">
              Link gốc: <span className="font-mono text-gray-700">https://www.ewedinvite.site/TuvaNhi</span>
            </div>
            <div className="text-center text-gray-400">
              ↓ Sau khi tạo cho khách <strong style={{ color: '#D62828' }}>Long</strong>
            </div>
            <div className="bg-white rounded-lg px-3 py-2 border" style={{ borderColor: '#ffd6d6' }}>
              Link riêng: <span className="font-mono font-medium" style={{ color: '#D62828' }}>
                https://www.ewedinvite.site/TuvaNhi?guest=Long
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="text-center py-8 text-gray-400 text-sm" style={{ fontFamily: 'Quicksand, sans-serif' }}>
        💕 Được tạo với yêu thương
      </div>
    </div>
  );
};

export default LinkCreator;
