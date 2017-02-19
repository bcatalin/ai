synaptic = require('synaptic')

console.log('start ai');

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

function Perceptron(input, hidden, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;


var myPerceptron = new Perceptron(2,3,1);
var myTrainer = new Trainer(myPerceptron);

myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

var result = myPerceptron.activate([0,0]); // 0.0268581547421616
showResult(result);
result = myPerceptron.activate([1,0]); // 0.9829673642853368
showResult(result);
result = myPerceptron.activate([0,1]); // 0.9831714267395621
showResult(result);
result = myPerceptron.activate([1,1]); // 0.02128894618097928
showResult(result);

function showResult(result)
{
console.log("0 "  + result[0] * 100 + "%");
console.log("1 " + result[1] * 100 + "%");
console.log("2 " + result[2] * 100 + "%");
console.log("3 " + result[3] * 100 + "%");
console.log("============================")
}

