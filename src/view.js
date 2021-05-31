// methods for putting data into templates
import { templates } from './templates'

function templateStr(str) {
  console.log("str in func", str);
  return str.replace('/\'/g', '/`/');
};

export const view = {
  render(template, modelArr) {
    if (modelArr === undefined) {
      return template;
    }
    const htmlArr = modelArr.map((obj) => {
      let htmlTemplates = templates.scores;
      Object.keys(obj).forEach((el) => {
        const find = `{${el}}`;
        htmlTemplates = htmlTemplates.replace(find, obj[el]);
      });
      return htmlTemplates;
    });
    return htmlArr.join('');
  }
};