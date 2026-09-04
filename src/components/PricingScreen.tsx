import React, { useState, useMemo } from 'react';
import { audioEngine } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';
import { Language } from '../types';
import {
  PRICING_CATEGORIES,
  PRICING_SERVICES,
} from '../data/pricingData';
import {
  Check,
  Plus,
  Trash2,
  Copy,
  Mail,
  Calculator,
} from 'lucide-react';

interface PricingScreenProps {
  language?: Language;
  onBack?: () => void;
  onNavigateWorks?: () => void;
}

export const PricingScreen: React.FC<PricingScreenProps> = ({
  language = 'es',
  onBack,
  onNavigateWorks,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Toggle selection of a service
  const handleToggleService = (serviceId: string) => {
    audioEngine.playClick(1.2);
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Remove a specific service
  const handleRemoveService = (serviceId: string) => {
    audioEngine.playClick(0.9);
    setSelectedServiceIds((prev) => prev.filter((id) => id !== serviceId));
  };

  // Clear all
  const handleClearAll = () => {
    audioEngine.playClick(0.8);
    setSelectedServiceIds([]);
  };

  // Switch category tab
  const handleSelectCategory = (catId: string) => {
    audioEngine.playClick(1.0);
    setSelectedCategory(catId);
  };

  // Selected items objects
  const selectedServices = useMemo(() => {
    return PRICING_SERVICES.filter((item) => selectedServiceIds.includes(item.id));
  }, [selectedServiceIds]);

  // Total amount in USD
  const totalUSD = useMemo(() => {
    return selectedServices.reduce((sum, item) => sum + item.priceUSD, 0);
  }, [selectedServices]);

  // Filtered services for display
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return PRICING_SERVICES;
    return PRICING_SERVICES.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Generate plain formatted text for budget summary
  const generateBudgetText = (): string => {
    const langKey = language;
    const dateStr = new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    let text = `╔══════════════════════════════════════════════╗\n`;
    text += `  LORENA ORLANDO // ${langKey === 'es' ? 'PRESUPUESTO ESTIMADO' : 'ESTIMATED BUDGET'}\n`;
    text += `  ${langKey === 'es' ? 'Fecha' : 'Date'}: ${dateStr}\n`;
    text += `╚══════════════════════════════════════════════╝\n\n`;

    if (selectedServices.length === 0) {
      text += `${langKey === 'es' ? 'No se han seleccionado servicios.' : 'No services selected.'}\n`;
    } else {
      text += `${langKey === 'es' ? 'SERVICIOS SELECCIONADOS' : 'SELECTED SERVICES'} (${selectedServices.length}):\n`;
      text += `──────────────────────────────────────────────\n`;
      selectedServices.forEach((s, idx) => {
        const catObj = PRICING_CATEGORIES.find((c) => c.id === s.category);
        const catName = catObj ? catObj.name[language] : '';
        text += `${idx + 1}. [${catName}] ${s.name[language]}\n`;
        text += `   • ${s.description[language]}\n`;
        text += `   • ${langKey === 'es' ? 'Precio' : 'Price'}: $${s.priceUSD.toFixed(2)} USD\n\n`;
      });
      text += `──────────────────────────────────────────────\n`;
      text += `${langKey === 'es' ? 'TOTAL ESTIMADO (USD)' : 'TOTAL ESTIMATE (USD)'}: $${totalUSD.toFixed(2)} USD\n`;
    }

    text += `\n${langKey === 'es' ? 'Diseño y Dirección Visual por Lorena Orlando' : 'Design & Visual Direction by Lorena Orlando'}\n`;
    text += `🌐 https://lorenaorlando.com\n`;
    return text;
  };

  // Copy to clipboard handler
  const handleCopySummary = async () => {
    try {
      const summaryText = generateBudgetText();
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      audioEngine.playClick(1.8);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  // Email contact handler (mailto:soylorenaorlando@gmail.com)
  const handleWorkWithMeContact = () => {
    audioEngine.playClick(1.4);
    const summaryText = generateBudgetText();
    const subject = encodeURIComponent(
      language === 'es'
        ? `¡Trabajemos Juntos! Solicitud de Presupuesto - $${totalUSD.toFixed(2)} USD`
        : `Let's Work Together! Budget Request - $${totalUSD.toFixed(2)} USD`
    );
    const body = encodeURIComponent(summaryText);
    const mailtoUrl = `mailto:soylorenaorlando@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div
      id="pricing-screen-root"
      className="relative z-10 w-full h-full min-h-0 flex flex-col bg-black text-[#E5FBB8] select-none overflow-hidden animate-fadeIn"
    >
      {/* 1. Header Terminal Ribbon */}
      <div className="w-full flex items-center justify-between border-b border-[#E5FBB8]/40 pb-2 mb-2 sm:mb-3 px-2 sm:px-4 pt-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E5FBB8] shadow-[0_0_5px_#E5FBB8] inline-block animate-pulse" />
          <span className="font-silkscreen text-[11px] sm:text-[13px] tracking-wider text-[#E5FBB8] uppercase">
            {t.pricing.title}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[9.5px] sm:text-[11px] text-[#E5FBB8]/80">
          <span className="hidden sm:inline-block px-1.5 py-0.5 border border-[#E5FBB8]/40 bg-[#E5FBB8]/10 rounded-[2px]">
            SYS.RATES_2026
          </span>
          <span className="text-[#E5FBB8] font-bold">
            {selectedServiceIds.length} {language === 'es' ? 'ELEGIDOS' : 'SELECTED'}
          </span>
        </div>
      </div>

      {/* 2. Main Scrollable Container (Split in 2 Columns on Desktop: Catalog on Left, Calculator on Right) */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto custom-scrollbar touch-pan-y overscroll-contain px-2 sm:px-4 pb-4">
        <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-4 lg:gap-5 items-start">
          
          {/* ========================================================
              LEFT COLUMN: CATEGORY SELECTOR TABS + SERVICE CARDS
             ======================================================== */}
          <div className="w-full lg:w-[62%] xl:w-[65%] flex flex-col gap-3.5">
            
            {/* Subtitle & Info */}
            <div className="text-[10px] sm:text-[11px] font-share-tech-mono text-[#E5FBB8]/80 tracking-wider flex items-center gap-1.5">
              <span className="text-[#E5FBB8]">■</span>
              <span>{t.pricing.subtitle}</span>
            </div>

            {/* Category Tabs Bar */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap pb-1 border-b border-[#E5FBB8]/30">
              {/* All Tab */}
              <button
                id="cat-tab-all"
                onClick={() => handleSelectCategory('all')}
                className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-silkscreen uppercase tracking-wider rounded-[2px] transition-all cursor-pointer outline-none border ${
                  selectedCategory === 'all'
                    ? 'bg-[#E5FBB8] text-black border-[#E5FBB8] shadow-[1.5px_1.5px_0px_rgba(255,255,255,0.3)] font-bold'
                    : 'bg-black text-[#E5FBB8]/80 border-[#E5FBB8]/40 hover:border-[#E5FBB8] hover:text-[#E5FBB8]'
                }`}
              >
                {t.pricing.allCategories} ({PRICING_SERVICES.length})
              </button>

              {/* Individual Category Tabs */}
              {PRICING_CATEGORIES.map((cat) => {
                const count = PRICING_SERVICES.filter((s) => s.category === cat.id).length;
                const isCatActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`cat-tab-${cat.id}`}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-silkscreen uppercase tracking-wider rounded-[2px] transition-all cursor-pointer outline-none border ${
                      isCatActive
                        ? 'bg-[#E5FBB8] text-black border-[#E5FBB8] shadow-[1.5px_1.5px_0px_rgba(255,255,255,0.3)] font-bold'
                        : 'bg-black text-[#E5FBB8]/80 border-[#E5FBB8]/40 hover:border-[#E5FBB8] hover:text-[#E5FBB8]'
                    }`}
                  >
                    {cat.name[language]} ({count})
                  </button>
                );
              })}
            </div>

            {/* Services List / Cards */}
            <div className="flex flex-col gap-2.5">
              {filteredServices.map((service) => {
                const isSelected = selectedServiceIds.includes(service.id);
                const categoryObj = PRICING_CATEGORIES.find((c) => c.id === service.category);

                return (
                  <div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    className={`w-full p-2.5 sm:p-3.5 border transition-all duration-100 flex flex-col justify-between gap-2 rounded-[2px] ${
                      isSelected
                        ? 'bg-[#E5FBB8]/10 border-[#E5FBB8] shadow-[2px_2px_0px_rgba(229,251,184,0.4)]'
                        : 'bg-black border-[#E5FBB8]/40 hover:border-[#E5FBB8]/80 hover:bg-[#E5FBB8]/[0.03]'
                    }`}
                  >
                    {/* Top Row: Category tag, Code & Price */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-1.5 py-0.5 bg-[#E5FBB8]/15 border border-[#E5FBB8]/40 text-[#E5FBB8] font-mono text-[8px] sm:text-[9px] uppercase rounded-[1px]">
                          {categoryObj?.name[language]}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-mono text-[#E5FBB8]/60">
                          ID: #{service.id}
                        </span>
                      </div>

                      {/* Price in USD */}
                      <div className="flex items-baseline gap-1 shrink-0 text-right">
                        <span className="font-share-tech-mono text-[16px] sm:text-[18px] text-[#E5FBB8] font-bold tracking-tight">
                          ${service.priceUSD.toFixed(2)}
                        </span>
                        <span className="font-silkscreen text-[8.5px] sm:text-[9.5px] text-[#E5FBB8]/70">
                          USD
                        </span>
                      </div>
                    </div>

                    {/* Middle Row: Service Name & Exact Description */}
                    <div className="flex flex-col gap-1 text-left">
                      <h3 className="font-share-tech-mono text-[14px] sm:text-[15.5px] text-[#E5FBB8] font-bold leading-tight">
                        {service.name[language]}
                      </h3>
                      <p className="font-sometype-mono text-[11px] sm:text-[12.5px] text-[#E5FBB8]/85 leading-relaxed">
                        {service.description[language]}
                      </p>
                    </div>

                    {/* Bottom Row: Selection Trigger Button */}
                    <div className="pt-1.5 flex items-center justify-end border-t border-[#E5FBB8]/20">
                      <button
                        id={`btn-toggle-service-${service.id}`}
                        onClick={() => handleToggleService(service.id)}
                        className={`px-3 py-1 text-[9.5px] sm:text-[11px] font-silkscreen uppercase tracking-wider rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer outline-none active:scale-95 ${
                          isSelected
                            ? 'bg-[#E5FBB8] text-black border border-[#E5FBB8] font-bold shadow-[1px_1px_0px_rgba(0,0,0,0.8)]'
                            : 'bg-black text-[#E5FBB8] border border-[#E5FBB8]/80 hover:bg-[#E5FBB8] hover:text-black shadow-[1px_1px_0px_rgba(229,251,184,0.3)]'
                        }`}
                        title={isSelected ? t.pricing.removeBtn : t.pricing.addBtn}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>{t.pricing.addedBtn}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>{t.pricing.addBtn}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: DEDICATED ESTIMATED BUDGET CALCULATOR PANEL
             ======================================================== */}
          <div className="w-full lg:w-[38%] xl:w-[35%] flex flex-col gap-3 lg:sticky lg:top-0">
            
            {/* Calculator Housing Box */}
            <div 
              className="w-full border-2 border-[#E5FBB8] bg-black p-3 sm:p-4 flex flex-col gap-3 shadow-[3px_3px_0px_rgba(229,251,184,0.35)] rounded-[2px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#E5FBB8]/40 pb-2">
                <div className="flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-[#E5FBB8]" />
                  <span className="font-silkscreen text-[11px] sm:text-[12px] text-[#E5FBB8] tracking-wider uppercase font-bold">
                    {t.pricing.budgetSidebarTitle}
                  </span>
                </div>

                {selectedServices.length > 0 && (
                  <button
                    id="btn-clear-budget"
                    onClick={handleClearAll}
                    className="text-[8.5px] font-mono text-[#E5FBB8]/70 hover:text-[#FE9898] hover:underline cursor-pointer flex items-center gap-1"
                    title={t.pricing.clearAllBtn}
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>{t.pricing.clearAllBtn}</span>
                  </button>
                )}
              </div>

              {/* Selected Services Breakdown List */}
              <div className="flex flex-col gap-1.5 border border-[#E5FBB8]/30 p-2 bg-[#E5FBB8]/[0.02] rounded-[2px] max-h-[220px] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#E5FBB8]/70 border-b border-[#E5FBB8]/20 pb-1">
                  <span>{t.pricing.selectedServices} ({selectedServices.length})</span>
                  <span>{language === 'es' ? 'PRECIO' : 'PRICE'}</span>
                </div>

                {selectedServices.length === 0 ? (
                  <div className="py-4 text-center text-[10px] font-sometype-mono text-[#E5FBB8]/60 leading-relaxed italic">
                    {t.pricing.noServicesSelected}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5 pt-1">
                    {selectedServices.map((service, i) => (
                      <div
                        key={service.id}
                        className="flex items-start justify-between gap-1.5 text-[10.5px] font-share-tech-mono border-b border-[#E5FBB8]/10 pb-1"
                      >
                        <div className="flex items-start gap-1 min-w-0 pr-1">
                          <span className="text-[#E5FBB8]/50 text-[9px] shrink-0">{i + 1}.</span>
                          <span className="text-[#E5FBB8] truncate leading-tight" title={service.name[language]}>
                            {service.name[language]}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[#E5FBB8] font-bold">
                            ${service.priceUSD.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveService(service.id)}
                            className="text-[#E5FBB8]/50 hover:text-[#FE9898] p-0.5 cursor-pointer outline-none"
                            title="Eliminar ítem"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Real-time Total Display Box */}
              <div className="p-2.5 sm:p-3 bg-[#E5FBB8] text-black rounded-[2px] border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] flex flex-col justify-between gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-silkscreen text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
                    {t.pricing.estimatedTotal}:
                  </span>
                  <span className="font-silkscreen text-[8px] uppercase px-1.5 py-0.2 bg-black text-[#E5FBB8] rounded-[1px]">
                    LIVE
                  </span>
                </div>

                {/* Big USD Display */}
                <div className="font-share-tech-mono text-[24px] sm:text-[28px] font-black leading-tight tracking-tight">
                  ${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[14px]">USD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                {/* Copy Summary Button */}
                <button
                  id="btn-copy-budget-summary"
                  onClick={handleCopySummary}
                  disabled={selectedServices.length === 0}
                  className={`w-full py-2 px-3 text-[10px] sm:text-[11px] font-silkscreen uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer outline-none border active:scale-95 shadow-[1.5px_1.5px_0px_rgba(229,251,184,0.3)] ${
                    copied
                      ? 'bg-[#B980F0] text-black border-[#B980F0] font-bold'
                      : selectedServices.length === 0
                      ? 'bg-black/50 text-[#E5FBB8]/40 border-[#E5FBB8]/30 cursor-not-allowed'
                      : 'bg-black text-[#E5FBB8] border-[#E5FBB8] hover:bg-[#E5FBB8] hover:text-black'
                  }`}
                  title={t.pricing.copySummaryBtn}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{t.pricing.copiedSummaryBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.pricing.copySummaryBtn}</span>
                    </>
                  )}
                </button>

                {/* Work With Me / Let's Work Together Email Button */}
                <button
                  id="btn-work-with-me-budget"
                  onClick={handleWorkWithMeContact}
                  disabled={selectedServices.length === 0}
                  className={`w-full py-2 px-3 text-[10px] sm:text-[11px] font-silkscreen uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer outline-none border active:scale-95 shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.8)] ${
                    selectedServices.length === 0
                      ? 'bg-black/50 text-[#E5FBB8]/40 border-[#E5FBB8]/30 cursor-not-allowed'
                      : 'bg-[#4ef985] text-black border-black font-bold hover:bg-[#39ff14] shadow-[0_0_8px_rgba(78,249,133,0.5)]'
                  }`}
                  title={t.pricing.workWithMeBtn}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t.pricing.workWithMeBtn}</span>
                </button>
              </div>
            </div>

            {/* Quick Navigation / Back Button */}
            {onNavigateWorks && (
              <button
                id="btn-pricing-see-works"
                onClick={onNavigateWorks}
                className="w-full py-1.5 px-3 border border-[#E5FBB8]/50 text-[#E5FBB8]/90 hover:text-[#E5FBB8] hover:border-[#E5FBB8] hover:bg-[#E5FBB8]/10 text-[9px] sm:text-[10px] font-silkscreen uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer outline-none"
              >
                <span>{language === 'es' ? '← VER ARCHIVO DE PROYECTOS' : '← EXPLORE WORKS ARCHIVE'}</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
