import { useState } from 'react';
import PurchaseModal from './components/PurchaseModal';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState('dashboard');
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchasePlan, setPurchasePlan] = useState<'annual' | 'lifetime'>('annual');

  const openPurchase = (planType: 'annual' | 'lifetime') => {
    setPurchasePlan(planType);
    setIsPurchaseModalOpen(true);
  };

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

  const features = [
    {
      title: 'Privacidade Total (Offline-First)',
      desc: 'As suas informações de fluxo bancário, despesas e receitas permanecem inteiramente no seu computador. Sem servidores espreitando as suas contas.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      title: 'Análises & Gráficos Poderosos',
      desc: 'Visualize a evolução de investimentos, distribuição de despesas por tags e histórico de saldos com painéis de dados interativos e elegantes.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      )
    },
    {
      title: 'Gestão Multimoeda & Kwanza',
      desc: 'Desenvolvido com suporte nativo a transações em Kwanza (AOA), Euro, Dólar e conversões automáticas com taxas atualizadas.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.553-.44 1.278-.659 2.003-.659.725 0 1.45.22 2.003.659l.879.659M12 3v3m0 12v3" />
        </svg>
      )
    },
    {
      title: 'Backup Criptografado na Nuvem',
      desc: 'Integração direta e transparente com o Google Drive via protocolo OAuth2 seguro para guardar cópias automáticas sem comprometer o acesso.',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
      )
    },
    {
      title: 'Orçamentos & Alertas Inteligentes',
      desc: 'Defina limites mensais de gastos para categorias ou projetos específicos. Receba notificações dinâmicas ao atingir 80% e 100% dos limites.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a9.041 9.041 0 01-5.714 0M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zM12 9v3m0 3h.008v.008H12V15z" />
        </svg>
      )
    },
    {
      title: 'Relatórios PDF & Exportação Excel',
      desc: 'Gere relatórios consolidados em formato PDF com tabelas estruturadas ou exporte as suas transações completas para CSV e XLSX.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    }
  ];

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
    <div className="min-h-screen bg-[#060913] text-gray-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 💻 HEADER / BARRA DE NAVEGAÇÃO */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#060913]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo_vukapay_minimal.png`} alt="VukaPay logo" className="h-9 w-9 rounded-xl shadow-lg shadow-emerald-500/10" />
            <span className="font-display text-2xl font-black tracking-tight text-white">
              Vuka<span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Pay</span>
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
              href="https://github.com/marcosdc20/sistema-de-controle-financeiro-pessoal-financer/releases/download/v1.1.0/VukaPay_1.1.0_x64-setup.exe"
              className="px-5 py-2.5 bg-gradient-to-r from-brand to-emerald-600 hover:from-brand-hover hover:to-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center gap-2"
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
          <div className="md:hidden border-b border-white/5 bg-[#060913]/95 px-6 py-6 space-y-4">
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
                href="https://github.com/marcosdc20/sistema-de-controle-financeiro-pessoal-financer/releases/download/v1.1.0/VukaPay_1.1.0_x64-setup.exe"
                className="w-full justify-center px-5 py-3 bg-gradient-to-r from-brand to-emerald-600 text-white text-center text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
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
        <div className="absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"></div>
        <div className="absolute top-1/3 left-10 -z-10 h-96 w-96 rounded-full bg-teal-500/10 blur-[150px]"></div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-white/10 text-xs font-semibold text-emerald-300 mb-6 tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Versão 1.1.0 Lançada — Autoupdate Silencioso
          </div>
          
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight max-w-5xl mx-auto">
            O controlo absoluto das suas finanças, com{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-600 bg-clip-text text-transparent">
              privacidade total.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Um software financeiro offline-first para desktop. Desenvolvido para proteger a sua privacidade: os seus dados residem no seu PC, com backup automático seguro e encriptado no ecossistema Google.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand to-emerald-600 hover:from-brand-hover hover:to-emerald-700 text-white text-base font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:scale-95 text-center"
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
            <div className="p-3.5 rounded-3xl glass-brand shadow-2xl relative">
              
              {/* Fake Window Header */}
              <div className="flex items-center justify-between px-4 pb-3 border-b border-white/5">
                <div className="flex gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/30"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/30"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-green-500/30"></span>
                </div>
                <div className="text-[11px] text-gray-500 font-mono tracking-widest uppercase">VukaPay Client v1.1.0</div>
                <div className="w-10"></div>
              </div>

              {/* Screenshots Display */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mt-3 bg-[#060913]">
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
                        ? 'bg-brand border-emerald-400 text-white shadow-lg shadow-emerald-500/20' 
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
      <section id="features" className="py-24 border-t border-white/5 bg-[#0a0e1a]/30 relative">
        <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-500/5 blur-[100px]"></div>
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Funcionalidades</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
              Arquitetado para ser rápido, robusto e local.
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Desenvolvemos uma ferramenta com tecnologias de alto desempenho para manter os seus dados financeiros protegidos no seu desktop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer shadow-lg shadow-black/30 border border-white/5"
              >
                {/* Imagem de Fundo de Alta Qualidade */}
                <img 
                  src={feat.image} 
                  alt={feat.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay de Gradiente Escuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:via-black/50 transition-all duration-300"></div>
                
                {/* Conteúdo do Card */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-950/75 flex items-center justify-center border border-emerald-500/20 shadow-inner group-hover:scale-110 transition-transform">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{feat.title}</h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡️ SECÇÃO DE SEGURANÇA E LICENCIAMENTO (Autoridade) */}
      <section id="security" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]"></div>
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="p-8 md:p-16 rounded-3xl glass-brand flex flex-col lg:flex-row items-center gap-12 border border-emerald-500/10">
            
            <div className="flex-1 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Segurança de Nível Bancário</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
                Seus dados guardados localmente com validação híbrida.
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Ao contrário das plataformas SaaS tradicionais que guardam os seus dados e logins financeiros nos servidores deles, o VukaPay armazena tudo no seu disco rígido através de um banco de dados SQLite local robusto.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    <strong className="text-white">Associação por Hardware (HWID):</strong> A sua licença é vinculada criptograficamente ao seu PC usando hashes SHA-256 gerados localmente.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-sm text-gray-300 font-medium">
                    <strong className="text-white">Assinatura Digital de Atualizações:</strong> Usamos chaves criptográficas Minisign. O aplicativo só aceita atualizações com assinaturas verificadas que correspondam à chave pública original.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 mt-1">
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
              <div className="relative p-8 w-full max-w-sm rounded-2xl glass-brand flex flex-col items-center text-center shadow-xl border border-emerald-500/20">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 animate-pulse">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Offline e Protegido</h3>
                <span className="text-[10px] font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded text-emerald-300 uppercase tracking-widest font-semibold mb-4">Base SQLite Criptografada</span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Os seus dados financeiros ficam guardados no seu computador, longe de olhares indesejados. É a sua segurança em primeiro lugar.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 💎 TABELA DE PREÇOS / PLANOS (Conversão Comercial) */}
      <section id="pricing" className="py-24 border-t border-white/5 bg-[#0a0e1a]/20 relative">
        <div className="absolute bottom-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-500/5 blur-[100px]"></div>
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Planos & Preços</span>
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
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Acesso a todos os recursos locais
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Banco de dados SQLite privado
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Integração com Google Drive
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a 
                  href="https://github.com/marcosdc20/sistema-de-controle-financeiro-pessoal-financer/releases/download/v1.1.0/VukaPay_1.1.0_x64-setup.exe"
                  className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white text-center text-sm font-semibold rounded-xl border border-white/10 transition-all"
                >
                  Descarregar Grátis (v1.1.0)
                </a>
              </div>
            </div>

            {/* Plan 2 - RECOMMENDED */}
            <div className="p-8 rounded-2xl glass-brand flex flex-col justify-between border-emerald-500/35 relative shadow-xl shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                Mais Popular
              </span>
              
              <div>
                <h3 className="text-lg font-bold text-white">Licença Anual</h3>
                <p className="text-xs text-emerald-300 mt-1">Ideal para controlo a longo prazo</p>
                <div className="mt-6 flex items-baseline">
                  <span className="font-display text-4xl font-extrabold text-white">12.000 AOA</span>
                  <span className="text-xs text-emerald-400 ml-1">/ano</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Acesso completo offline ilimitado
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Atualizações automáticas da v1.0.9+
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Sincronização contínua com nuvem
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Suporte prioritário via e-mail
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => openPurchase('annual')}
                  className="block w-full py-3.5 bg-gradient-to-r from-brand to-emerald-600 hover:from-brand-hover hover:to-emerald-700 text-white text-center text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 border-none cursor-pointer"
                >
                  Adquirir Licença Anual
                </button>
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
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Acesso vitalício à aplicação desktop
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Sem taxas adicionais recorrentes
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Todas as atualizações futuras
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => openPurchase('lifetime')}
                  className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white text-center text-sm font-semibold rounded-xl border border-white/10 transition-all cursor-pointer"
                >
                  Comprar Licença Perpétua
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📑 SECÇÃO DE PERGUNTAS FREQUENTES (FAQ Accordion) */}
      <section id="faq" className="py-24 relative">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">FAQ</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-2">
              Dúvidas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl glass overflow-hidden transition-all duration-300 border ${activeFaq === idx ? 'border-emerald-500/20' : 'border-white/5'}`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-base font-bold text-white pr-4">{faq.q}</span>
                  <span className={`text-emerald-400 flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-400 border-t border-white/5 leading-relaxed bg-[#0a0e1a]/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 👣 FOOTER (Rodapé Profissional) */}
      <footer className="bg-[#03050a] border-t border-white/5 text-gray-500 pt-16 pb-12">
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
            <span className="text-emerald-400 font-semibold">Tauri</span> &middot; 
            <span className="text-orange-400 font-semibold">Rust</span> &middot; 
            <span className="text-cyan-400 font-semibold">React</span>
          </p>
        </div>
      </footer>

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        initialPlan={purchasePlan}
      />

    </div>
  );
}
