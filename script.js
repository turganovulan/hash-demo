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


function update() {
  const protocol1result = Object.assign({}, protocol1, protocol1edit)
  const protocol2result = Object.assign({}, protocol2, protocol2edit)

  $('#p-1-text').text(protocol1.text)
  $('#p-1e-input').val(protocol1edit.text)
  $('#p-1r-text').text(protocol1result.text)
  $('#p-2-text').text(protocol2.text)
  $('#p-2e-input').val(protocol2edit.text)
  $('#p-2r-text').text(protocol2result.text)

  const hash1 = objectHash(protocol1)
  const hash1result = objectHash(protocol1result)
  const hash2 = objectHash(protocol2)
  const hash2result = objectHash(protocol2result)
  
  $('#p-1-hash').text(hash1)
  $('#p-1r-hash').text(hash1result)
  $('#p-2-hash').text(hash2)
  $('#p-2r-hash').text(hash2result)

  $('#p-1r').toggleClass('border-danger', hash1 !== hash1result)
  $('#p-1r').toggleClass('border-success ', hash1 === hash1result)
  $('#p-1r .card-footer').toggleClass('bg-danger', hash1 !== hash1result)
  $('#p-1r .card-footer').toggleClass('bg-success ', hash1 === hash1result)
  $('#p-2r').toggleClass('border-danger', hash2 !== hash2result)
  $('#p-2r').toggleClass('border-success ', hash2 === hash2result)
  $('#p-2r .card-footer').toggleClass('bg-danger', hash2 !== hash2result)
  $('#p-2r .card-footer').toggleClass('bg-success ', hash2 === hash2result)
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