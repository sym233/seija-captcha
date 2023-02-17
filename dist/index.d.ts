import '../style/index.less';
declare const supportedLanguages: readonly ["en", "zh"];
type Language = typeof supportedLanguages[number];
interface Option {
    language: Language;
    /** number in degree to allow Seija different from the vertical */
    diff: number;
    /** allow Seija head up */
    allowUp: boolean;
    /** allow Seija head down */
    allowDown: boolean;
}
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
declare function seijaCaptcha(afterRotateCb?: SeijaCallback, option?: Partial<Option>): () => void;
export default seijaCaptcha;
