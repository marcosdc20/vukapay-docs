import { useState, useEffect } from 'react';
import PurchaseModal from './components/PurchaseModal';
import DownloadModal from './components/DownloadModal';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [purchasePlan, setPurchasePlan] = useState<'monthly' | 'annual' | 'lifetime'>('annual');
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(undefined);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Screenshot carousel list
  const screenshots = [
    {
      key: 'dashboard',
      title: 'Painel Geral de Controle',
      desc: 'Visualize despesas, receitas, fluxo de caixa mensal e distribuição de categorias em tempo real com gráficos avançados.',
      path: 'dashboard.png'
    },
    {
      key: 'charts',
      title: 'Estatísticas e Gráficos Interativos',
      desc: 'Analise padrões históricos de consumo, acompanhe saldos consolidados de cartões e contas num único ecrã.',
      path: 'charts.png'
    },
    {
      key: 'kanban',
      title: 'Gestão de Tarefas e Projetos (Kanban)',
      desc: 'Um módulo completo de produtividade integrado ao seu painel financeiro para gerir projetos pessoais e profissionais.',
      path: 'kanban.png'
    }
  ];

  // Auto-slide effect for the carousel (every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  const openPurchase = (planType: 'monthly' | 'annual' | 'lifetime') => {
    setPurchasePlan(planType);
    setIsPurchaseModalOpen(true);
  };

  const openDownload = (platform: string) => {
    setSelectedPlatform(platform);
    setIsDownloadModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactEmail('');
      setContactCompany('');
      setContactPhone('');
      setContactMessage('');
    }, 4000);
  };

  const faqs = [
    {
      q: 'O aplicativo funciona totalmente sem internet?',
      a: 'Sim, o VukaPay adota o conceito Offline-First. Toda a base de dados (SQLite) e lógica financeira funcionam no seu computador local sem precisar de qualquer ligação à rede. A internet é utilizada apenas caso decida fazer backups manuais/automáticos na sua conta Google Drive ou para verificação periódica de licença.'
    },
    {
      q: 'Como funciona o backup no Google Drive? Meus dados estão seguros?',
      a: 'O backup é totalmente organizado por si. O app utiliza o protocolo de autenticação segura da Google (OAuth 2.0) com permissão restrita. Isso significa que o VukaPay só consegue criar e ler o seu próprio ficheiro de backup criptografado (vukapay_backup.json), e não tem acesso a mais nada na sua conta Google.'
    },
    {
      q: 'Como funciona o licenciamento híbrido e ativação local?',
      a: 'Ao adquirir o VukaPay, recebe uma chave de licença única. Durante a ativação, o software associa localmente essa chave ao identificador único criptografado (SHA-256) do seu hardware (motherboard ou disco). Isso garante que a sua licença seja validada de forma híbrida e local sem monitorizar os seus dados financeiros.'
    },
    {
      q: 'Quais os sistemas operacionais suportados?',
      a: 'Atualmente, o VukaPay é distribuído oficialmente para Windows (instalador .exe e pacote .msi), macOS (instalador universal .dmg para Intel e Apple Silicon) e Linux (Debian .deb e .AppImage) construído sobre a tecnologia leve e segura do Tauri.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 selection:bg-emerald-500/20 selection:text-emerald-950 antialiased font-sans transition-colors duration-300">
      
      {/* 💻 HEADER / BARRA DE NAVEGAÇÃO */}
      <header className="sticky top-0 z-[100] w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 focus:outline-none">
            <img src={`${import.meta.env.BASE_URL}logo_vukapay_minimal.png`} alt="VukaPay logo" className="h-9 w-9 rounded-xl shadow-sm" />
            <span className="font-display text-2xl font-black tracking-tight text-slate-900">
              Vuka<span className="text-emerald-600">Pay</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Início</a>
            <a href="#como-funciona" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Como Funciona</a>
            <a href="#solucoes" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Soluções</a>
            <a href="#pricing" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Preços</a>
            <a href="#faq" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">FAQ</a>
            <a href="#contacto" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Contactos</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search toggler */}
            <div className="relative flex items-center">
              {searchOpen && (
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar..." 
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs mr-2 focus:outline-none focus:border-emerald-500 focus:ring-0 w-40 animate-in slide-in-from-right-4 duration-200"
                />
              )}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-500 hover:text-emerald-600 transition-all rounded-lg hover:bg-slate-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Login button */}
            <button 
              onClick={() => openDownload('windows')}
              className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer border-none bg-transparent focus:outline-none focus:ring-0"
            >
              Entrar
            </button>

            {/* CTA Button */}
            <button 
              onClick={() => setIsPurchaseModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer border-none focus:outline-none focus:ring-0"
            >
              Registe-se
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-500 hover:text-emerald-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-6 space-y-4 shadow-inner">
            <nav className="flex flex-col gap-4">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-emerald-600">Início</a>
              <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-emerald-600">Como Funciona</a>
              <a href="#solucoes" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-emerald-600">Soluções</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-emerald-600">Preços</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-emerald-600">FAQ</a>
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-slate-600 hover:text-emerald-600">Contactos</a>
            </nav>
            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button 
                onClick={() => { openDownload('windows'); setMobileMenuOpen(false); }}
                className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl text-center text-sm"
              >
                Entrar
              </button>
              <button 
                onClick={() => { setIsPurchaseModalOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl text-center text-sm shadow-md"
              >
                Registe-se
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 🚀 SECÇÃO HERO */}
      <section id="home" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white">
        
        {/* Curved Abstract Shapes in Yellow/Gold */}
        <div className="absolute top-10 right-10 -z-10 w-48 h-10 rounded-full bg-yellow-400/25 blur-sm rotate-45 pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-10 -z-10 w-64 h-16 rounded-full bg-yellow-400/20 blur-md -rotate-12 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl">
              Gerir e rentabilizar o seu dinheiro nunca foi tão simples.
            </h1>
            <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-2xl">
              Com o VukaPay, enviar, receber e poupar dinheiro está ao seu alcance. Simplicidade, rapidez e privacidade total com banco de dados local seguro no seu PC.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start">
              <button 
                onClick={() => setIsPurchaseModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-800 font-bold rounded-2xl hover:bg-emerald-50 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border-none focus:outline-none focus:ring-0"
              >
                Registe-se grátis
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Small indicators/dots mimicking the slide dots */}
            <div className="flex gap-2 pt-6">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScreenshot(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer border-none focus:outline-none focus:ring-0 ${
                    idx === activeScreenshot ? 'w-8 bg-white' : 'w-2.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Hero Device Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/18] rounded-[3.2rem] border-[12px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden group">
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
                <span className="w-10 h-1 bg-slate-800 rounded-full mb-1" />
              </div>
              
              {/* Simulated Screen with Screenshots */}
              <div className="relative w-full h-full overflow-hidden">
                {screenshots.map((screen, idx) => (
                  <div
                    key={screen.key}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                      idx === activeScreenshot ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}${screen.path}`} 
                      alt={screen.title}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="absolute top-2 left-6 right-6 flex justify-between text-[9px] font-bold text-white/95 z-40 select-none">
                <span>10:18</span>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.13 19.63 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" /></svg>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 10V8h-4V4H8v4H4v2h4v10H6v2h12v-2h-2V10h4z" /></svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 📱 SECÇÃO PLATAFORMAS */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Disponível para todas as plataformas</h2>
              <p className="text-xs text-slate-500 mt-0.5">Use o VukaPay no dispositivo de sua preferência.</p>
            </div>
            
            {/* Grid of Platforms */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 shrink-0">
              <button 
                onClick={() => openDownload('windows')}
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 hover:border-emerald-500/30 rounded-xl transition-all text-xs font-bold text-slate-700 cursor-pointer text-left focus:outline-none focus:ring-0"
              >
                <img src={`${import.meta.env.BASE_URL}windows.png`} alt="Windows icon" className="w-5 h-5 object-contain" />
                Windows
              </button>
              <button 
                onClick={() => openDownload('linux')}
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 hover:border-emerald-500/30 rounded-xl transition-all text-xs font-bold text-slate-700 cursor-pointer text-left focus:outline-none focus:ring-0"
              >
                <img src={`${import.meta.env.BASE_URL}Linux.png`} alt="Linux icon" className="w-5 h-5 object-contain" />
                Linux
              </button>
              <button 
                onClick={() => openDownload('mac')}
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 hover:border-emerald-500/30 rounded-xl transition-all text-xs font-bold text-slate-700 cursor-pointer text-left focus:outline-none focus:ring-0"
              >
                <img src={`${import.meta.env.BASE_URL}mac.png`} alt="macOS icon" className="w-5 h-5 object-contain" />
                macOS
              </button>
              <button 
                onClick={() => openDownload('android')}
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 hover:border-emerald-500/30 rounded-xl transition-all text-xs font-bold text-slate-700 cursor-pointer text-left focus:outline-none focus:ring-0"
              >
                <img src={`${import.meta.env.BASE_URL}Android.png`} alt="Android icon" className="w-5 h-5 object-contain" />
                Android
              </button>
              <button 
                onClick={() => alert('A nossa versão nativa para iPhone está em desenvolvimento interno. Descarregue para Android ou Desktop para começar!')}
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 hover:border-emerald-500/30 rounded-xl transition-all text-xs font-bold text-slate-700 cursor-pointer text-left col-span-2 sm:col-span-1 focus:outline-none focus:ring-0"
              >
                {/* Smartphone outline */}
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                iPhone
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ⚙️ COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Como funciona</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
              Três passos simples para começar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-150 shadow-sm relative group hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center">1</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-left">Criar Conta</h3>
              <p className="text-slate-500 text-xs text-left mt-2 leading-relaxed">
                Registe-se gratuitamente na VukaPay em poucos minutos e defina o seu PIN de acesso seguro.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-150 shadow-sm relative group hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center">2</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-left">Adicionar Método de Pagamento</h3>
              <p className="text-slate-500 text-xs text-left mt-2 leading-relaxed">
                Adicione o seu cartão local ou conta bancária (Kwanza ou moedas estrangeiras) à sua carteira.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-150 shadow-sm relative group hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center">3</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-left">Fazer Pagamentos</h3>
              <p className="text-slate-500 text-xs text-left mt-2 leading-relaxed">
                Envie, receba e pague com segurança a qualquer pessoa, em qualquer lugar de forma autónoma.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 🛡️ POR QUE ESCOLHER A VUKAPAY */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Por que escolher a VukaPay?</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
              Segurança e Rapidez sem Compromissos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            
            {/* Card 1 */}
            <div className="p-6 border border-slate-100 rounded-2xl space-y-4 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">Segurança</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Protegemos os seus dados locais e transações com encriptação e verificação híbrida.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 border border-slate-100 rounded-2xl space-y-4 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">Rapidez</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Transações financeiras concluídas em segundos no seu computador local, sem filas ou intermediários.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 border border-slate-100 rounded-2xl space-y-4 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">Facilidade</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Uma interface desenhada e otimizada para o uso no dia a dia, mesmo sem conhecimentos técnicos.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 border border-slate-100 rounded-2xl space-y-4 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900">Disponibilidade</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Totalmente disponível offline 24 horas por dia, 7 dias por semana, para consultar saldos e registar dados.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 📹 NOVO: SECÇÃO DE VÍDEO DEMONSTRATIVO */}
      <section className="py-20 bg-slate-100/60 border-t border-b border-slate-200/40">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Demonstração</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 mt-2">
              Veja o VukaPay em Ação
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-lg mx-auto">
              Descubra como o nosso software desktop simplifica o seu orçamento, monitoriza as suas kixiquilas e organiza as suas contas sem esforço.
            </p>
          </div>

          {/* Interactive Mock Video Card */}
          <div className="relative group max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 bg-slate-950 aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
              alt="Video thumbnail" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Dark tint overlay */}
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/35 transition-colors duration-300" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="w-20 h-20 bg-white hover:bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-none focus:outline-none focus:ring-0"
              >
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="text-xs text-white font-bold uppercase tracking-wider mt-4 bg-slate-900/60 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm select-none">
                Vídeo de Demonstração (3:45)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 💼 NOSSAS SOLUÇÕES */}
      <section id="solucoes" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Nossas soluções</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
              Soluções financeiras para si e para o seu negócio
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            {/* Sol 1 */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/20 border border-slate-100 rounded-2xl transition-all duration-300">
              <h3 className="text-base font-bold text-slate-900">Payments</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Integração e controlo de pagamentos e fluxos para gerir os seus recebimentos e faturas.
              </p>
            </div>

            {/* Sol 2 */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/20 border border-slate-100 rounded-2xl transition-all duration-300">
              <h3 className="text-base font-bold text-slate-900">Payouts</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Processamento local de pagamentos em lote e suporte a salários ou transferências em massa.
              </p>
            </div>

            {/* Sol 3 */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/20 border border-slate-100 rounded-2xl transition-all duration-300">
              <h3 className="text-base font-bold text-slate-900">Cross-border</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Simulações e relatórios analíticos de envio/receção de fundos em múltiplas moedas.
              </p>
            </div>

            {/* Sol 4 */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/20 border border-slate-100 rounded-2xl transition-all duration-300">
              <h3 className="text-base font-bold text-slate-900">Digital Wallets</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Criação de subcontas e carteiras digitais simuladas para controlo preciso por categorias.
              </p>
            </div>

            {/* Sol 5 */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/20 border border-slate-100 rounded-2xl transition-all duration-300">
              <h3 className="text-base font-bold text-slate-900">Voucher Solutions</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Organização e controlo de vales e cupões de oferta locais de forma organizada.
              </p>
            </div>

            {/* Sol 6 */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/20 border border-slate-100 rounded-2xl transition-all duration-300">
              <h3 className="text-base font-bold text-slate-900">Investments</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Relatórios consolidados de investimentos de alta liquidez e histórico de taxas e dividendos.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 📱 NOVO: SECÇÃO DE REDES SOCIAIS E PORTFÓLIO */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Novidades e Redes Sociais</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
              Acompanhe a Nossa Atividade
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-lg mx-auto">
              Veja o nosso progresso, dicas de finanças e anúncios oficiais nos nossos canais e portefólio social.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Social Post 1 - Instagram */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
              <div>
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">I</span>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">@vukapay</span>
                      <span className="text-[9px] text-slate-400">Instagram</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">Dicas</span>
                </div>
                {/* Image mockup */}
                <div className="bg-gradient-to-br from-emerald-400 to-teal-600 aspect-video flex items-center justify-center p-6 text-white text-center relative">
                  <span className="font-display font-extrabold text-sm tracking-tight leading-relaxed max-w-xs">
                    Como poupar 20% do salário mensal no Kwanza? 💰
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "A regra dos 50/30/20 adaptada à realidade de Angola: use o módulo de Kixiquilas e metas do VukaPay para organizar o seu orçamento automaticamente."
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-rose-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                  <span>342 Likes</span>
                </div>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">Ver no Instagram</a>
              </div>
            </div>

            {/* Social Post 2 - LinkedIn */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
              <div>
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white font-bold text-xs">in</span>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">VukaPay Corporate</span>
                      <span className="text-[9px] text-slate-400">LinkedIn</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">Release</span>
                </div>
                {/* Image mockup */}
                <div className="bg-slate-900 aspect-video flex items-center justify-center p-6 text-white text-center relative">
                  <span className="font-display font-extrabold text-sm tracking-tight leading-relaxed max-w-xs text-emerald-400">
                    VukaPay v1.1.3 — Novo Lançamento de Produtividade 🚀
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "Temos o orgulho de lançar a nova atualização. Agora com carregamento dinâmico de versão no Tauri, remoção de lances do modo escuro temporário e interface de comunidade tabulada."
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-blue-600">
                  {/* Inline thumbs up */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" /></svg>
                  <span>156 Likes</span>
                </div>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">Ver no LinkedIn</a>
              </div>
            </div>

            {/* Social Post 3 - Portfolio/Roadmap */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
              <div>
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs">P</span>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">VukaPay Roadmap</span>
                      <span className="text-[9px] text-slate-400">Portefólio</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">Meta</span>
                </div>
                {/* Image mockup */}
                <div className="bg-gradient-to-br from-[#0B0F19] to-emerald-950 aspect-video flex items-center justify-center p-6 text-white text-center relative">
                  <span className="font-display font-extrabold text-sm tracking-tight leading-relaxed max-w-xs text-yellow-400">
                    +10.000 Licenças de Desktop Ativas em Angola 🇦🇴
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    "Continuamos focados na soberania dos dados do utilizador. Nenhuma transação ou dado bancário passa pelos nossos servidores. 100% de privacidade."
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <span>4.9 Avaliações</span>
                </div>
                <a href="#pricing" className="text-emerald-600 hover:underline">Obter Licença</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📊 BANNER ESTATÍSTICAS (Verde Esmeralda) */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700 text-white relative overflow-hidden">
        {/* Decorative ribbons */}
        <div className="absolute top-0 right-10 w-24 h-6 rounded-b-xl bg-yellow-400/20" />
        <div className="absolute bottom-0 left-10 w-24 h-6 rounded-t-xl bg-yellow-400/20" />

        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="space-y-2">
            <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white">17+</div>
            <div className="text-sm font-bold uppercase tracking-wider text-emerald-100">Países</div>
            <p className="text-xs text-emerald-50 leading-relaxed max-w-xs mx-auto">
              Presença e suporte a transações em crescimento em Angola e continentes.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white">75+</div>
            <div className="text-sm font-bold uppercase tracking-wider text-emerald-100">Métodos de Pagamento</div>
            <p className="text-xs text-emerald-50 leading-relaxed max-w-xs mx-auto">
              Controlo de bancos locais via IBAN e conciliação fácil.
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white">8%</div>
            <div className="text-sm font-bold uppercase tracking-wider text-emerald-100">Maior Taxa de Sucesso</div>
            <p className="text-xs text-emerald-50 leading-relaxed max-w-xs mx-auto">
              Eficiência otimizada de transações registadas localmente sem perdas de rede.
            </p>
          </div>
        </div>
      </section>

      {/* 🤝 PARCEIROS */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-8">Parceiros que confiam em nós</h3>
          
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-75">
            <span className="font-display font-black text-xl text-slate-800 tracking-tight">VISA</span>
            <span className="font-display font-black text-xl text-slate-800 tracking-tight">mastercard</span>
            <span className="font-display font-black text-xl text-slate-800 tracking-tight">Verve</span>
            
            {/* Local partners using bank logos from public directory */}
            <div className="flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}logo_atlantico.png`} alt="Banco Atlântico" className="h-6 object-contain rounded" />
              <span className="text-xs font-bold text-slate-700">ATLANTICO</span>
            </div>
            
            <div className="flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}logo_express.png`} alt="Express" className="h-6 object-contain rounded" />
              <span className="text-xs font-bold text-slate-700">Express</span>
            </div>

            <div className="flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}logo_paypay.jpg`} alt="PAYPAY" className="h-6 object-contain rounded" />
              <span className="text-xs font-bold text-slate-700">PAYPAY</span>
            </div>
          </div>
        </div>
      </section>

      {/* 💎 TABELA DE PREÇOS */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Planos & Preços</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
              Escolha o plano ideal para a sua autonomia financeira
            </h2>
            <p className="mt-4 text-xs text-slate-500">
              Acesso total às ferramentas locais no desktop. Pagamentos flexíveis e sem contratos de fidelização.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Plan 1 - Mensal */}
            <div className="p-8 bg-white rounded-2xl border border-slate-150 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Licença Mensal</h3>
                <p className="text-xs text-slate-400 mt-1">Controlo flexível mês a mês</p>
                <div className="mt-6 flex items-baseline">
                  <span className="font-display text-3xl font-black text-slate-900">1.500 AOA</span>
                  <span className="text-xs text-slate-400 ml-1">/mês</span>
                </div>
                <ul className="mt-8 space-y-4 text-xs text-slate-500">
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Acesso completo offline ilimitado
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Banco de dados SQLite privado
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Backup criptografado no Google Drive
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => openPurchase('monthly')}
                  className="block w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-center text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer focus:outline-none"
                >
                  Adquirir Licença Mensal
                </button>
              </div>
            </div>

            {/* Plan 2 - Anual */}
            <div className="p-8 bg-white rounded-2xl border-2 border-emerald-500 relative shadow-xl shadow-emerald-500/5 flex flex-col justify-between hover:scale-[1.01] transition-all duration-300">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow">
                Mais Popular
              </span>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900">Licença Anual</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1">Economize com pagamento anual</p>
                <div className="mt-6 flex items-baseline">
                  <span className="font-display text-3xl font-black text-slate-900">12.000 AOA</span>
                  <span className="text-xs text-emerald-600 font-bold ml-1">/ano</span>
                </div>
                <ul className="mt-8 space-y-4 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Acesso completo offline ilimitado
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Atualizações automáticas gratuitas
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Sincronização contínua com nuvem
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Suporte prioritário via e-mail
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => openPurchase('annual')}
                  className="block w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-center text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 border-none cursor-pointer focus:outline-none"
                >
                  Adquirir Licença Anual
                </button>
              </div>
            </div>

            {/* Plan 3 - Vitalício */}
            <div className="p-8 bg-white rounded-2xl border border-slate-150 flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Licença Vitalícia</h3>
                <p className="text-xs text-slate-400 mt-1">Uso contínuo e sem limites</p>
                <div className="mt-6 flex items-baseline">
                  <span className="font-display text-3xl font-black text-slate-900">45.000 AOA</span>
                  <span className="text-xs text-slate-400 ml-1">/único</span>
                </div>
                <ul className="mt-8 space-y-4 text-xs text-slate-500">
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Acesso vitalício à aplicação desktop
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Sem taxas adicionais recorrentes
                  </li>
                  <li className="flex items-center gap-2">
                     <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    Todas as atualizações futuras
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button 
                  onClick={() => openPurchase('lifetime')}
                  className="block w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-center text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer focus:outline-none"
                >
                  Comprar Licença Vitalícia
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📑 PERGUNTAS FREQUENTES (FAQ) */}
      <section id="faq" className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">FAQ</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
              Dúvidas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl overflow-hidden transition-all duration-350 border ${
                  activeFaq === idx ? 'border-emerald-500/25 bg-slate-50/50 shadow-sm' : 'border-slate-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer bg-transparent border-none"
                >
                  <span className="text-sm font-bold text-slate-800 pr-4">{faq.q}</span>
                  <span className={`text-emerald-600 flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                
                {activeFaq === idx && (
                  <div className="px-6 pb-6 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/30 transition-colors">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ TESTEMUNHOS DE CLIENTES */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Testemunhos</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 mt-2">
              O que dizem os nossos clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Testimonial 1 */}
            <div className="p-8 bg-white rounded-2xl border border-slate-150 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "O VukaPay revolucionou a forma como faço pagamentos e controlo as minhas transações financeiras pessoais. Rápido, seguro e muito fácil de usar!"
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">JM</span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">João M.</span>
                  <span className="text-[10px] text-slate-400">Empresário</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 bg-white rounded-2xl border border-slate-150 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Excelente suporte e plataforma super confiável. Recomendo para todos que precisam de soluções inteligentes e locais de controle de poupança."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">AS</span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Ana S.</span>
                  <span className="text-[10px] text-slate-400">Gestora Financeira</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-8 bg-white rounded-2xl border border-slate-150 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "A gestão local e offline de contas em Kwanza e Euro funciona sem qualquer falha ou travamento. É a melhor solução no mercado nacional."
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">CD</span>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Carlos D.</span>
                  <span className="text-[10px] text-slate-400">Exportador</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ✉️ FORMULÁRIO DE CONTACTO & PRONTO PARA COMEÇAR */}
      <section id="contacto" className="py-20 bg-white relative">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Pronto para começar?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              Junte-se a milhares de pessoas e empresas que já confiam no VukaPay para o registo e organização do seu fluxo financeiro pessoal.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => setIsPurchaseModalOpen(true)}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all border-none cursor-pointer text-xs focus:outline-none"
              >
                Registe-se grátis
              </button>
              <a 
                href="mailto:suporte.vukapay@gmail.com"
                className="px-6 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all text-xs text-center"
              >
                Fale connosco
              </a>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Nome completo</label>
                  <input 
                    type="text" 
                    required 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="João Silva" 
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="exemplo@email.com" 
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Empresa</label>
                  <input 
                    type="text" 
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                    placeholder="VukaPay LDA" 
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Telefone</label>
                  <input 
                    type="text" 
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+244 9XXXXXXXX" 
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Mensagem</label>
                <textarea 
                  required 
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Como podemos ajudar a organizar a sua carteira?" 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 resize-none" 
                />
              </div>

              {contactSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl text-center">
                  ✓ Mensagem enviada com sucesso! A nossa equipa entrará em contacto brevemente.
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-98 flex items-center justify-center gap-1 cursor-pointer border-none focus:outline-none"
              >
                {/* Send Icon */}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Enviar Mensagem
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 👣 FOOTER */}
      <footer className="bg-[#060913] border-t border-slate-900 text-slate-400 pt-16 pb-12 transition-colors">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Logo & Desc */}
          <div className="space-y-4 md:col-span-2">
            <a href="#" className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}logo_vukapay_minimal.png`} alt="VukaPay logo" className="h-8 w-8 rounded-lg" />
              <span className="font-display text-xl font-bold tracking-tight text-white">VukaPay</span>
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-medium">
              A VukaPay é uma plataforma de pagamento que torna o envio, recebimento e gestão de dinheiro simples, rápido e seguro.
            </p>
            {/* Social Icons Mockup */}
            <div className="flex gap-4 pt-2">
              {/* Facebook */}
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-slate-400 hover:text-emerald-500 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Links rápidos</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#home" className="hover:text-emerald-500 transition-colors">Home</a></li>
              <li><a href="#como-funciona" className="hover:text-emerald-500 transition-colors">Como Funciona</a></li>
              <li><a href="#solucoes" className="hover:text-emerald-500 transition-colors">Produtos</a></li>
              <li><a href="#contacto" className="hover:text-emerald-500 transition-colors">Contactos</a></li>
            </ul>
          </div>

          {/* Produtos */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Produtos</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#solucoes" className="hover:text-emerald-500 transition-colors">Payments</a></li>
              <li><a href="#solucoes" className="hover:text-emerald-500 transition-colors">Payouts</a></li>
              <li><a href="#solucoes" className="hover:text-emerald-500 transition-colors">Cross-border</a></li>
              <li><a href="#solucoes" className="hover:text-emerald-500 transition-colors">Digital Wallets</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Suporte</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#faq" className="hover:text-emerald-500 transition-colors">Ajuda & FAQ</a></li>
              <li><a href="mailto:suporte.vukapay@gmail.com" className="hover:text-emerald-500 transition-colors">Contacto Suporte</a></li>
              <li><a href="privacy.html" className="hover:text-emerald-500 transition-colors">Políticas de Privacidade</a></li>
              <li><a href="terms.html" className="hover:text-emerald-500 transition-colors">Termos de Serviço</a></li>
            </ul>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4">
          <p>&copy; {new Date().getFullYear()} VukaPay. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Idioma:</span>
            <span className="text-white font-bold select-none cursor-pointer">Português 🇵🇹</span>
          </div>
        </div>
      </footer>

      {/* 🛒 MODAIS DO SISTEMA */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        initialPlan={purchasePlan}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        defaultPlatform={selectedPlatform}
      />

      {/* 📹 MODAL DE REPRODUTOR DE VÍDEO INTERATIVO (DEMO) */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-50 p-2.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video layout */}
            <div className="p-1.5 aspect-video w-full bg-slate-950">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                title="VukaPay Demo Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full rounded-2xl"
              />
            </div>
            {/* Bottom info */}
            <div className="p-4 bg-slate-900 flex justify-between items-center text-xs text-slate-400 border-t border-slate-800/80">
              <span className="font-bold text-white">VukaPay Walkthrough Técnico & Funcionalidades</span>
              <span>Versão Atual: v1.1.3</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
