export default function Home() {
  return (
    <div className="w-full">
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
    </div>
  );
}
