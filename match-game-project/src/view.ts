// methods for putting data into templates
import { templates } from './templates'

function templateStr(str: string) {
  console.log("str in func", str);
  return str.replace('/\'/g', '/`/');
};

interface View {
  render(template: string, modelArr: Array<unknown>): string;
}
export const view: View = {
  render(template: string, modelArr: Array<Record<string, unknown>>) {
    if (modelArr.length === 0) {
      if (/\{/.test(template)) {
        return '';
      }
      return template;
    }
    interface Obj {
      [key: string]: string;
    }
    const htmlArr = modelArr.map((obj) => {
      let htmlTemplates = templates.scores;
      Object.keys(obj).forEach((el: string) => {
        const find = `{${String(el)}}`;
        htmlTemplates = htmlTemplates.replace(find, (obj as Obj)[el]);
      });
      return htmlTemplates;
    });
    return htmlArr.join('');
  }
};