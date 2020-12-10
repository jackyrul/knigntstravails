 
  function availableMoves(squareName) {
    console.log('ff', squareName);
    const square = parseInput(squareName);
  
    const allPossibleMoves = [
      { x:square.x - 1, y: square.y - 2 },
      { x:square.x + 2, y: square.y - 1 },
      { x:square.x - 2, y: square.y + 1 },
      { x:square.x + 2, y: square.y + 1 },
      { x:square.x - 2, y: square.y - 1 },
      { x:square.x + 1, y: square.y + 2 },
      { x:square.x + 1, y: square.y - 2 },
      { x:square.x - 1, y: square.y + 2 },
    ];
    
    return allPossibleMoves
      .filter(move => canMove(move))
      .map(move => convertTOString(move));
  }
  
  function convertTOString(move) {
    const letter = 'abcdefgh'.charAt(move.x);
    return `${letter}${move.y + 1}`;
  }
  
  function canMove(move) {
    return move.x > -1 && 
           move.x < 8 && 
           move.y > -1 && 
           move.y < 8;
  }
  
  function parseInput(name) {
    const [row, column] = name.toLowerCase().split('');
    const columnPos = Number.parseInt(column) - 1;
    const rowPos = 'abcdefgh'.indexOf(row);
  
    if (rowPos < 0 && rowPos > 8 || columnPos < 0 && columnPos > 8){
      throw new Error('Wrong value');
    }
  
    return { x: rowPos, y: columnPos };
  }
  
  function shortPath(startPos, endPos) {
    const queue = [];
    const prevSearch = {};
    queue.push(startPos);
    prevSearch[startPos] = -1;
  
    while (queue.length > 0) {
      const frontSquare = queue.shift();
      if (frontSquare === endPos) {
        return getPath(frontSquare, prevSearch);
      }
  
      const nextMoves = availableMoves(frontSquare);
      for (const nextPos of nextMoves) {
        if (prevSearch[nextPos]) {
          continue;
        }
        
        queue.push(nextPos);
        prevSearch[nextPos] = frontSquare;
      }
    }
  
    return [];
  }
  
  function getPath (frontSquare, prevSearch, acc = []) {
    const prevPos = prevSearch[frontSquare];
    if (prevPos === -1) {
      return acc.reverse();
    }
  
    acc.push(frontSquare);
    return getPath(prevPos, prevSearch, acc);
  };
  
  module.exports = shortPath;