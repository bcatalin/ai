//test file for training an neural network

var _ = require('underscore');
var synaptic = require('synaptic');
var fs = require('fs');


// create the network
var inputLayer = new synaptic.Layer(2);
var hiddenLayer = new synaptic.Layer(3);
//var hiddenLayer2 = new synaptic.Layer(30);
var outputLayer = new synaptic.Layer(3);

//connect the layers
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new synaptic.Network({
    input: inputLayer,
    hidden: [hiddenLayer],//, hiddenLayer2],
    output: outputLayer
});

// train the network
var learningRate = .4;
for (var i = 0; i < 20000; i++)
{
    // 0,0 => 0
    myNetwork.activate([0,0]);
    myNetwork.propagate(learningRate, [0,0,0]);

    // 0,1 => 1
    myNetwork.activate([0,1]);
    myNetwork.propagate(learningRate, [0,1,0]);

    // 1,0 => 1
    myNetwork.activate([1,0]);
    myNetwork.propagate(learningRate, [1,0,0]);

    // 1,1 => 0
    myNetwork.activate([1,1]);
    myNetwork.propagate(learningRate, [0,0,1]);
}

//console.log(myNetwork.toJSON());


var exported = myNetwork.toJSON();

var writeToFile = 0;
if(writeToFile == 1)
{
 fs.writeFile('model.json', JSON.stringify(myNetwork.toJSON()) );
}


var readFromFile = 1;
if(readFromFile == 1)
{
    exported = JSON.parse(fs.readFileSync('model.json', 'utf8'));
}

var imported = synaptic.Network.fromJSON(exported);



console.log("==== Ready to go ==============")
function showResult(result)
{
console.log("Sit "  + result[0] * 100 + "%");
console.log("Run " + result[1] * 100 + "%");
console.log("Jump " + result[2] * 100 + "%");
//console.log("3 " + result[3] * 100 + "%");
console.log("============================")
}
// test the network
var result = imported.activate([0,0]); 
showResult(result);
result = imported.activate([0,1]); 
showResult(result);
result = imported.activate([1,0]); 
showResult(result);
result = imported.activate([1,1]); 
showResult(result);