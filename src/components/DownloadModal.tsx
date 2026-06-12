interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlatform?: string;
}

const APP_VERSION = '1.1.3';
const GITHUB_RELEASE_BASE = `https://github.com/marcosdc20/sistema-de-controle-financeiro-pessoal-financer/releases/download/v${APP_VERSION}`;

interface PlatformOption {
  name: string;
  osName: string;
  icon: string;
  type: 'desktop' | 'mobile';
  primaryDownload: {
    label: string;
    url: string;
  };
  secondaryDownload?: {
    label: string;
    url: string;
  };
  info: string;
}

export default function DownloadModal({ isOpen, onClose, defaultPlatform }: DownloadModalProps) {
  if (!isOpen) return null;

  const platforms: PlatformOption[] = [
    {
      name: 'Windows',
      osName: 'windows',
      icon: 'windows.png',
      type: 'desktop',
      primaryDownload: {
        label: 'Instalador (.exe)',
        url: `${GITHUB_RELEASE_BASE}/VukaPay_${APP_VERSION}_x64-setup.exe`
      },
      secondaryDownload: {
        label: 'Pacote MSI (.msi)',
        url: `${GITHUB_RELEASE_BASE}/VukaPay_${APP_VERSION}_x64_pt-BR.msi`
      },
      info: 'Compatível com Windows 10 e 11 (64-bit).'
    },
    {
      name: 'macOS',
      osName: 'mac',
      icon: 'mac.png',
      type: 'desktop',
      primaryDownload: {
        label: 'Apple Silicon (M1/M2/M3)',
        url: `${GITHUB_RELEASE_BASE}/VukaPay_${APP_VERSION}_aarch64.dmg`
      },
      secondaryDownload: {
        label: 'Intel Macs (.dmg)',
        url: `${GITHUB_RELEASE_BASE}/VukaPay_${APP_VERSION}_x86_64.dmg`
      },
      info: 'Requer macOS 11 Big Sur ou superior.'
    },
    {
      name: 'Linux',
      osName: 'linux',
      icon: 'Linux.png',
      type: 'desktop',
      primaryDownload: {
        label: 'Pacote Debian (.deb)',
        url: `${GITHUB_RELEASE_BASE}/vukapay_${APP_VERSION}_amd64.deb`
      },
      secondaryDownload: {
        label: 'Universal (.AppImage)',
        url: `${GITHUB_RELEASE_BASE}/VukaPay_${APP_VERSION}_amd64.AppImage`
      },
      info: 'Testado no Ubuntu, Mint, Fedora e Debian.'
    },
    {
      name: 'Android',
      osName: 'android',
      icon: 'Android.png',
      type: 'mobile',
      primaryDownload: {
        label: 'Instalar Pacote (.apk)',
        url: `${GITHUB_RELEASE_BASE}/VukaPay_${APP_VERSION}_universal.apk`
      },
      info: 'Requer Android 8.0 Oreo ou superior. Sideload ativado.'
    }
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Glow Backgrounds */}
        <div className="absolute -top-1/4 -right-1/4 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              Lançamento Oficial
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Descarregar o VukaPay
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Escolha a sua plataforma preferida. Versão estável instalada atual: <span className="font-semibold text-white">v{APP_VERSION}</span>.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all cursor-pointer"
          >
            {/* Inline X Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((platform) => (
            <div 
              key={platform.name}
              className={`relative overflow-hidden rounded-2xl bg-slate-950/40 p-5 flex flex-col justify-between transition-all duration-300 group ${
                platform.osName === defaultPlatform 
                  ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 scale-[1.02]' 
                  : 'border border-slate-800/80 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5'
              }`}
            >
              <div>
                {/* Platform Icon & Tag */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-2.5 shadow-md transition-transform group-hover:scale-105 duration-300">
                    <img 
                      src={`${import.meta.env.BASE_URL}${platform.icon}`} 
                      alt={`${platform.name} icon`} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1.5">
                    {platform.type === 'desktop' ? (
                      /* Inline Monitor Icon */
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                      </svg>
                    ) : (
                      /* Inline Smartphone Icon */
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18h9" />
                      </svg>
                    )}
                    {platform.type}
                  </span>
                </div>

                {/* Name & description */}
                <h3 className="text-lg font-bold text-white tracking-tight">{platform.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed mb-4">
                  {platform.info}
                </p>
              </div>

              {/* Download Buttons */}
              <div className="space-y-2 mt-auto">
                <a
                  href={platform.primaryDownload.url}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-emerald-500/10 flex items-center justify-center gap-1.5 border-none active:scale-95 text-center"
                >
                  {/* Inline Download Icon */}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  {platform.primaryDownload.label}
                </a>
                
                {platform.secondaryDownload && (
                  <a
                    href={platform.secondaryDownload.url}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-white text-[11px] font-semibold rounded-xl transition-all border border-slate-800/80 flex items-center justify-center gap-1 text-center"
                  >
                    {platform.secondaryDownload.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Todos os pacotes são encriptados e assinados digitalmente.
          </p>
          <a 
            href="https://github.com/marcosdc20/sistema-de-controle-financeiro-pessoal-financer/releases"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Ver histórico de lançamentos &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
