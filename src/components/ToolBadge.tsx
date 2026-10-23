import { TOOLS_INFO, ToolId } from '../data/tools';
import { useLang } from '../lib/i18n';

export function ToolBadge({ id }: { id: ToolId }) {
  const { lang } = useLang();
  const tool = TOOLS_INFO[id];
  return (
    <span className="tool">
      <span className={`tool-mark ${tool.bleed ? 'bleed' : ''}`} style={{ background: tool.path || tool.logo ? '#fff' : tool.color }}>
        {tool.logo ? (
          <img src={tool.logo} alt="" />
        ) : tool.path ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={tool.path} fill={tool.color} />
          </svg>
        ) : (
          <span className="tool-mono" style={tool.monoColor ? { color: tool.monoColor } : undefined}>
            {tool.mono}
          </span>
        )}
      </span>
      {tool.name[lang]}
    </span>
  );
}
