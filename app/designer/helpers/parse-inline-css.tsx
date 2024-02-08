export function parseInlineCss(values: string) {
  if (!values) return;

  const styles: { [key: string]: any } = {};
  const lines = values.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const element = lines[i];

    if (element) {
      const [property, value] = element.split(":");

      if (property && value) {
        const propertyCamelCase = property.replace(
          /-([a-z])/g,
          (_, letter: string) => letter.toUpperCase()
        );
        styles[propertyCamelCase] = value.replace(";", "");
      }
    }
  }

  return styles;
}
