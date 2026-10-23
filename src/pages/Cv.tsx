import { Download } from 'lucide-react';
import { useState } from 'react';
import { Window } from '../components/Window';
import { TOOLS } from '../content/copy';
import { getCvData } from '../data/cvData';
import { downloadCvPdf } from '../lib/cvPdf';
import { useLang } from '../lib/i18n';

export function Cv() {
  const { t, lang } = useLang();
  const cv = t.cv;
  const [busy, setBusy] = useState(false);

  const download = async () => {
    setBusy(true);
    try {
      await downloadCvPdf(getCvData(lang), t);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="page">
      <div className="kicker">{cv.kicker}</div>
      <h1 className="display page-title" style={{ marginBottom: 40 }}>
        {cv.title}
      </h1>
      <Window title="cv_lorena_orlando.pdf" className="cv-doc">
        <div style={{ padding: 'clamp(4px, 2vw, 24px)' }}>
          <div className="cv-head">
            <div>
              <div className="display" style={{ fontSize: 40 }}>
                Lorena Orlando
              </div>
              <div className="mono muted" style={{ fontSize: 13, marginTop: 8 }}>
                {cv.role}
              </div>
            </div>
            <button className="chip solid" onClick={download} disabled={busy}>
              <Download size={14} /> {busy ? cv.preparing : cv.download}
            </button>
          </div>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--ink-2)', marginTop: 20, maxWidth: 680 }}>{cv.summary}</p>

          <div className="kicker" style={{ margin: '40px 0 12px' }}>
            {cv.experience}
          </div>
          {getCvData(lang).map((item) => (
            <div className="cv-item" key={item.company}>
              <div className="company">{item.company}</div>
              <div>
                {item.positions.map((pos) => (
                  <div className="cv-pos" key={pos.role + pos.period}>
                    <div className="role">{pos.role}</div>
                    <div className="period">{pos.period}</div>
                    {pos.bullets && (
                      <ul>
                        {pos.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="kicker" style={{ margin: '40px 0 14px' }}>
            {cv.tools}
          </div>
          <div className="filters">
            {TOOLS.map((tool) => (
              <span className="chip small" key={tool}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Window>
    </div>
  );
}
