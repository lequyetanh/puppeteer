var nn = require('nn')
var opts = {
    layers: [ 4 ],
    iterations: 300000,
    errorThresh: 0.0000005,
    activation: 'logistic',
    learningRate: 0.4,
    momentum: 0.5,
    log: 100   
}
var net = nn(opts)
net.train([
    { input: [ 0,0 ], output: [ 0 ] },
    { input: [ 0,1 ], output: [ 0 ] },            
    { input: [ 1,0 ], output: [ 0 ] },
    { input: [ 0,1 ], output: [ 0 ] },
    { input: [ 1,0 ], output: [ 0 ] },
    { input: [ 1,1 ], output: [ 1 ] },
    { input: [ 0,0 ], output: [ 0 ] }
    ])
// send it a new input to see its trained output
var output = net.send([ 1,1]) 
console.log(output); //0.9971279763719718