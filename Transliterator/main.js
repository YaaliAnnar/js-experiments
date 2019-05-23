(window => {
  const document = window.document;

  const insertTab = (element, event) => {
    if (event.keyCode == 9 || event.which == 9) {
      event.preventDefault();
      var s = element.selectionStart;
      element.value =
        element.value.substring(0, element.selectionStart) +
        "\t" +
        element.value.substring(element.selectionEnd);
      element.selectionEnd = s + 1;
    }
  };

  const transliterate = () => {
    const lines = document
      .getElementById("rules")
      .value.split(/([\r\n]+)/)
      .map(line => line.trim());

    const variables = [];
    const rules = [];

    lines.forEach(line => {
      if (line.match("=") && !line.match(/\t/)) {
        let [name, value] = line.split("=");
        name = new RegExp(`<${name}>`, "g");
        variables.push({ name, value });
      }
      if (line.match(/\t/)) {
        let [from, to] = line.split(/\t/);
        from = variables.reduce((accumulator, variable) => {
          return accumulator.replace(variable.name, variable.value);
        }, from);
        from = new RegExp(from, "g");
        rules.push({ from, to });
      }
    });

    const emptyCharacter = document.getElementById("empty-character").value;

    rules.push({
      from: new RegExp(emptyCharacter, "g"),
      to: ""
    });

    const input = document.getElementById("input").value.split(/[\r\n]+/);

    let output = input.map(line => {
      return rules.reduce((accumulator, rule) => {
        return accumulator.replace(rule.from, rule.to);
      }, line);
    });

    document.getElementById("output").value = output.join("\n");
  };

  const textAreas = Array.prototype.slice.call(
    document.getElementsByTagName("textarea")
  );
  textAreas.forEach(textArea => {
    textArea.onkeydown = event => insertTab(textArea, event);
  });

  document.getElementById("button-transliterate").onclick = transliterate;
})(window);
