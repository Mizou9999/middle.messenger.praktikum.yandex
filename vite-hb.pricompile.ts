import Handlebars from "handlebars";
import { PluginOption } from "vite";

export default function handlebars(): PluginOption {
  const fileRegexp = /\.hbs$|\.handlebars$/;
  console.log("iokok");
  return {
    name: "vite-plugin-handlebars",
    transform(src, id) {
      if (!fileRegexp.test(id)) {
        return;
      }
      const code = `
            import Handlebars from 'handlebars/runtime';
            export default Handlebars.template(${Handlebars.precompile(src)});
            `;
      return { code };
    },
  };
}
