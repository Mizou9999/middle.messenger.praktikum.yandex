import * as Handlebars from "handlebars";

export const compileTemplate = (template: string, data: any): string => {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(data);
};
