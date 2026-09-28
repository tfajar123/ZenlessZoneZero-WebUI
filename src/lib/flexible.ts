export type DeviceType = 'pc' | 'mobile';

export type ScaleConfig = {
  designWidth: number;
  baseFontSize: number;
  minScaleWidth: number;
  maxFillWidth: number;
};

export type FlexibleOptions = {
  recalculateOnResize?: boolean;
  reloadOnDeviceChange?: boolean;
};

export const SCALE: Record<DeviceType, ScaleConfig> = {
  /**
   * designWidth HARUS sama dengan DESIGN.width di src/lib/measure.ts (1920) dan
   * lebar `@utility canvas` di index.css (120rem = 1920 / 16).
   *
   * root = 16 x clamp(lebarLayar, 1280, 1920) / 1920, jadi:
   *   1280px -> 10.67px | 1440px -> 12px | 1920px -> 16px | 2560px -> 16px
   * Di rentang 1280-1920 lebar kanvas (120rem) selalu = lebar layar, sehingga
   * halaman mengisi layar pas; di luar rentang itu kanvas "diam" (muncul scroll
   * horisontal) alih-alih membuat komponen tumpang tindih.
   */
  pc: {
    designWidth: 1920,
    baseFontSize: 16,
    minScaleWidth: 1280,
    maxFillWidth: 1920,
  },
  mobile: {
    designWidth: 375,
    baseFontSize: 16,
    minScaleWidth: 320,
    maxFillWidth: 430,
  },
};

const MOBILE_UA =
  /(phone|pad|pod|iPhone|iPod|ios|iPad|iPadOs|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;

export const getDeviceType = (): DeviceType => {
  const isTouchMac =
    navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return MOBILE_UA.test(navigator.userAgent) || isTouchMac ? 'mobile' : 'pc';
};

export const getRootFontSize = (
  viewportWidth: number,
  deviceType: DeviceType,
): number => {
  const { designWidth, baseFontSize, minScaleWidth, maxFillWidth } =
    SCALE[deviceType];
  const width = Math.min(Math.max(viewportWidth, minScaleWidth), maxFillWidth);
  return (baseFontSize * width) / designWidth;
};

const applyScale = (deviceType: DeviceType): void => {
  const root = document.documentElement;
  root.classList.toggle('mobile', deviceType === 'mobile');
  root.classList.toggle('pc', deviceType === 'pc');
  root.style.fontSize = `${getRootFontSize(root.clientWidth, deviceType)}px`;
};

export const initFlexible = (options: FlexibleOptions = {}): (() => void) => {
  const { recalculateOnResize = false, reloadOnDeviceChange = true } = options;
  const deviceType = getDeviceType();

  applyScale(deviceType);

  const handleResize = (): void => {
    if (reloadOnDeviceChange && getDeviceType() !== deviceType) {
      window.location.reload();
      return;
    }
    if (recalculateOnResize) applyScale(deviceType);
  };

  const handlePageShow = (event: PageTransitionEvent): void => {
    if (event.persisted) applyScale(deviceType);
  };

  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
  window.addEventListener('pageshow', handlePageShow);

  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
    window.removeEventListener('pageshow', handlePageShow);
  };
};
