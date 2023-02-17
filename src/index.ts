import { append, h, remove } from './renderer';

import '../style/index.less';

import seijaSrc from '../static/seija.png';

const supportedLanguages = ['en', 'zh'] as const;
type Language = typeof supportedLanguages[number];
type Text = Record<
  Language,
  {
    [key in 'title' | 'description' | 'succ' | 'close']: string;
  }
>;

const text: Text = {
  en: {
    title: 'Kijin Seija Captcha',
    description:
      'Please move the following slider to rotate Kijin Seija in proper angle',
    succ: 'Validated',
    close: 'Close',
  },
  zh: {
    title: '鬼人正邪验证码',
    description: '请拖动下方滑块，使鬼人正邪的角度正确',
    succ: '验证成功',
    close: '关闭',
  },
};

interface Option {
  language: Language;
  /** number in degree to allow Seija different from the vertical */
  diff: number;
  /** allow Seija head up */
  allowUp: boolean;
  /** allow Seija head down */
  allowDown: boolean;
}
const defaultOption: Option = {
  language:
    supportedLanguages.find(
      v => v === window.navigator.language.split('-')[0]
    ) ?? 'en',
  diff: 20,
  allowUp: true,
  allowDown: true,
};

/**
 * @param result validation is passed
 * @param degs slider continuous movements
 */
type SeijaCallback = (result: boolean, degs: number[][]) => void;

/**
 *
 * @param afterRotateCb
 * @param option
 * @returns closeWindow
 */
function seijaCaptcha(afterRotateCb?: SeijaCallback, option?: Partial<Option>) {
  const { language, diff, allowUp, allowDown } = {
    ...defaultOption,
    ...option,
  };
  const initDegInput = 270;
  const initDeg = Math.floor(Math.random() * 360);

  const degs: number[][] = [];
  let currentDeg: number[] = [];

  let seijaImg = h('img', {
    id: 'seija',
    alt: 'Kijin Seija',
    src: seijaSrc,
    draggable: false,
  }) as HTMLImageElement;
  seijaImg.style.transform = `rotate(${initDeg + initDegInput}deg)`;

  function degChange(ev: InputEvent) {
    const deg =
      Number.parseInt((ev.target as HTMLInputElement).value) + initDeg;
    currentDeg.push(deg);
    seijaImg.style.transform = `rotate(${deg}deg)`;
  }
  function afterRotate(ev: InputEvent) {
    degs.push(currentDeg);
    currentDeg = [];
    const deg =
      (Number.parseInt((ev.target as HTMLInputElement).value) + initDeg) % 360;
    const up = allowUp && (deg <= diff || 360 - diff <= deg);
    const down = allowDown && 180 - diff <= deg && deg <= 180 + diff;
    const succ = up || down;
    afterRotateCb?.(succ, degs);
  }

  const containerRef = { current: null as Node | null };

  function closeWindow() {
    if (containerRef.current) {
      remove(containerRef.current as HTMLLIElement);
    }
  }

  containerRef.current = h(
    'div',
    {
      id: 'seija-captcha-root-container',
      onClick: ev => {
        if (ev.target === ev.currentTarget) {
          closeWindow();
        }
      },
    },
    h(
      'div',
      {
        className: 'container',
      },
      h('h3', {}, text[language].title),
      h(
        'div',
        {
          className: 'image-container',
        },
        seijaImg
      ),
      h('p', {}, text[language].description),
      h('input', {
        className: 'deg-input',
        type: 'range',
        min: '0',
        max: `${initDegInput * 2}`,
        defaultValue: `${initDegInput}`,
        onInput: degChange,
        onChange: afterRotate,
      }),
      h(
        'button',
        { type: 'button', onClick: closeWindow },
        text[language].close
      )
    )
  );

  append(document.body, containerRef.current);

  return closeWindow;
}

export default seijaCaptcha;
