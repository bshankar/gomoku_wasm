function getGridHtml (m, n) {
  let gridHtml = '<table align="center">'
  for (let i = 0; i < m; ++i) {
    gridHtml += '<tr>'
    for (let j = 0; j < n; ++j) {
      gridHtml += '<td class="empty" id="' + (i * n + j) + '"></td>'
    }
    gridHtml += '</tr>'
  }
  return gridHtml + '</table>' +
    '<h3 class="eval" id="evaluation" align="center">Game started</h3>'
}

document.getElementById('grid').innerHTML = getGridHtml(19, 19)

Module.addOnPostRun(() => {
  const board = new Module.Board()
  const search = new Module.Search(board)

  const mark = (player, cell) => { document.getElementById(cell).className = 'p' + player }
  
})
