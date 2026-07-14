import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicoCard from "@/components/ServicoCard";
import { iconMap } from "@/components/Icons";
import { hero, homeStats, homeChamada, servicos, diferenciais } from "@/lib/content";

export default function HomePage() {
  const destaques = servicos.filter((s) => s.id === "diagnostico" || s.id === "implantacao" || s.id === "mentoria");

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-lightBlue/60 to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="pill">
              🦷 {hero.selo}
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-brand-gray-900 sm:text-5xl">
              {hero.titulo}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-gray-600">{hero.subtitulo}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/servicos" className="btn-primary">
                {hero.ctaPrimario}
              </Link>
              <Link href="/servicos" className="btn-secondary">
                {hero.ctaSecundario}
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {homeStats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-extrabold text-brand-darkBlue">{s.numero}</p>
                  <p className="text-xs text-brand-gray-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl2 shadow-premium ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&auto=format&fit=crop&q=80"
                alt={hero.imagemAlt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl2 bg-white p-4 shadow-premium ring-1 ring-black/5 sm:block">
              <p className="text-xs font-semibold text-brand-gray-600">Selo de qualidade</p>
              <p className="font-display text-lg font-bold text-brand-mintDark">Clínica Organizada®</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAMADA */}
      <section className="bg-brand-darkBlue">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{homeChamada.titulo}</h2>
          <p className="mt-4 text-brand-lightBlue">{homeChamada.texto}</p>
          <Link href="/servicos" className="btn-mint mt-8 inline-flex">
            Ver serviços e preços
          </Link>
        </div>
      </section>

      {/* SERVIÇOS RESUMO */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Do diagnóstico à mentoria contínua</h2>
          <p className="section-subtitle mx-auto text-center">
            Comece pelo Diagnóstico Operacional, avance para a Implantação Completa e mantenha os
            resultados com a Mentoria Mensal. Temos também Treinamento de ASBs e Manual de Protocolos avulsos.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {destaques.map((s) => (
            <ServicoCard key={s.id} servico={s} ctaHref="/cadastro" />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/servicos" className="btn-secondary inline-flex">Ver todos os serviços</Link>
        </div>
      </section>

      {/* DIFERENCIAIS RESUMO */}
      <section className="bg-brand-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">Por que confiar no Método Fluxo</h2>
            <p className="section-subtitle mx-auto text-center">
              Você não compra organização. Você compra produtividade, segurança e uma operação previsível.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {diferenciais.slice(0, 6).map((d) => {
              const Icon = iconMap[d.icone];
              return (
                <div key={d.titulo} className="card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-lightBlue text-brand-darkBlue">
                    {Icon && <Icon />}
                  </div>
                  <h3 className="mt-4 font-display font-bold text-brand-gray-900">{d.titulo}</h3>
                  <p className="mt-2 text-sm text-brand-gray-600">{d.texto}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="section-title">Pronto para organizar a operação da sua clínica?</h2>
        <p className="section-subtitle mx-auto text-center">
          Fale com a nossa equipe e solicite o Diagnóstico Operacional em poucas horas.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/cadastro" className="btn-primary">Cadastrar minha clínica</Link>
          <Link href="/contato" className="btn-secondary">Falar com um consultor</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
