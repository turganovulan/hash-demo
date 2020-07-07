class Block {
  constructor(id, data, prevHash) {
    this.id = id;
    this.data = Object.assign({}, data);
    this.copy = Object.assign({}, data);
    this.prevHash = prevHash;
    this.hash = this.getHash();
    
    $(this.id).find('.p-input').on('keyup change keydown', e => {
      this.copy.text = e.target.value;
      this.draw()
      this.validate()
    })
  }

  draw () {
    $(this.id).find('.p-text').text(this.data.text)
    $(this.id).find('.p-hash').text(this.hash)
    $(this.id).find('.p-input').val(this.copy.text)
    $(this.id).find('.p-copy-text').text(this.copy.text)
    $(this.id).find('.p-copy-hash').text(this.getHash())
  }

  setValidity(validity) {
    $(this.id).find('.p-copy').toggleClass('border-danger', !validity)
    $(this.id).find('.p-copy').toggleClass('border-success ', validity)
    $(this.id).find('.p-copy .card-footer').toggleClass('bg-danger', !validity)
    $(this.id).find('.p-copy .card-footer').toggleClass('bg-success ', validity)
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

  addBlock(id, data) {
    const prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
    const block = new Block(id, data, prevHash);
    block.validate = this.validate.bind(this);
    block.draw()
    this.chain.push(block);
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

  BChain.addBlock('#block1', { text: 'Text1' })
  BChain.addBlock('#block2', { text: 'Text2' })
  BChain.addBlock('#block3', { text: 'Text3' })
  BChain.validate()
});