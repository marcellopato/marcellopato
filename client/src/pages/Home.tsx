import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [extraGuitars, setExtraGuitars] = useState<
    { id: number; side: 'left' | 'right'; offsetX: number; widthPct: number; phase: number; parallax: number; opacity: number; speed: number }[]
  >([]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    const onResize = () => {
      const vh = window.innerHeight || 0;
      const doc = document.documentElement;
      const ms = Math.max(0, (doc.scrollHeight || 0) - vh);
      setViewportH(vh);
      setMaxScroll(ms);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onResize();
    onScroll();
    // generate random extra guitars once
    setExtraGuitars(() => {
      const items = Array.from({ length: 10 }).map((_, i) => {
        const side = Math.random() < 0.5 ? 'left' as const : 'right' as const;
        const offsetX = 5 + Math.random() * 25; // 5% to 30% from the side
        const widthPct = 8 + Math.random() * 14; // 8% to 22% (smaller than main 25%)
        const phase = Math.random() * Math.PI * 2; // radians for slight phase shift
        const parallax = 0.6 + Math.random() * 0.6; // 0.6x to 1.2x travel variation
        const opacity = 0.45 + Math.random() * 0.35; // 0.45 - 0.8
        // map size to speed: smaller -> faster (8% => ~1.6x, 22% => ~0.8x)
        const t = (widthPct - 8) / (22 - 8); // 0..1
        const speed = 1.6 - t * 0.8; // 1.6..0.8
        return { id: i, side, offsetX, widthPct, phase, parallax, opacity, speed };
      });
      return items;
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const progress = maxScroll > 0 ? scrollY / maxScroll : 0; // 0 at top, 1 at bottom
  const travel = viewportH * 1.6; // increase course beyond viewport height
  const yOffset = (0.5 - progress) * travel; // bigger range: starts lower, ends higher
  return (
    <div className="w-full">
      {extraGuitars.map((g) => (
        <img
          key={g.id}
          src="/guitar.png"
          alt="Guitarra flutuante"
          className="fixed z-40 pointer-events-none select-none"
          style={{
            top: '50%',
            [g.side]: `${g.offsetX}%`,
            width: `${g.widthPct}%`,
            // scale the effective progress by guitar-specific speed (smaller -> faster)
            transform: `translate3d(0, ${(0.5 - Math.min(1, Math.max(0, progress * g.speed))) * travel * g.parallax + Math.sin(progress * Math.PI * 2 * g.speed + g.phase) * 18}px, 0)`,
            opacity: g.opacity,
          } as React.CSSProperties}
        />
      ))}
      <img
        src="/guitar.png"
        alt="Guitarra flutuante"
        className="fixed z-50 pointer-events-none select-none"
        style={{
          top: "50%",
          right: "6%",
          width: "25%",
          transform: `translate3d(0, ${yOffset}px, 0)`,
        }}
      />
      <section
        className="min-h-screen w-full flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/section4.jpg')", backgroundPosition: "center 60%" }}
      >
        <img
          src="/logo.png"
          alt="Marcello Pato Logo"
          className="max-w-[80vw] max-h-[80vh] w-auto h-auto"
        />
      </section>

      <section className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#071327] to-[#0D2244]">
        <img
          src="/capinha.png"
          alt="Capinha"
          className="max-w-[80vw] max-h-[80vh] w-auto h-auto rounded-md shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        />
      </section>

      <section
        className="h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('/guitarra_roxa.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '360px auto',
          backgroundPosition: 'center',
          backgroundColor: '#000',
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-[90vw] max-w-xl">
          <h2 className="text-center text-xl sm:text-2xl font-semibold text-neutral-900 mb-4">Ouça em</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <a href="#" target="_blank" rel="noopener" className="group flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition">
              <span className="inline-flex h-8 w-8 items-center justify-center text-neutral-900">
                {/* Apple Music */}
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                  <path d="M16.5 3.5v10.6a3.6 3.6 0 1 1-1.5-3V7.1l-6 1.3v7.7a3.6 3.6 0 1 1-1.5-3V6.2c0-.3.2-.6.5-.7l7.8-1.7c.5-.1.7.2.7.7z" />
                </svg>
              </span>
              <span className="text-neutral-900">Apple Music</span>
            </a>

            <a href="#" target="_blank" rel="noopener" className="group flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition">
              <span className="inline-flex h-8 w-8 items-center justify-center text-red-600">
                {/* YouTube Music */}
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                  <path d="M12 3c-5.5 0-9 .5-9 6.5v5c0 6 3.5 6.5 9 6.5s9-.5 9-6.5v-5C21 3.5 17.5 3 12 3zm-2 5 6 4-6 4V8z" />
                </svg>
              </span>
              <span className="text-neutral-900">YouTube Music</span>
            </a>

            <a href="#" target="_blank" rel="noopener" className="group flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition">
              <span className="inline-flex h-8 w-8 items-center justify-center text-emerald-500">
                {/* Spotify */}
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                  <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm4.3 14.6c-.2.3-.6.4-.9.2-2.5-1.5-5.7-1.9-9.4-1.1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4.1-.9 7.7-.5 10.5 1.2.3.2.4.6.2.9zm1.3-3.1c-.2.3-.7.5-1 .3-2.9-1.8-7.2-2.3-10.6-1.3-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.9-1.1 8.8-.6 12.1 1.4.4.2.5.7.3 1zm.1-3.3c-3.5-2.1-9.3-2.3-12.7-1.3-.5.1-1-.2-1.1-.7-.1-.5.2-1 .7-1.1 3.8-1.1 10.2-.9 14.3 1.5.5.3.6.9.3 1.3-.3.5-.9.6-1.5.3z" />
                </svg>
              </span>
              <span className="text-neutral-900">Spotify</span>
            </a>

            <a href="#" target="_blank" rel="noopener" className="group flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition">
              <span className="inline-flex h-8 w-8 items-center justify-center text-[#FF0000]">
                {/* Deezer (approx) */}
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                  <path d="M3 16h3v2H3v-2zm4-3h3v5H7v-5zm4-2h3v7h-3V11zm4-3h3v10h-3V8zm4-3h3v13h-3V5z" />
                </svg>
              </span>
              <span className="text-neutral-900">Deezer</span>
            </a>
          </div>
        </div>
      </section>
      <footer
        className="w-full"
        style={{
          backgroundImage: "url('/section3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full h-[40vh] md:h-[50vh] bg-black/40 flex items-center justify-center">
          <nav className="flex items-center gap-6 md:gap-8">
            <a href="#" target="_blank" rel="noopener" className="text-white hover:text-blue-400 transition" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 md:h-10 md:w-10">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.6V12h2.6V9.8c0-2.6 1.6-4 3.9-4 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener" className="text-white hover:text-red-500 transition" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 md:h-10 md:w-10">
                <path d="M23.5 7.5s-.2-1.7-.8-2.5c-.8-.9-1.7-.9-2.1-1C17.5 3.6 12 3.6 12 3.6h0s-5.5 0-8.6.4c-.4.1-1.3.1-2.1 1-.6.8-.8 2.5-.8 2.5S0 9.5 0 11.4v1.2c0 1.9.2 3.9.2 3.9s.2 1.7.8 2.5c.8.9 1.9.8 2.4.9 1.8.2 7.6.4 8.6.4s8.6 0 8.6-.4c.4-.1 1.6 0 2.4-.9.6-.8.8-2.5.8-2.5s.2-2 .2-3.9v-1.2c0-1.9-.2-3.9-.2-3.9ZM9.6 14.9V8.9l6 3-6 3Z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener" className="text-white hover:text-pink-400 transition" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 md:h-10 md:w-10">
                <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.4.6.6.3 1 .7 1.5 1.2.5.5.9.9 1.2 1.5.3.5.5 1.2.6 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.6 2.4-.3.6-.7 1-1.2 1.5-.5.5-.9.9-1.5 1.2-.5.3-1.2.5-2.4.6-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.4-.6-.6-.3-1-.7-1.5-1.2-.5-.5-.9-.9-1.2-1.5-.3-.5-.5-1.2-.6-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.9.6-2.4.3-.6.7-1 1.2-1.5.5-.5.9-.9 1.5-1.2.5-.3 1.2-.5 2.4-.6C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.5.2-1.9.4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3.9-.4 1.9-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.5.4 1.9.2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.2.9.3 1.9.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.5-.2 1.9-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-.9.4-1.9.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.5-.4-1.9-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-.9-.3-1.9-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.7a4.3 4.3 0 1 1 0 8.7 4.3 4.3 0 0 1 0-8.7Zm0 1.8a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm5-3.1a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener" className="text-white hover:text-cyan-400 transition" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 md:h-10 md:w-10">
                <path d="M21 8.1c-2.1 0-4.1-.8-5.6-2.3V17a5.9 5.9 0 1 1-6.1-5.9c.3 0 .7 0 1 .1v2.6c-.3-.1-.6-.1-.9-.1a3.2 3.2 0 1 0 3.2 3.2V2.5h2.7c.4 2 2.1 3.6 4.1 4.1V8.1Z"/>
              </svg>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
