var protocol1 = {
  text: 'P1 text'
}
var protocol1edit = {
  text: 'P1 text'
}

var protocol2 = {
  text: 'P2 text'
}
var protocol2edit = {
  text: 'text'
}
var tmp_hash

function updateHash(id, protocol, edit, hash) {
  const result = Object.assign({ hash: hash }, protocol, edit)
  const result_hash = objectHash(result)

  $(id + ' .p-text').text(result.text)
  $(id + ' .p-hash').text(result_hash)

  const protocol_hash = objectHash(protocol)
  const edit_hash = objectHash(Object.assign({}, protocol, edit))
  $(id).toggleClass('border-danger', protocol_hash !== edit_hash)
  $(id).toggleClass('border-success ', protocol_hash === edit_hash)
  $(id + ' .card-footer').toggleClass('bg-danger', protocol_hash !== edit_hash)
  $(id + ' .card-footer').toggleClass('bg-success ', protocol_hash === edit_hash)

  return result_hash
}

function update() {
  const hash1 = objectHash(protocol1)
  const hash2 = objectHash(protocol2)

  $('#p-1-text').text(protocol1.text)
  $('#p-1e-input').val(protocol1edit.text)
  $('#p-2-text').text(protocol2.text)
  $('#p-2e-input').val(protocol2edit.text)

  tmp_hash = updateHash('#p-1r1', protocol1, protocol1edit)
  tmp_hash = updateHash('#p-1r2', protocol1, protocol1edit, tmp_hash)
  tmp_hash = updateHash('#p-1r3', protocol1, protocol1edit, tmp_hash)
  tmp_hash = updateHash('#p-2r1', protocol2, protocol2edit)
  tmp_hash = updateHash('#p-2r2', protocol2, protocol2edit, tmp_hash)
  tmp_hash = updateHash('#p-2r3', protocol2, protocol2edit, tmp_hash)
  
  $('#p-1-hash').text(hash1)
  $('#p-2-hash').text(hash2)
}

$(document).ready(function () {
  $('#p-1e-input').on('keyup change keydown', e => {
    protocol1edit.text = e.target.value;
    update()
  })
  $('#p-2e-input').on('keyup change keydown', e => {
    protocol2edit.text = e.target.value;
    update()
  })

  update()
});