export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Marcello Pato Name */}
      <section className="w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-red-600 to-red-700">
        <img
          src="/hero.png"
          alt="Marcello Pato - Ira de Deus"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Section 2 - Guitar Cross */}
      <section className="w-full h-screen flex items-center justify-center overflow-hidden bg-sky-400">
        <img
          src="/section2.jpg"
          alt="Guitar Cross"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Section 3 - Marcello with Guitars */}
      <section className="w-full h-screen flex items-center justify-center overflow-hidden bg-purple-700">
        <img
          src="/section3.jpg"
          alt="Marcello Pato - Ira de Deus Album"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Section 4 - Police Tape Guitars */}
      <section className="w-full h-screen flex items-center justify-center overflow-hidden bg-red-600">
        <img
          src="/section4.jpg"
          alt="Police Tape Guitars"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Section 5 - Single Guitar */}
      <section className="w-full h-screen flex items-center justify-center overflow-hidden bg-white">
        <img
          src="/guitar.png"
          alt="Marcello Pato Guitar"
          className="w-full h-full object-cover"
        />
      </section>
    </div>
  );
}
