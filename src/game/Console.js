require('./Console.css');

class Console {
  constructor(element) {
    this.element = element;
  }

  log(message) {
    this.element.innerHTML += `
      <div class="asi-console__message">
        ${
          Array.isArray(message)
            ? message.reduce((m, t) => `${m}${JSON.stringify(t)} `, '')
            : message
        }
      </div>
    `;

    window.requestAnimationFrame(() => {
      this.element.lastElementChild.scrollIntoView();
    });
  }

  clear() {
    this.element.innerHTML = '';
  }
}

module.exports = Console;
