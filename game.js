Module.addOnPostRun(() => {
  function getGridHtml (m, n) {
    let gridHtml = '<table align="center">'
    for (let i = 0; i < m; ++i) {
      gridHtml += '<tr>'
      for (let j = 0; j < n; ++j) {
        gridHtml += '<td class="box empty" id="' + (i * n + j) + '"></td>'
      }
      gridHtml += '</tr>'
    }
    return gridHtml + '</table>' +
      '<h3 class="eval" id="evalHeader" align="center">Game started</h3>'
  }

  const $ = id => document.getElementById('' + id)
  $('grid').innerHTML = getGridHtml(19, 19)

  let playerTurn = false
  let currentPlayer = 0
  let previousCell = null
  let search = null
  let depth = Number($('depthInput').value)
  if (depth > 16 || depth < 1) depth = 4

  function startGame () {
    search = new Module.Search()
    $('depthInput').value = depth
    currentPlayer = 0
    previousCell = null
    playerTurn = $('playWhiteCheckbox').checked
    for (let i = 0; i < 361; ++i) $(i).className = 'box empty'
    if (playerTurn === false) makeBestMove()
  }

  function placeBead (cell) {
    search.place(currentPlayer, cell)
    if (previousCell !== null) $(previousCell).classList.remove('highlight')
    $(cell).classList.remove('empty')
    $(cell).className += ' player' + currentPlayer + ' highlight'
    previousCell = cell
    togglePlayer()
  }

  const displayStatus = msg => { $('evalHeader').innerHTML = msg }
  const getAnalysisMsg = bestMoveInfo => 'Eval: ' + bestMoveInfo.eval +
        '  depth: ' + depth + ' nodes: ' + bestMoveInfo.nodes
  const getWinMessage = () => {
    if (playerTurn === true) return 'I win!'
    return 'Well played. You win!'
  }

  function showWinningCombination () {
    const isPartOfWin = c => c > 0 && c < 361 && $(c).classList.contains('player' + (currentPlayer ^ 1))
    const c = previousCell
    for (let i = 0; i < 4; ++i) {
      const combination = [...Array(5).keys()]
      const rowCombination = combination.map(e => c + i - e)
      const columnCombination = combination.map(e => c + 19 * (i - e))
      const diagonalCombination = combination.map(e => c + 20 * (i - e))
      const antiDiagonalCombination = combination.map(e => c + 18 * (i - e))

      if (rowCombination.every(isPartOfWin)) {
        rowCombination.forEach(k => $(k).className = 'box win')
        return
      } else if (columnCombination.every(isPartOfWin)) {
        columnCombination.forEach(k => $(k).className = 'box win')
        return
      } else if (diagonalCombination.every(isPartOfWin)) {
        diagonalCombination.forEach(k => $(k).className = 'box win')
        return
      } else if (antiDiagonalCombination.every(isPartOfWin)) {
        antiDiagonalCombination.forEach(k => $(k).className = 'box win')
        return
      }
    }
  }

  function checkIfWon () {
    if (search.winner() !== -1) {
      displayStatus(getWinMessage())
      showWinningCombination()
    }
  }

  function makeBestMove () {
    if (search.winner() === -1) {
      const bestMoveInfo = search.calcBestMove(depth, currentPlayer)
      displayStatus(getAnalysisMsg(bestMoveInfo))
      placeBead(bestMoveInfo.bestMove)
      checkIfWon()
    }
  }

  function togglePlayer () {
    playerTurn = !playerTurn
    currentPlayer ^= 1
  }

  function readPlayerMove (cell) {
    if (search === null) {
      $('playWhiteCheckbox').checked = true
      startGame()
    }

    if (search.winner() === -1) {
      placeBead(cell)
      checkIfWon()
      makeBestMove()
    }
  }

  $('newGameButton').addEventListener('click', startGame)
  for (let i = 0; i < 361; ++i) $(i).addEventListener('click', () => readPlayerMove(i))
})
