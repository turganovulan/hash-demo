class Block {
  names = { answer: 'Ответ: ', user: 'ФИО: ' }

  constructor(index, data, prevHash, validate) {
    this.index = index;
    this.data = Object.assign({}, data);
    this.copy = Object.assign({}, data);
    this.prevHash = prevHash;
    this.hash = this.getHash();
    this.validate = validate;

    this.element = this.template()
    this.draw()
  }

  template() {
    const name = 'Запись ' + this.index;
    const element = $(`<div class="card-deck flex-nowrap mb-4">
        <div class="card bg-light">
          <div class="card-header font-weight-bold">${name}</div>
          <div class="card-body p-data"></div>
          <div class="card-footer text-center text-muted font-weight-bold small p-hash">></div>
        </div>
        <div class="card">
          <div class="card-body my-auto flex-grow-0 p-input"></div>
        </div>
        <div class="card p-copy">
          <div class="card-header">${name}</div>
          <div class="card-body p-copy-data"></div>
          <div class="card-footer text-center text-white font-weight-bold small p-copy-hash"></div>
        </div>
      </div>`, { id: 'block' + this.index })
    $('#main').append(element)

    return element
  }

  draw() {
    Object.keys(this.data).forEach(key => {
      const field = this.element.find('.p-data-' + key)
      const copyField = this.element.find('.p-copy-data-' + key)
      const input = this.element.find('.p-input-' + key)

      if (field.length) {
        field.text(this.data[key])
        copyField.text(this.copy[key])
      } else {
        const item = $('<div>', { class: 'my-2' })
        item.append($('<span>', { class: 'h6' }).text(this.names[key]))
        item.append($('<span>', { class: 'p-data-' + key }).text(this.data[key]))
        this.element.find('.p-data').append(item)
        const copyItem = $('<div>', { class: 'my-2' })
        copyItem.append($('<span>', { class: 'h6' }).text(this.names[key]))
        copyItem.append($('<span>', { class: 'p-copy-data-' + key }).text(this.copy[key]))
        this.element.find('.p-copy-data').append(copyItem)
      }

      if (input.length) {
        input.val(this.copy[key])
      } else {
        const item = $('<div>', { class: 'd-flex align-items-center' })
        const inputEl = $('<input>', { type: 'text', class: 'form-control form-control-sm p-input-' + key }).val(this.copy[key])
        item.append($('<label>', { class: 'h6 col-form-label mr-2' }).text(this.names[key]))
        item.append(inputEl)
        this.element.find('.p-input').append(item)

        inputEl.on('keyup change keydown', e => {
          this.copy[key] = e.target.value;
          this.draw()
          this.validate()
        })
      }
    })

    this.element.find('.p-hash').text(this.hash)
    this.element.find('.p-copy-hash').text(this.getHash())
  }

  setValidity(validity) {
    this.element.find('.p-copy').toggleClass('border-danger', !validity)
    this.element.find('.p-copy').toggleClass('border-success ', validity)
    this.element.find('.p-copy .card-footer').toggleClass('bg-danger', !validity)
    this.element.find('.p-copy .card-footer').toggleClass('bg-success ', validity)
  }

  getHash() {
    var encript = JSON.stringify(this.copy) + this.prevHash;
    return objectHash.MD5(encript);
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
  }

  addBlock(data) {
    const index = this.chain.length + 1;
    const prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
    const block = new Block(index, data, prevHash, this.validate.bind(this));
    this.chain.push(block);
    this.validate()
  }

  validate() {
    let validity = true;
    for (var i = 0; i < this.chain.length; i++) {
      if (this.chain[i].hash !== this.chain[i].getHash()) {
        validity = false
      }
      if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash) {
        validity = false
      }
      this.chain[i].setValidity(validity)
    }
  }
}

$(document).ready(function () {
  const BChain = new BlockChain();

  BChain.addBlock({ user: 'Светлана Анатольевна', answer: 'Да' })
  BChain.addBlock({ user: 'Олег Владимирович', answer: 'Воздержался' })
  BChain.addBlock({ user: 'Виктор Григорьевич', answer: 'Нет' })
});