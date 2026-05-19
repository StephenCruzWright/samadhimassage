// Tweaks app — palette / font / motion swaps for Samādhi.

const PALETTES = {
  sage: {
    label: 'Sage',
    swatch: ['#F4F1E8', '#E8EEE2', '#1E241B'],
    vars: {
      '--bg': '#F4F1E8',
      '--bg-mist': '#E8EEE2',
      '--bg-deep': '#DCE4D4',
      '--ink': '#1E241B',
      '--ink-soft': '#3A4135',
      '--muted': '#6E7868',
      '--rule': 'rgba(30, 36, 27, 0.14)',
      '--green': 'oklch(0.45 0.045 145)',
      '--green-deep': 'oklch(0.32 0.05 145)',
    },
  },
  eucalyptus: {
    label: 'Eucalyptus',
    swatch: ['#EEF1EB', '#D9E1D2', '#1F2A24'],
    vars: {
      '--bg': '#EEF1EB',
      '--bg-mist': '#DDE4D6',
      '--bg-deep': '#CDD7C5',
      '--ink': '#1F2A24',
      '--ink-soft': '#384238',
      '--muted': '#6F7A6D',
      '--rule': 'rgba(31, 42, 36, 0.14)',
      '--green': 'oklch(0.50 0.05 155)',
      '--green-deep': 'oklch(0.34 0.06 160)',
    },
  },
  moss: {
    label: 'Moss',
    swatch: ['#F3EFE2', '#CFD7C0', '#1A1F16'],
    vars: {
      '--bg': '#F3EFE2',
      '--bg-mist': '#E0E6D2',
      '--bg-deep': '#CFD7C0',
      '--ink': '#1A1F16',
      '--ink-soft': '#363D2E',
      '--muted': '#73786A',
      '--rule': 'rgba(26, 31, 22, 0.14)',
      '--green': 'oklch(0.48 0.06 125)',
      '--green-deep': 'oklch(0.30 0.07 130)',
    },
  },
  mist: {
    label: 'Mist',
    swatch: ['#F6F4EE', '#EAEFE9', '#2A2F2A'],
    vars: {
      '--bg': '#F6F4EE',
      '--bg-mist': '#EAEFE9',
      '--bg-deep': '#DFE6DD',
      '--ink': '#2A2F2A',
      '--ink-soft': '#454B45',
      '--muted': '#828A82',
      '--rule': 'rgba(42, 47, 42, 0.12)',
      '--green': 'oklch(0.55 0.04 150)',
      '--green-deep': 'oklch(0.38 0.05 150)',
    },
  },
};

const FONTS = {
  'Cormorant Garamond': {
    label: 'Cormorant',
    href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap',
    stack: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
  },
  'Tenor Sans': {
    label: 'Tenor',
    href: 'https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap',
    stack: '"Tenor Sans", "Optima", serif',
  },
  'Italiana': {
    label: 'Italiana',
    href: 'https://fonts.googleapis.com/css2?family=Italiana&display=swap',
    stack: '"Italiana", "Bodoni 72", serif',
  },
  'Marcellus': {
    label: 'Marcellus',
    href: 'https://fonts.googleapis.com/css2?family=Marcellus&display=swap',
    stack: '"Marcellus", "Trajan Pro", serif',
  },
};

const HEADLINES = {
  stillness: [
    { line: 'A return to' },
    { line: 'stillness', emphasis: true, after: ',' },
    { line: 'held in body.' },
  ],
  presence: [
    { line: 'The hour your' },
    { line: 'body', emphasis: true, after: '' },
    { line: 'asks you for.' },
  ],
  arrive: [
    { line: 'Arrive carrying.' },
    { line: 'Leave', emphasis: true, after: '' },
    { line: 'a little lighter.' },
  ],
};

function ensureFont(name) {
  if (!FONTS[name]) return;
  const id = 'twk-font-' + name.replace(/\s+/g, '-');
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = FONTS[name].href;
  document.head.appendChild(link);
}

