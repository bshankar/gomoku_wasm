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
    '<h3 class="eval" id="evalHeader" align="center">Game started</h3>'
}

document.getElementById('grid').innerHTML = getGridHtml(19, 19)

Module.addOnPostRun(() => {

  const $ = document.getElementById

  function clearGame () {
    const board = new Module.Board()
    const search = new Module.Search(board)
    for (let i = 0; i < 361; ++i) $(i).className = 'empty'
  }
  
  function placeBead (player, cell) {
    board.place(player, cell)
    $(cell).className = 'p' + player
  }

  function displayAnalysis (bestMoveInfo) {
    const analysis = 'Eval: ' + bestMoveInfo.eval + ' ' + bestMoveInfo.nodes + ' nodes visited'
    $(bestMoveInfo.bestMove)[0].innerHTML = analysis
  }

  function makeBestMove (player, depth = 6) {
    const bestMoveInfo = search.calcBestMove(depth, player)
    displayAnalysis(bestMoveInfo)
    placeBead(player, bestMoveInfo.bestMove)
  }

  let playerTurn = $('playWhiteCheckbox').checked
  
})
