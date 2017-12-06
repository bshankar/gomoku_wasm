function getGridHtml (m, n) {
  let gridHtml = '<table align="center">'
  for (let i = 0; i < m; ++i) {
    gridHtml += '<tr>'
    for (let j = 0; j < n; ++j) {
      gridHtml += '<td id="' + (i * n + j) + '">' + '<div class="empty"><div/>' + '</td>'
    }
    gridHtml += '</tr>'
  }
  return gridHtml + '</table>'
}

document.getElementById('grid').innerHTML = getGridHtml(19, 19)

Module.addOnPostRun(() => {
  const board = new Module.Board()
  const search = new Module.Search(board)
  console.log(search.calcBestMove(4, 0))
  console.log(board.place(0, 0))
})
