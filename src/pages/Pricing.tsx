import { useState } from 'react';
import { Window } from '../components/Window';
import { EMAIL } from '../content/copy';
import { formatUSD, PRICING_CATEGORIES, PRICING_SERVICES, ServiceCategory } from '../data/pricingData';
import { copyText } from '../lib/clipboard';
import { useLang } from '../lib/i18n';

export function Pricing({ onToast }: { onToast: (message: string) => void }) {
  const { t, lang } = useLang();
  const p = t.pricing;
  const [category, setCategory] = useState<ServiceCategory['id'] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const shown = category ? PRICING_SERVICES.filter((s) => s.category === category) : PRICING_SERVICES;
  const picked = PRICING_SERVICES.filter((s) => selected.includes(s.id));
  const total = picked.reduce((sum, s) => sum + s.priceUSD, 0);

  const toggle = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const summary = () =>
    [
      `${p.title} — Lorena Orlando`,
      ...picked.map((s) => `• ${s.name[lang]}: ${formatUSD(s.priceUSD)}`),
      `${p.total}: ${formatUSD(total)}`,
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
          <p style={{ fontSize: 18, color: 'var(--ink-2)', marginTop: 14 }}>{p.subtitle}</p>
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
                  <span className="price">{formatUSD(s.priceUSD)}</span>
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
            <div>
              {picked.length === 0 && <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>{p.empty}</p>}
              {picked.map((s) => (
                <div className="budget-line" key={s.id}>
                  <span>{s.name[lang]}</span>
                  <span style={{ display: 'flex', gap: 8, whiteSpace: 'nowrap' }}>
                    <span className="mono">{formatUSD(s.priceUSD)}</span>
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
            <div className="budget-total">{formatUSD(total)}</div>
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
          </Window>
        </div>
      </div>
    </div>
  );
}
