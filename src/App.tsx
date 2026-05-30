import { useState } from 'react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState('dashboard');

  const screenshots = {
    dashboard: {
      title: 'Painel Geral de Controle',
      desc: 'Visualize despesas, receitas, fluxo de caixa mensal e distribuição de categorias em tempo real com gráficos avançados.',
      path: 'dashboard.png'
    },
    charts: {
      title: 'Estatísticas e Gráficos Interativos',
      desc: 'Analise padrões históricos de consumo, acompanhe saldos consolidados de cartões e contas num único ecrã.',
      path: 'charts.png'
    },
    kanban: {
      title: 'Gestão de Tarefas e Projetos (Kanban)',
      desc: 'Um módulo completo de produtividade integrado ao seu painel financeiro para gerir projetos pessoais e profissionais.',
      path: 'kanban.png'
    }
  };

  const faqs = [
    {
      q: 'O aplicativo funciona totalmente sem internet?',
      a: 'Sim, o VukaPay adota o conceito Offline-First. Toda a base de dados (SQLite) e lógica financeira funcionam no seu computador local sem precisar de qualquer ligação à rede. A internet é utilizada apenas caso decida fazer backups manuais/automáticos na sua conta Google Drive ou para verificação periódica de licença.'
    },
    {
      q: 'Como funciona o backup no Google Drive? Meus dados estão seguros?',
      a: 'O backup é totalmente controlado por si. O app utiliza o protocolo de autenticação segura da Google (OAuth 2.0) com permissão restrita (drive.file). Isso significa que o VukaPay só consegue criar e ler o seu próprio ficheiro de backup criptografado (vukapay_backup.json), e não tem acesso a mais nada na sua conta Google.'
    },
    {
      q: 'Como funciona o licenciamento híbrido e ativação local?',
      a: 'Ao adquirir o VukaPay, recebe uma chave de licença única. Durante a ativação, o software associa localmente essa chave ao identificador único criptografado (SHA-256) do seu hardware (motherboard ou disco). Isso garante que a sua licença seja validada de forma híbrida e local sem monitorizar os seus dados financeiros.'
    },
    {
      q: 'Quais os sistemas operacionais suportados?',
      a: 'Atualmente, o VukaPay é distribuído oficialmente para Windows (x64), através de instaladores seguros em formatos NSIS (.exe) e MSI (.msi) construídos com a tecnologia leve e segura do Tauri.'
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 💻 HEADER / BARRA DE NAVEGAÇÃO */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo_vukapay_minimal.png`} alt="VukaPay logo" className="h-9 w-9 rounded-xl shadow-lg shadow-indigo-500/10" />
            <span className="font-display text-2xl font-black tracking-tight text-white">
              Vuka<span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Pay</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Funcionalidades</a>
            <a href="#security" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Segurança</a>
            <a href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Preços</a>
            <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://github.com/marcosdc20/sistema-de-controle-financeiro-pessoal-financer/releases/download/v1.0.6/VukaPay_1.0.6_x64-setup.exe"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Descarregar App
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/5 bg-[#0B0F19]/95 px-6 py-6 space-y-4">
            <nav className="flex flex-col gap-4">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                Funcionalidades
              </a>
              <a 
                href="#security" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                Segurança
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                Preços
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </a>
            </nav>
            <div className="pt-4 border-t border-white/5">
              <a 
                href="https://github.com/marcosdc20/sistema-de-controle-financeiro-pessoal-financer/releases/download/v1.0.6/VukaPay_1.0.6_x64-setup.exe"
                className="w-full justify-center px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-center text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Descarregar Instalador (.exe)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 🚀 SECÇÃO HERO (O Primeiro Impacto) */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]"></div>
        <div className="absolute top-1/3 left-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[150px]"></div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-white/10 text-xs font-semibold text-indigo-300 mb-6 tracking-wide animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
            Versão 1.0.6 Lançada — Autoupdate Silencioso
          </div>
          
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight max-w-5xl mx-auto">
            O controlo absoluto das suas finanças, com{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
              privacidade total.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Um software financeiro offline-first para desktop. Desenvolvido para proteger a sua privacidade: os seus dados residem no seu PC, com backup automático seguro e encriptado no ecossistema Google.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-base font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:scale-95 text-center"
            >
              Começar Teste Grátis de 7 Dias
            </a>
            <a 
              href="privacy.html"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-gray-200 text-base font-semibold rounded-2xl transition-all border border-white/10 text-center"
            >
              Ler Políticas de Privacidade
            </a>
          </div>

          {/* INTERACTIVE APP MOCKUP CONTAINER */}
          <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
            <div className="p-3.5 rounded-3xl glass-indigo shadow-2xl relative">
              
              {/* Fake Window Header */}
              <div className="flex items-center justify-between px-4 pb-3 border-b border-white/5">
                <div className="flex gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/30"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/30"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-green-500/30"></span>
                </div>
                <div className="text-[11px] text-gray-500 font-mono tracking-widest uppercase">VukaPay Client v1.0.6</div>
                <div className="w-10"></div>
              </div>

              {/* Screenshots Display */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mt-3 bg-[#0B0F19]">
                <img 
                  src={`${import.meta.env.BASE_URL}${screenshots[selectedScreenshot as keyof typeof screenshots].path}`} 
                  alt={screenshots[selectedScreenshot as keyof typeof screenshots].title}
                  className="w-full h-full object-cover object-top opacity-90 transition-opacity duration-300" 
                />
              </div>

              {/* Screenshot Selector Controls */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {Object.keys(screenshots).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedScreenshot(key)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                      selectedScreenshot === key 
                        ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' 
                        : 'glass border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {screenshots[key as keyof typeof screenshots].title}
                  </button>
                ))}
              </div>
            </div>
            
            <p className="mt-12 text-sm text-gray-500 italic max-w-lg mx-auto">
              "{screenshots[selectedScreenshot as keyof typeof screenshots].desc}"
            </p>
          </div>
        </div>
      </section>

      {/* 🛠️ GRID DE FUNCIONALIDADES (Features) */}
      <section id="features" className="py-24 border-t border-white/5 bg-[#0e1322]/30 relative">
        <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-500/5 blur-[100px]"></div>
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Arquitetado para ser rápido, robusto e local.
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Desenvolvemos uma ferramenta com tecnologias de alto desempenho para manter os seus dados financeiros protegidos no seu desktop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl glass hover:border-indigo-500/20 hover:bg-[#111827]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Privacidade Absoluta (Offline-First)</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Suas informações de fluxo bancário, despesas e receitas permanecem inteiramente no seu PC. Sem servidores na nuvem espreitando seus extratos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl glass hover:border-indigo-500/20 hover:bg-[#111827]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Estatísticas & Gráficos Inteligentes</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Gráficos elegantes de balanço, evolução de investimentos, distribuição de despesas por tags e histórico de saldos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl glass hover:border-indigo-500/20 hover:bg-[#111827]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Gestão Multimoeda & Kwanza</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Desenvolvido com suporte nativo a transações em Kwanza (AOA), Euro, Dólar e conversões automatizadas para quem opera localmente.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl glass hover:border-indigo-500/20 hover:bg-[#111827]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Backup no seu Google Drive</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Integração automatizada via OAuth2 restrito. O arquivo de backup é carregado e guardado diretamente na sua conta privada do Drive.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl glass hover:border-indigo-500/20 hover:bg-[#111827]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Orçamentos & Alertas de Limites</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Defina tetos mensais por categorias. O sistema notifica-o automaticamente ao atingir 80% e 100% de uso do orçamento estipulado.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl glass hover:border-indigo-500/20 hover:bg-[#111827]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Relatórios PDF & Exportação Excel</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Gere faturas e relatórios consolidados em formato PDF profissional com auto-tabelas estruturadas ou exporte suas transações para CSV/XLSX.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 🛡️ SECÇÃO DE SEGURANÇA E LICENCIAMENTO (Autoridade) */}
      <section id="security" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]"></div>
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="p-8 md:p-16 rounded-3xl glass-indigo flex flex-col lg:flex-row items-center gap-12 border border-indigo-500/10">
            
            <div className="flex-1 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Segurança de Nível Bancário</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
                Seus dados guardados localmente com validação híbrida.
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Ao contrário das plataformas SaaS tradicionais que guardam os seus dados e logins financeiros nos servidores deles, o VukaPay armazena tudo no seu disco rígido através de um banco de dados SQLite local robusto.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    <strong className="text-white">Associação por Hardware (HWID):</strong> A sua licença é vinculada criptograficamente ao seu PC usando hashes SHA-256 gerados localmente.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    <strong className="text-white">Assinatura Digital de Atualizações:</strong> Usamos chaves criptográficas Minisign. O aplicativo só aceita atualizações com assinaturas verificadas que correspondam à chave pública original.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    <strong className="text-white">Sem Custódia de Credenciais:</strong> A integração com o Google Drive ocorre diretamente no seu navegador local via OAuth. O aplicativo nunca tem acesso à sua senha da Google.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 flex-shrink-0 flex items-center justify-center">
              {/* Styled Shield Card */}
              <div className="relative p-8 w-full max-w-sm rounded-2xl glass-indigo flex flex-col items-center text-center shadow-xl border border-cyan-500/20">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 animate-pulse">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Offline e Protegido</h3>
                <span className="text-[10px] font-mono bg-cyan-500/10 px-2.5 py-0.5 rounded text-cyan-300 uppercase tracking-widest font-semibold mb-4">Base SQLite Criptografada</span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Os seus dados financeiros ficam guardados no seu computador, longe de olhares indesejados. É a sua segurança em primeiro lugar.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 💎 TABELA DE PREÇOS / PLANOS (Conversão Comercial) */}
      <section id="pricing" className="py-24 border-t border-white/5 bg-[#0e1322]/20 relative">
        <div className="absolute bottom-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-violet-500/5 blur-[100px]"></div>
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Planos & Preços</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
              Escolha o plano ideal para a sua autonomia financeira.
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Acesso total às ferramentas locais no desktop. Pagamentos flexíveis e sem contratos de fidelização.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Plan 1 */}
            <div className="p-8 rounded-2xl glass flex flex-col justify-between border-white/5 hover:border-white/10 transition-all duration-300">
              <div>
                <h3 className="text-lg font-bold text-gray-300">Plano Trial</h3>
                <p className="text-xs text-gray-500 mt-1">Experimente sem compromissos</p>
                <div className="mt-6 flex items-baseline">
                  <span className="font-display text-4xl font-extrabold text-white">Grátis</span>
                  <span className="text-xs text-gray-500 ml-1">/7 dias</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Acesso a todos os recursos locais
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Banco de dados SQLite privado
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Integração com Google Drive
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a 
                  href="https://github.com/marcosdc20/sistema-de-controle-financeiro-pessoal-financer/releases/download/v1.0.6/VukaPay_1.0.6_x64-setup.exe"
                  className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white text-center text-sm font-semibold rounded-xl border border-white/10 transition-all"
                >
                  Descarregar Grátis
                </a>
              </div>
            </div>

            {/* Plan 2 - RECOMMENDED */}
            <div className="p-8 rounded-2xl glass-indigo flex flex-col justify-between border-indigo-500/35 relative shadow-xl shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-indigo-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                Mais Popular
              </span>
              
              <div>
                <h3 className="text-lg font-bold text-white">Licença Anual</h3>
                <p className="text-xs text-indigo-300 mt-1">Ideal para controlo a longo prazo</p>
                <div className="mt-6 flex items-baseline">
                  <span className="font-display text-4xl font-extrabold text-white">12.000 AOA</span>
                  <span className="text-xs text-gray-400 ml-1">/ano</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Acesso completo offline ilimitado
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Atualizações automáticas da v1.0.6+
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Sincronização contínua com nuvem
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Suporte prioritário via e-mail
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a 
                  href="https://vukapay.com/adquirir"
                  className="block w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-center text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                >
                  Adquirir Licença Anual
                </a>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="p-8 rounded-2xl glass flex flex-col justify-between border-white/5 hover:border-white/10 transition-all duration-300">
              <div>
                <h3 className="text-lg font-bold text-gray-300">Plano Vitalício</h3>
                <p className="text-xs text-gray-500 mt-1">Uso contínuo para sempre</p>
                <div className="mt-6 flex items-baseline">
                  <span className="font-display text-4xl font-extrabold text-white">45.000 AOA</span>
                  <span className="text-xs text-gray-500 ml-1">/único</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Acesso vitalício à aplicação desktop
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Sem taxas adicionais recorrentes
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Todas as atualizações futuras
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a 
                  href="https://vukapay.com/adquirir"
                  className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white text-center text-sm font-semibold rounded-xl border border-white/10 transition-all"
                >
                  Comprar Licença Perpétua
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📑 SECÇÃO DE PERGUNTAS FREQUENTES (FAQ Accordion) */}
      <section id="faq" className="py-24 relative">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">FAQ</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
              Dúvidas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl glass overflow-hidden transition-all duration-300 border border-white/5"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-base font-bold text-white pr-4">{faq.q}</span>
                  <span className={`text-indigo-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-400 border-t border-white/5 leading-relaxed bg-[#0E1322]/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 👣 FOOTER (Rodapé Profissional) */}
      <footer className="bg-[#070A13] border-t border-white/5 text-gray-500 pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          <div className="space-y-4 md:col-span-2">
            <a href="#" className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}logo_vukapay_minimal.png`} alt="VukaPay logo" className="h-8 w-8 rounded-lg" />
              <span className="font-display text-xl font-bold tracking-tight text-white">VukaPay</span>
            </a>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              O VukaPay é um software independente de controlo financeiro. Nosso compromisso é com a privacidade do utilizador e a soberania total sobre as suas informações financeiras.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Políticas e Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="privacy.html" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="terms.html" className="hover:text-white transition-colors">Termos de Serviço</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contato e Suporte</h4>
            <p className="text-sm text-gray-400">
              E-mail: <a href="mailto:narcisomarcos826@gmail.com" className="hover:text-white transition-colors">narcisomarcos826@gmail.com</a>
            </p>
            <p className="text-sm text-gray-400">
              GitHub: <a href="https://github.com/marcosdc20" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">@marcosdc20</a>
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <p>&copy; {new Date().getFullYear()} VukaPay. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            Construído de forma otimizada com 
            <span className="text-indigo-400 font-semibold">Tauri</span> &middot; 
            <span className="text-orange-400 font-semibold">Rust</span> &middot; 
            <span className="text-cyan-400 font-semibold">React</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
