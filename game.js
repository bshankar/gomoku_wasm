
Module.addOnPostRun(() => {
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

  const $ = id => document.getElementById(id)
  $('grid').innerHTML = getGridHtml(19, 19)

  let playerTurn = false
  let currentPlayer = 0
  let search = null
  const depth = 7

  function startGame () {
    search = new Module.Search()
    playerTurn = $('playWhiteCheckbox').checked
    for (let i = 0; i < 361; ++i) $('' + i).className = 'empty'
    if (playerTurn === false) makeBestMove()
  }

  function placeBead (cell) {
    search.place(currentPlayer, cell)
    $(cell).className = 'p' + currentPlayer
    togglePlayer()
  }

  const displayStatus = msg => { $('evalHeader').innerHTML = msg }
  const getAnalysisMsg = bestMoveInfo => 'Eval: ' + bestMoveInfo.eval +
        '  depth: ' + depth + ' nodes: ' + bestMoveInfo.nodes

  function makeBestMove () {
    if (search.winner() === -1) {
      const bestMoveInfo = search.calcBestMove(depth, currentPlayer)
      displayStatus(getAnalysisMsg(bestMoveInfo))
      placeBead(bestMoveInfo.bestMove)
    }
  }

  function togglePlayer () {
    playerTurn ^= true
    currentPlayer ^= 1
  }

  function readPlayerMove (cell) {
    if (search.winner() === -1) {
      placeBead(cell)
      makeBestMove()
    }
  }

  $('newGameButton').addEventListener('click', startGame)
  for (let i = 0; i < 361; ++i) $('' + i).addEventListener('click', () => readPlayerMove(i))
})
