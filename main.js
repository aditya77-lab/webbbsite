// let video;
// let mobilenet, classifier;
// let label = '';

// let on,off,train,save;


// img =  document.getElementById("img");
// console.log(img);

// // load custom model 
// function modelReady(){
// 	console.log('Model is Ready');
// }

// // // make prediction with custom model
// // function customModelReady(){
// // 	console.log('custom model loaded');
// // 	label = "Model Ready";
// // 	classify();
// // }


// // just for video
// function vidoeReady(){
// 	console.log('video is Ready');
// }


// // fucntion for classification
// function classify(){
// 	classifier.classify(gotResult);
// }

// // get the result
// function gotResult(error, result){
// 	if(error){
// 		console.log(error);
// 	}else{
// 		label = result[0]['label'];
// 		classify();
// 	}
// }

// function whileTraining(loss)
// {
// 	console.log(loss)
// 	if(loss == null){
// 		console.log("Training Complete");
// 		createP('Training Complete' + loss)
// 		classify();
// 	}else{
// 		console.log(loss)
// 	}
// }


// // p5.js setup function
// function setup(){
// 	noCanvas();

// 	// create video Object
// 	video = createCapture(VIDEO);
// 	video.parent('videoContainer');

// 	// loading model
// 	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
// 	classifier = mobilenet.classification(video, vidoeReady);


// 	on = createButton("Mask On");
// 	on.mousePressed(function(){
// 		classifier.addImage('Mask On');
// 	})

// 	off = createButton("Mask Off");
// 	off.mousePressed(function(){
// 		classifier.addImage('Mask Off');
// 	})



// 	train = createButton("Train");
// 	train.mousePressed(function(){
// 		classifier.train(whileTraining);
// 	})

// 	save = createButton("save");
// 	save.mousePressed(function(){
// 		classifier.save();
// 	})

// }

// function draw(){
// 	select('#result').html(label);
// 	if(label == "Mask Off"){
// 		select('#showAdvice').html("Please Ware Mask To Stay Safe")
// 	}else if(label == "Mask On"){
// 		select('#showAdvice').html("Good Stay Safe...")

// 	}
// 	// img.src.replace("images/c.jpg", "_b");
// }

let video;
let classifier;
let label = "";

// Load the custom model
function modelReady() {
    console.log("Custom Model Loaded");
    classifyVideo();
}

// Classify the video feed
function classifyVideo() {
    if (classifier) {
        classifier.classify(gotResult);
    }
}

// Handle classification results
function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    label = results[0].label;
    updateUI();
    classifyVideo(); // Keep classifying
}

// Update the UI based on classification results
function updateUI() {
    const body = select("#body");
    const resultElement = select("#result");
    const adviceElement = select("#showAdvice");

    resultElement.html(label);
    if (label === "Mask Off") {
        body.style("background-color", "red");
        adviceElement.style("color", "yellow");
        adviceElement.html("Please Wear a Mask to Stay Safe");
    } else if (label === "Mask On") {
        body.style("background-color", "#343a40");
        adviceElement.style("color", "green");
        adviceElement.html("Good! Stay Safe...");
    } else {
        adviceElement.html("");
    }
}

// Setup the p5.js environment
function setup() {
    noCanvas();

    // Initialize video capture
    video = createCapture(VIDEO);
    video.parent("videoContainer");
    video.size(320, 240);

    // Load the MobileNet model and custom classifier
    const featureExtractor = ml5.featureExtractor("MobileNet", () => {
        console.log("Feature Extractor Ready");
    });

    classifier = featureExtractor.classification(video, () => {
        console.log("Video Ready");
        classifier.load("./model.json", modelReady); // Ensure model.json is in the correct path
    });
}

