var index = 0;
let E = [2, 3];
let F = [5, 7];
let G = [0];
let H = [10, 23];
let M = [2, 1];
let N = [4, 9];
let B = [E, F];
let C = [G, H];
let D = [M, N];
let A = [B, C, D];

console.log(minimax(A, 3, 'max'));


function minimax(node, depth, maximizingPlayer) {
  return (alphabeta(node, depth, -10000, 10000, maximizingPlayer, index));
}

function alphabeta(node, depth, a, b, maximizingPlayer, index) {
  // console.log(node, a, b, maximizingPlayer);
  if (node[0] == undefined || depth == 0) {
    //   console.log(depth)
    //   console.log('node: ' + node);
    console.log(node, index)
    return {
      node: node,
      index: index,
    };
  }
  if (maximizingPlayer == 'max') {
    for (let i = 0; i < node.length; i++) {
      a = Math.max(a, alphabeta(node[i], depth - 1, a, b, 'min', index++));
      // console.log(node);
      // console.log('a: cho goi ham max' + '-----------' + a);
      if (a >= b) {
        // console.log('a: ' + a);
        // console.log('b: ' + b);

        break;
      }
    }
    return a;
  } else {
    for (let i = 0; i < node.length; i++) {
      b = Math.min(b, alphabeta(node[i], depth - 1, a, b, 'max', index));
      // console.log(node);
      // console.log('b: cho goi ham min' + '--------' + b);
      if (a >= b) {
        // console.log('a: ' + a);
        // console.log('b: ' + b);
        break;
      }
    }
    return b;
  }
}