function applyPalette(name) {
  const p = PALETTES[name];
  if (!p) return;
  const root = document.documentElement;
  Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

function applyFont(name) {
  const f = FONTS[name];
  if (!f) return;
  ensureFont(name);
  document.documentElement.style.setProperty('--serif', f.stack);
}

function applyMotion(on) {
  document.documentElement.style.setProperty(
    'scroll-behavior', on ? 'smooth' : 'auto'
  );
  // Pause the cursor-dot & cue animation if motion off
  document.body.classList.toggle('no-motion', !on);
}

function applyGlow(on) {
  const a = document.querySelector('.ambient');
  if (a) a.style.display = on ? '' : 'none';
}

function applyGrain(on) {
  document.body.classList.toggle('no-grain', !on);
}

function applyHeadline(variant) {
  const wrap = document.querySelector('.hero-headline h1');
  if (!wrap) return;
  const rows = HEADLINES[variant];
  if (!rows) return;
  wrap.innerHTML = rows.map((r) => {
    const text = r.emphasis
      ? `<em class="in-line">${r.line}</em>${r.after || ''}`
      : `${r.line}${r.after || ''}`;
    return `<span class="word-row">${text}</span>`;
  }).join('');
}

// One-time CSS injection for motion-off + grain-off
(function injectAuxStyles() {
  const s = document.createElement('style');
  s.textContent = `
    .no-motion *, .no-motion *::before, .no-motion *::after {
      animation: none !important;
      transition-duration: 0.001ms !important;
    }
    .no-motion #breathDot { display: none !important; }
    .no-grain::before { display: none !important; }
  `;
  document.head.appendChild(s);
})();

function applyMandalas(on) {
  document.querySelectorAll('.lotus').forEach((el) => el.classList.toggle('hidden', !on));
}

const MANDALA_SPEEDS = {
  slow:    '240s',
  regular: '120s',
  quick:   '60s',
};
function applyMandalaSpeed(name) {
  const dur = MANDALA_SPEEDS[name] || MANDALA_SPEEDS.slow;
  document.documentElement.style.setProperty('--spin-dur', dur);
}

const TWEAK_DEFAULTS = window.TWEAK_DEFAULTS || {
  palette: 'sage',
  displayFont: 'Cormorant Garamond',
  headline: 'stillness',
  motion: true,
  ambientGlow: true,
  grain: true,
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply on mount + whenever values change
  React.useEffect(() => { applyPalette(t.palette); }, [t.palette]);
  React.useEffect(() => { applyFont(t.displayFont); }, [t.displayFont]);
  React.useEffect(() => { applyHeadline(t.headline); }, [t.headline]);
  React.useEffect(() => { applyMotion(t.motion); }, [t.motion]);
  React.useEffect(() => { applyGlow(t.ambientGlow); }, [t.ambientGlow]);
  React.useEffect(() => { applyGrain(t.grain); }, [t.grain]);
  React.useEffect(() => { applyMandalas(t.mandalas !== false); }, [t.mandalas]);
  React.useEffect(() => { applyMandalaSpeed(t.mandalaSpeed || 'slow'); }, [t.mandalaSpeed]);

  // Build palette swatches for TweakColor
  const paletteOptions = Object.entries(PALETTES).map(([k, p]) => ({
    value: k, swatch: p.swatch, label: p.label,
  }));

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette">
        <TweakRow label="Tone">
          <div className="twk-chips" role="radiogroup">
            {paletteOptions.map((o) => {
              const on = t.palette === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  className="twk-chip"
                  role="radio"
                  aria-checked={on}
                  data-on={on ? '1' : '0'}
                  aria-label={o.label}
                  title={o.label}
                  style={{ background: o.swatch[0] }}
                  onClick={() => setTweak('palette', o.value)}
                >
                  <span>
                    <i style={{ background: o.swatch[1] }} />
                    <i style={{ background: o.swatch[2] }} />
                  </span>
                </button>
              );
            })}
          </div>
        </TweakRow>
      </TweakSection>

      <TweakSection label="Typography">
        <TweakSelect
          label="Display font"
          value={t.displayFont}
          options={Object.keys(FONTS).map((k) => ({ value: k, label: FONTS[k].label }))}
          onChange={(v) => setTweak('displayFont', v)}
        />
      </TweakSection>

      <TweakSection label="Hero">
        <TweakSelect
          label="Headline"
          value={t.headline}
          options={[
            { value: 'stillness', label: 'A return to stillness' },
            { value: 'presence',  label: 'The hour your body asks for' },
            { value: 'arrive',    label: 'Arrive carrying / leave lighter' },
          ]}
          onChange={(v) => setTweak('headline', v)}
        />
      </TweakSection>

      <TweakSection label="Atmosphere">
        <TweakToggle label="Smooth motion"  value={t.motion}      onChange={(v) => setTweak('motion', v)} />
        <TweakToggle label="Ambient glow"   value={t.ambientGlow} onChange={(v) => setTweak('ambientGlow', v)} />
        <TweakToggle label="Paper grain"    value={t.grain}       onChange={(v) => setTweak('grain', v)} />
      </TweakSection>

      <TweakSection label="Lotus motifs">
        <TweakToggle label="Show mandalas"  value={t.mandalas !== false} onChange={(v) => setTweak('mandalas', v)} />
        <TweakRadio
          label="Rotation"
          value={t.mandalaSpeed || 'slow'}
          options={['slow', 'regular', 'quick']}
          onChange={(v) => setTweak('mandalaSpeed', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// Apply initial defaults BEFORE React mounts so first paint is correct.
applyPalette(TWEAK_DEFAULTS.palette);
applyFont(TWEAK_DEFAULTS.displayFont);
applyHeadline(TWEAK_DEFAULTS.headline);
applyMotion(TWEAK_DEFAULTS.motion);
applyGlow(TWEAK_DEFAULTS.ambientGlow);
applyGrain(TWEAK_DEFAULTS.grain);
applyMandalas(TWEAK_DEFAULTS.mandalas !== false);
applyMandalaSpeed(TWEAK_DEFAULTS.mandalaSpeed || 'slow');

const root = document.getElementById('tweaks-root');
if (root) ReactDOM.createRoot(root).render(<App />);
