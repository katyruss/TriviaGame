$(document).ready(function () {

	var currentQuestion = 0;
	var correctAnswer = 0;
	var incorrectAnswer = 0;
	var questionsUnanswered = 0;
	var questionsAnswered = 0;
	var seconds = 0;
	var time = 0;
	var playerPick = 0;

	var text = {
		correct: "That's correct!",
		incorrect: "Sorry, that's incorrect!",
		timesUp: "Sorry, time's up!",
		endOfGame: "Thanks for playing!",
	};

	var gameQuestions = [{
			question: "How many teeth do adult dogs normally have?",
			choices: ["42", "38", "24", "32"],
			correct: "42",
			image: "assets/images/answer-1.png",
			answerText: "Adult dogs normally have 42 teeth.",
		}, {
			question: "Through what part of the body do dogs sweat?",
			choices: ["Mouth", "Nose", "Paws", "Ears"],
			correct: "Paws",
			image: "assets/images/answer-2.jpeg",
			answerText: "Dogs sweat through their paws.",
		}, {
			question: "What is a dog's most highly developed sense?",
			choices: ["Taste", "Sight", "Touch", "Smell"],
			correct: "Smell",
			image: "assets/images/answer-3.jpg",
			answerText: "Smell is a dog's most highly developed sense.",
		}, {
			question: "What type of dog is born white and develops spots with age?",
			choices: ["Labrador Retriever", "Bulldog", "Bernese Mountain Dog", "Dalmation"],
			correct: "Dalmation",
			image: "assets/images/answer-4.jpg",
			answerText: "Dalmation puppies are born white and develop their quintessential spots with age.",
		},
		{
			question: "What is the largest breed of dog?",
			choices: ["English Mastiff", "Irish Wolfhound", "Great Dane", "St. Bernard"],
			correct: "Irish Wolfhound",
			image: "assets/images/answer-5.jpeg",
			answerText: "Irish Wolfhounds are the largest breed of dog.",
		}, {
			question: "What is the fastest breed of dog?",
			choices: ["German Spitz", "Harrier", "Swedish Vallhund", "Greyhound"],
			correct: "Greyhound",
			image: "assets/images/answer-6.jpeg",
			answerText: "Greyhounds are the fastest breed of dog."
		},
	];

	$("#gameArea").hide();

	$("#startBtn").on("click", function () {
		$("#startBtn").hide();
		newGame();
	});

	$("#restartBtn").on("click", function () {
		$("#gameResults").hide();
		newGame();
	});

	function questions() {
		$("#choices").empty();
		$("#beginGame").html(gameQuestions[currentQuestion].question);
		$("#beginGame").css("background-image", `url(${gameQuestions[currentQuestion].image}`)
		$("#beginGame").css("background-size", "cover")
		for (var i = 0; i <= 4; i++) {
			var list = $("<div>");
			list.text(gameQuestions[currentQuestion].choices[i]);
			list.attr({
				"data-index": i
			});

			if (gameQuestions[currentQuestion].choices[i] === gameQuestions[currentQuestion].correct) {
				list.addClass("correct")
			}
			list.addClass("thisChoice")
			console.log(list)
			$("#choices").append(list);
		}
	}

	$("#choices").on("click", ".thisChoice", function () {
		console.log("hey")
		console.log($(this).text())
		if ($(this).hasClass("correct")) {
			//THis is where I increse the correct answers 
			correctAnswer += 1
			console.log("YA NAILED IT")

			console.log(correctAnswer)
		} else {
			//THise is where I increase the wrong answers. 
			incorrectAnswer += 1
		}
		// I increase the question 
		currentQuestion++
		//I re append the questions
		if (currentQuestion === gameQuestions.length) {
			results();
		} else {
			questions();
		}

	})



	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		time = setInterval(countdownTimer, 1000);
	}

	function countdownTimer() {
		seconds--;
		if (seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({
				"color": "red"
			});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({
				"color": "#def"
			});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			displayAnswer();
		}
	}

	function results() {
		$("#gameAnswers").hide();
		$("#gameQuestions").hide();
		$("#gameResults").show();
		$("#resultText").html(text.done);
		$("#gameResults").prepend("Correct Answers " + correctAnswer)
		$("#incorrectAnswer").html("Wrong Answers: " + incorrectAnswer);
		$("#questionsUnanswered").html("Didn't Answer: " + questionsUnanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	function newGame() {
		$("#gameArea").show();
		$("#gameAnswers").hide();
		$("#gameQuestions").show();
		currentQuestion = 0
		questions();
	}


});