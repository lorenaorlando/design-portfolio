export type PowerState = 'on' | 'off' | 'warming';
export type CrtScreenMode = 'clean' | 'scanlines' | 'amber' | 'phosphor';
export type ActiveTab = 'product' | 'visual' | 'about';
export type ViewMode = 'desktop' | 'focus' | 'cinema';

export interface MonitorSettings {
  power: PowerState;
  crtMode: CrtScreenMode;
  audioMuted: boolean;
  tilt: number; // degrees -8 to +8
  brightness: number; // 20 to 120
  contrast: number; // 50 to 150
  viewMode: ViewMode;
  activeTab: ActiveTab;
}
