import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { diferenciais } from "@/lib/content";
import { iconMap } from "@/components/Icons";

export default function DiferenciaisPage() {
  return (
    <>
      <Navbar />
      <section className="bg-brand-lightBlue/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="pill">O que nos diferencia</span>
          <h1 className="mt-4 section-title">Detalhes que fazem toda a diferença</h1>
          <p className="section-subtitle mx-auto text-center">
            Nossa metodologia foi desenvolvida especificamente para o ambiente odontológico —
            com atenção a cada detalhe que impacta a segurança de pacientes e profissionais.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((d) => {
            const Icon = iconMap[d.icone];
            return (
              <div key={d.titulo} className="card transition hover:-translate-y-1 hover:shadow-premium">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-lightBlue text-brand-darkBlue">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-gray-900">{d.titulo}</h3>
                <p className="mt-2 text-sm text-brand-gray-600">{d.texto}</p>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
