import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan: 'monthly' | 'annual' | 'lifetime';
}

export default function PurchaseModal({ isOpen, onClose, initialPlan }: PurchaseModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [plan, setPlan] = useState<'monthly' | 'annual' | 'lifetime'>('annual');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'express' | 'paypay'>('bank_transfer');
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    if (isOpen) {
      setPlan(initialPlan);
      setStep(1);
      setEmail('');
      setWhatsapp('');
      setFileBase64(null);
      setFileName('');
      setFileSize('');
      setErrorMessage(null);
      setPaymentMethod('bank_transfer');
      setCopiedField(null);
    }
  }, [isOpen, initialPlan]);

  if (!isOpen) return null;

  const planPrices = {
    monthly: { price: 1500, label: 'Licença Mensal' },
    annual: { price: 12000, label: 'Licença Anual' },
    lifetime: { price: 45000, label: 'Licença Vitalícia' },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('O arquivo do comprovativo não deve exceder 2MB.');
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(1) + ' KB');
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFileBase64(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Por favor, insira o seu e-mail.');
      return;
    }
    if (!fileBase64) {
      setErrorMessage('Por favor, carregue o comprovativo de pagamento.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await addDoc(collection(db, 'payment_proofs'), {
        client_email: email.trim().toLowerCase(),
        whatsapp: whatsapp.trim(),
        plan_type: plan,
        payment_method: paymentMethod,
        proof_base64: fileBase64,
        status: 'pending',
        license_key: '',
        created_at: Date.now(),
        price_aoa: planPrices[plan].price,
        notes: 'Enviado via website vukapay-docs (Tema Dinâmico)',
      });

      setStep(3);
    } catch (err: any) {
      console.error('Erro ao enviar comprovativo:', err);
      setErrorMessage('Ocorreu um erro ao enviar o seu comprovativo. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#090D1A] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
        {/* Barra superior com gradiente */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-600 w-full" />

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors focus:outline-none rounded-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Conteúdo do Modal */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Adquirir Licença VukaPay</h2>
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Siga as instruções para ativar a sua licença de uso comercial.</p>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              {/* Opções de planos no formulário */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Plano Desejado</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlan('monthly')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      plan === 'monthly'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-950 dark:text-emerald-450 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Mensal</div>
                    <div className="text-sm font-black mt-1">1.500 AOA</div>
                    <div className="text-[9px] text-slate-400 dark:text-gray-500 mt-0.5">Renovável mensal</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlan('annual')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      plan === 'annual'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-950 dark:text-emerald-450 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Anual</div>
                    <div className="text-sm font-black mt-1">12.000 AOA</div>
                    <div className="text-[9px] text-slate-400 dark:text-gray-500 mt-0.5">1 ano de atualizações</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlan('lifetime')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      plan === 'lifetime'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-950 dark:text-emerald-450 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Vitalício</div>
                    <div className="text-sm font-black mt-1">45.000 AOA</div>
                    <div className="text-[9px] text-slate-400 dark:text-gray-500 mt-0.5">Uso vitalício perpétuo</div>
                  </button>
                </div>
              </div>

              {/* Informações básicas do cliente */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">O Seu E-mail (Importante)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0E1322] border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#0E1322] transition-all"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-1">A chave de ativação será gerada e enviada para este e-mail.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">WhatsApp / Telefone (Opcional)</label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="9XXXXXXXX"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0E1322] border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:bg-white dark:focus:bg-[#0E1322] transition-all"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-1">Facilita o envio rápido da chave pela nossa equipa de suporte.</p>
                </div>
              </div>

              {/* Ação */}
              <button
                type="button"
                onClick={() => {
                  if (!email.trim() || !email.includes('@')) {
                    setErrorMessage('Por favor, insira um e-mail válido.');
                    return;
                  }
                  setErrorMessage(null);
                  setStep(2);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Seguinte: Ver Coordenadas de Pagamento</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Método de Pagamento */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Método de Pagamento</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 h-16 ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-400 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'
                    }`}
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}logo_atlantico.png`} 
                      alt="Banco Atlântico" 
                      className="h-6 object-contain rounded"
                    />
                    <span className="text-[9px] uppercase tracking-wider font-semibold">Atlântico</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('express')}
                    className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 h-16 ${
                      paymentMethod === 'express'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-400 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'
                    }`}
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}logo_express.png`} 
                      alt="Multicaixa Express" 
                      className="h-6 object-contain rounded"
                    />
                    <span className="text-[9px] uppercase tracking-wider font-semibold">Express</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypay')}
                    className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 h-16 ${
                      paymentMethod === 'paypay'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-400 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10'
                    }`}
                  >
                    <img 
                      src={`${import.meta.env.BASE_URL}logo_paypay.jpg`} 
                      alt="PAYPAY" 
                      className="h-6 object-contain rounded"
                    />
                    <span className="text-[9px] uppercase tracking-wider font-semibold">PAYPAY</span>
                  </button>
                </div>
              </div>

              {/* Coordenadas Bancárias / Métodos */}
              <div className="p-4 bg-slate-50 dark:bg-[#0E1322] border border-slate-200/80 dark:border-white/5 rounded-xl space-y-3 transition-colors duration-300">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Dados de Pagamento</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{planPrices[plan].price.toLocaleString('pt-AO')} AOA</span>
                </div>

                {paymentMethod === 'bank_transfer' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-gray-400">Banco:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">Banco ATLANTICO</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-gray-400">Beneficiário:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold text-right text-[10px]">DOMINGOS MARCOS NARCISO CORREIA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-gray-400">N.º de Conta:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-800 dark:text-slate-200 font-mono font-bold">33200874210001</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('33200874210001', 'conta')}
                          className="text-slate-400 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                          {copiedField === 'conta' ? (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Copiado!</span>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-200 dark:border-white/5">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-gray-400">IBAN:</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('AO06005500003200874210154', 'iban')}
                          className="text-emerald-600 dark:text-emerald-450 hover:text-emerald-700 font-bold text-[10px] flex items-center gap-0.5"
                        >
                          {copiedField === 'iban' ? 'Copiado!' : 'Copiar IBAN'}
                        </button>
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 font-mono font-bold bg-slate-100 dark:bg-white/5 px-2 py-1.5 rounded text-center select-all border border-slate-200 dark:border-white/5 text-[10px] tracking-wider">
                        AO06005500003200874210154
                      </span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'express' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-gray-400">Canal:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">Multicaixa Express</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-gray-400">Número Express:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-800 dark:text-slate-200 font-mono font-bold text-sm">949 210 026</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('949210026', 'express')}
                          className="text-slate-400 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                          {copiedField === 'express' ? (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Copiado!</span>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      Efetue o pagamento por transferência via Multicaixa Express para o número acima.
                    </p>
                  </div>
                )}

                {paymentMethod === 'paypay' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-gray-400">Canal:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">PAYPAY</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-gray-400">Entidade:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-800 dark:text-slate-200 font-mono font-bold">10116</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('10116', 'paypay_ent')}
                          className="text-slate-400 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                          {copiedField === 'paypay_ent' ? (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Copiado!</span>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-gray-400">Referência:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-800 dark:text-slate-200 font-mono font-bold">949210026</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('949210026', 'paypay_ref')}
                          className="text-slate-400 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                          {copiedField === 'paypay_ref' ? (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Copiado!</span>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload do Comprovativo */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">Carregar Comprovativo (.pdf, .png, .jpg)</label>
                <div className="relative">
                  <input
                    type="file"
                    required
                    accept=".pdf,image/png,image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-file-upload"
                  />
                  <label
                    htmlFor="receipt-file-upload"
                    className="w-full py-5 bg-slate-50 dark:bg-[#0E1322] border border-dashed border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:bg-slate-100/50 dark:hover:bg-[#0E1322]/80 transition-all rounded-xl flex flex-col items-center justify-center cursor-pointer text-center px-4"
                  >
                    <svg className="w-7 h-7 text-slate-400 dark:text-gray-500 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {fileName ? (
                      <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-450 block max-w-[250px] truncate">{fileName}</span>
                        <span className="text-[10px] text-slate-400 dark:text-gray-500">{fileSize}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xs font-semibold text-slate-500 dark:text-gray-300 block">Clique para selecionar o comprovativo</span>
                        <span className="text-[10px] text-slate-400 dark:text-gray-500 block mt-0.5">Formatos: PDF, PNG, JPG (Máx: 2MB)</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Mensagem de Erro */}
              {errorMessage && (
                <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 transition-all text-sm cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Submeter Comprovativo</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 rounded-full flex items-center justify-center mx-auto scale-110">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Comprovativo Submetido com Sucesso!</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Recebemos o seu comprovativo. O administrador irá analisá-lo e enviar a sua chave de ativação para o e-mail <strong className="text-slate-950 dark:text-white font-bold">{email}</strong> em breve.
                </p>
              </div>

              {/* Informações adicionais de envio rápido */}
              <div className="max-w-sm mx-auto bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-4 space-y-3.5 text-left text-xs transition-colors duration-300">
                <p className="text-slate-700 dark:text-gray-300 font-semibold text-center border-b border-slate-200 dark:border-white/5 pb-2">Precisa de Ativação Instantânea?</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-450 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-gray-500 block">Envie também pelo WhatsApp</span>
                    <a
                      href={`https://wa.me/244949210026?text=Olá! Acabei de efetuar o pagamento da minha licença VukaPay (${plan === 'monthly' ? 'Mensal' : plan === 'annual' ? 'Anual' : 'Vitalícia'}) e enviei o comprovativo pelo site para o email: ${encodeURIComponent(email)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                    >
                      949 210 026
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-450 shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-gray-500 block">E-mail de Suporte</span>
                    <span className="text-slate-800 dark:text-slate-200 font-mono font-medium">suporte.vukapay@gmail.com</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-600/15 cursor-pointer"
              >
                Concluir e Voltar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
