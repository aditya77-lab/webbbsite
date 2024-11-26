// let video;
let classifier;
let label = '';

// Load the custom model
function modelReady() {
    console.log('Custom Model Loaded');
    classifyVideo();
}

// Classify the video feed
function classifyVideo() {
    classifier.classify(gotResult);
}

// Handle the results of classification
function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    label = results[0].label;
    updateUI();
    classifyVideo(); // Continue classification
}

// Update the UI based on the label
function updateUI() {
    const body = select('#body');
    const resultElement = select('#result');
    const adviceElement = select('#showAdvice');

    resultElement.html(label);
    if (label === "Mask Off") {
        body.style('background-color', 'red');
        adviceElement.style('color', 'yellow');
        adviceElement.html("Please Wear a Mask to Stay Safe");
    } else if (label === "Mask On") {
        body.style('background-color', '#343a40');
        adviceElement.style('color', 'green');
        adviceElement.html("Good! Stay Safe...");
    }
}

// Setup p5.js environment
function setup() {
    noCanvas();

    // Create video capture
    video = createCapture(VIDEO);
    video.parent('videoContainer');
    video.size(320, 240);

    // Load the MobileNet model with custom classifier
    const featureExtractor = ml5.featureExtractor('MobileNet', () => {
        console.log('Feature Extractor Ready');
    });
    classifier = featureExtractor.classification(video, () => {
        console.log('Video Ready');
        classifier.load('./model.json', modelReady);
    });
}
