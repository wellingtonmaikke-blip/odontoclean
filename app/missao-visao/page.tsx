import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { missaoVisao } from "@/lib/content";
import { IconCheck } from "@/components/Icons";

export default function MissaoVisaoPage() {
  return (
    <>
      <Navbar />
      <section className="bg-brand-lightBlue/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="pill">Nossos princípios</span>
          <h1 className="mt-4 section-title">Missão, visão e valores</h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="card border-t-4 border-brand-darkBlue">
            <h2 className="font-display text-2xl font-bold text-brand-gray-900">{missaoVisao.missao.titulo}</h2>
            <p className="mt-4 text-brand-gray-600">{missaoVisao.missao.texto}</p>
          </div>
          <div className="card border-t-4 border-brand-mint">
            <h2 className="font-display text-2xl font-bold text-brand-gray-900">{missaoVisao.visao.titulo}</h2>
            <p className="mt-4 text-brand-gray-600">{missaoVisao.visao.texto}</p>
          </div>
        </div>

        <div className="mt-8 card">
          <h2 className="font-display text-2xl font-bold text-brand-gray-900">Nossos Valores</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {missaoVisao.valores.map((v) => (
              <li key={v} className="flex items-start gap-3 text-brand-gray-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mint/15 text-brand-mintDark">
                  <IconCheck className="h-4 w-4" />
                </span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
