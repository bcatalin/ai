//this is an old file
var _ = require('underscore');
var synaptic = require('synaptic')
var input = new synaptic.Layer(2); // Two inputs
var output = new synaptic.Layer(3); // Three outputs

input.project(output); // Connect input to output


var myNetwork = new synaptic.Network({
    input: input,    
    output: output
});

//console.log(myNetwork.toJSON())

var trainingData = [
    {input: [1, 0], output: [1, 0, 0]}, // Clap -> Sit
    {input: [0, 1], output: [0, 1, 0]}, // Whistle -> Run
    {input: [1, 1], output: [0, 0, 1]}, // Clap+Whistle -> Jump
];

var learningRate = 0.4;
 
function train() {
    for(var i = 0; i < trainingData.length; i++) {
        input.activate(trainingData[i]["input"]);
        output.activate();
        output.propagate(learningRate, trainingData[i]["output"]);
    }
}

function retrain() {
    for(var i = 0; i < 100000; i++) {
        trainingData = _.shuffle(trainingData);
        train();
    }
}
 
retrain(); // Start the training


console.log(myNetwork.toJSON())

//----------------------------------------------------------
input.activate([0,1]); // Whistle
var result = output.activate();

console.log("Sit Neuron: " + result[0] * 100 + "%");
console.log("Run Neuron: " + result[1] * 100 + "%");
console.log("Jump Neuron: " + result[2] * 100 + "%");