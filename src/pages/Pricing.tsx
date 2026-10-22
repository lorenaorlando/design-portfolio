import { useState } from 'react';
import { Window } from '../components/Window';
import { EMAIL } from '../content/copy';
import { formatCurrency, PRICING_CATEGORIES, PRICING_SERVICES, ServiceCategory } from '../data/pricingData';
import { copyText } from '../lib/clipboard';
import { useLang } from '../lib/i18n';

type Currency = 'USD' | 'COP' | 'CLP';

export function Pricing({ onToast }: { onToast: (message: string) => void }) {
  const { t, lang } = useLang();
  const p = t.pricing;
  const [category, setCategory] = useState<ServiceCategory['id'] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>('USD');

  const shown = category ? PRICING_SERVICES.filter((s) => s.category === category) : PRICING_SERVICES;
  const picked = PRICING_SERVICES.filter((s) => selected.includes(s.id));
  const total = picked.reduce((sum, s) => sum + s.priceUSD, 0);

  const toggle = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const summary = () =>
    [
      `${p.title} — Lorena Orlando`,
      ...picked.map((s) => `• ${s.name[lang]}: ${formatCurrency(s.priceUSD, currency)}`),
      `${p.total}: ${formatCurrency(total, currency)}`,
    ].join('\n');

  const copy = async () => {
    if (await copyText(summary())) onToast(p.copied);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">{p.kicker}</div>
          <h1 className="display page-title">{p.title}</h1>
          <p style={{ fontSize: 18, color: '#555', marginTop: 14 }}>{p.subtitle}</p>
        </div>
      </div>

      <div className="filters" style={{ marginBottom: 24 }}>
        <button className={`chip ${category === null ? 'active' : ''}`} onClick={() => setCategory(null)}>
          {p.all}
        </button>
        {PRICING_CATEGORIES.map((c) => (
          <button key={c.id} className={`chip ${category === c.id ? 'active' : ''}`} onClick={() => setCategory(c.id)}>
            {c.name[lang]}
          </button>
        ))}
      </div>

      <div className="pricing">
        <div className="services">
          {shown.map((s) => {
            const on = selected.includes(s.id);
            return (
              <div key={s.id} className={`service ${on ? 'on' : ''}`}>
                <div className="name">{s.name[lang]}</div>
                <div className="desc">{s.description[lang]}</div>
                <div className="foot">
                  <span className="price">{formatCurrency(s.priceUSD, currency)}</span>
                  <button className={`chip small ${on ? 'active' : ''}`} onClick={() => toggle(s.id)}>
                    {on ? `✓ ${p.added}` : `+ ${p.add}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="budget">
          <Window title={p.budget}>
            <div className="seg" role="group" aria-label="Currency">
              {(['USD', 'COP', 'CLP'] as Currency[]).map((c) => (
                <button key={c} className={currency === c ? 'on' : ''} onClick={() => setCurrency(c)}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              {picked.length === 0 && <p style={{ fontSize: 14, color: '#888', lineHeight: 1.5 }}>{p.empty}</p>}
              {picked.map((s) => (
                <div className="budget-line" key={s.id}>
                  <span>{s.name[lang]}</span>
                  <span style={{ display: 'flex', gap: 8, whiteSpace: 'nowrap' }}>
                    <span className="mono">{formatCurrency(s.priceUSD, currency)}</span>
                    <button onClick={() => toggle(s.id)} aria-label="Remove">
                      ×
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <div className="mono caps muted" style={{ fontSize: 10.5, marginTop: 18 }}>
              {p.total}
            </div>
            <div className="budget-total">{formatCurrency(total, currency)}</div>
            <div className="btn-row">
              <a
                className="chip solid"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(p.mailSubject)}&body=${encodeURIComponent(summary())}`}
              >
                {p.send}
              </a>
              <button className="chip" onClick={copy} disabled={!picked.length}>
                {p.copy}
              </button>
              {picked.length > 0 && (
                <button className="chip" onClick={() => setSelected([])}>
                  {p.clear}
                </button>
              )}
            </div>
            <p style={{ fontSize: 11.5, color: '#999', marginTop: 16, lineHeight: 1.5 }}>{p.notice}</p>
          </Window>
        </div>
      </div>
    </div>
  );
}
