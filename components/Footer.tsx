import Link from "next/link";
import { marca, contato, footerTexto } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-brand-gray-100 bg-brand-gray-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-darkBlue font-display text-lg font-bold text-white">
              O
            </span>
            <span className="font-display text-xl font-bold text-brand-gray-900">{marca.nome}</span>
          </div>
          <p className="mt-4 text-sm text-brand-gray-600">{footerTexto.descricao}</p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-brand-gray-900">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-gray-600">
            <li><Link href="/servicos" className="hover:text-brand-darkBlue">Serviços e planos</Link></li>
            <li><Link href="/diferenciais" className="hover:text-brand-darkBlue">Diferenciais</Link></li>
            <li><Link href="/missao-visao" className="hover:text-brand-darkBlue">Missão e visão</Link></li>
            <li><Link href="/sobre" className="hover:text-brand-darkBlue">Sobre nós</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-brand-gray-900">Área da clínica</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-gray-600">
            <li><Link href="/login" className="hover:text-brand-darkBlue">Login</Link></li>
            <li><Link href="/cadastro" className="hover:text-brand-darkBlue">Cadastrar clínica</Link></li>
            <li><Link href="/contato" className="hover:text-brand-darkBlue">Fale conosco</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-brand-gray-900">Contato</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-gray-600">
            <li>{contato.telefone}</li>
            <li>{contato.email}</li>
            <li>{contato.endereco}</li>
            <li>{contato.horario}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-gray-100 py-6 text-center text-xs text-brand-gray-600">
        {footerTexto.copyright}
      </div>
    </footer>
  );
}
