function getGridHtml (m, n) {
  let gridHtml = '<table>'
  for (let i = 0; i < m; ++i) {
    gridHtml += '<tr>'
    for (let j = 0; j < n; ++j) {
      gridHtml += '<td style="width: 1.1em" id="' + (i * n + j) + '">' + '.' + '</td>'
    }
    gridHtml += '</tr>'
  }
  return gridHtml + '</table>'
}

document.getElementById('grid').innerHTML = getGridHtml(19, 19)
