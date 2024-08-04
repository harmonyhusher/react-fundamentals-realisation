class Element {
  constructor(tagName, attributes = {}, children = []) {
    this.tagName = tagName;
    this.attributes = attributes || {};
    this.children = children;
  }

  _mapAttributes() {
    // Если нет атрибутов, возвращаем пустую строку
    if (!this.attributes || Object.keys(this.attributes).length === 0) {
      return "";
    }

    const attributesString = Object.entries(this.attributes)
      .map(([attrName, value]) => {
        return `${attrName}="${value}"`;
      })
      .join(" ");

    return attributesString;
  }

  render() {
    const attributes = this._mapAttributes();
    const tag = this.tagName;

    const renderedChildren = this.children
      .map((child) => (child instanceof Element ? child.render() : child))
      .join("");

    const selfClosingTags = ["img", "input", "br", "hr", "meta", "link"];
    if (selfClosingTags.includes(tag)) {
      return `<${tag} ${attributes ? attributes : ""} />`;
    }

    return `<${tag} ${
      attributes ? attributes : ""
    }>${renderedChildren}</${tag}>`;
  }
}

function createElement(tag, props = {}, ...children) {
  return new Element(tag, props, children);
}

// Usage example
const element = createElement(
  "div",
  { id: "main", class: "container" },
  createElement("h1", { style: "color: red;" }, "Hello, World!"),
  createElement("p", null, "This is a paragraph.")
);

const root = document.getElementById("app");

root.innerHTML = element.render();
// <div id="main" class="container"><h1 style="color: red;">Hello, World!</h1><p>This is a paragraph.</p></div>
