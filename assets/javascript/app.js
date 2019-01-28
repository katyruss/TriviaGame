$(document).ready(function() {

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

	var gameQuestions = [
        {	
			question: "How many teeth do adult dogs normally have?",
			choices: ["42", "38", "24", "32"],
			correct: 0,
			image: "assets/images/answer-1.png",
			answerText: "Adult dogs normally have 42 teeth.",
		},

		{
			question: "Through what part of the body do dogs sweat?",
			choices: ["Mouth", "Nose", "Paws", "Ears"],
			correct: 2,
			image: "assets/images/answer-2.jpeg",
			answerText: "Dogs sweat through their paws.",
		},

		{
			question: "What is a dog's most highly developed sense?",
			choices: ["Taste", "Sight", "Touch", "Smell"],
			correct: 3,
			image: "assets/images/answer-3.jpg",
			answerText: "Smell is a dog's most highly developed sense.",
		},

		{
			question: "What type of dog is born white and develops spots with age?",
			choices: ["Labrador Retriever", "Bulldog", "Bernese Mountain Dog", "Dalmation"],
			correct: 3,
			image: "assets/images/answer-4.jpg",
			answerText: "Dalmation puppies are born white and develop their quintessential spots with age.",
		},
		{
			question: "What is the largest breed of dog?",
			choices: ["English Mastiff", "Irish Wolfhound", "Great Dane", "St. Bernard"],
			correct: 1,
			image: "assets/images/answer-5.jpeg",
			answerText: "Irish Wolfhounds are the largest breed of dog.",
		},
		{
			question: "What is the fastest breed of dog?",
			choices: ["German Spitz", "Harrier", "Swedish Vallhund", "Greyhound"],
			correct: 3,
			image: "assets/images/answer-6.jpeg",
			answerText: "Greyhounds are the fastest breed of dog."
		},
	];

    $("#gameArea").hide();

    $("#startBtn").on("click", function(){
		$("#startGame").hide();
        newGame();
    });    

    $("#restartBtn").on("click", function(){
        $("#gameResults").hide();
        newGame();
    });      

    function newGame() {
		$("#gameArea").show();
		$("#gameAnswers").hide();
		$("#gameQuestions").hide();		
		correctAnswer = 0;
		incorrectAnswer = 0;
		questionsAnswered = 0;
		currentQuestion = 0;
		questions();
	}
    
    function questions() {
		$("#gameAnswers").hide();
		$("#gameQuestions").show();
        questionsAnswered = true;
        
    $(".question").html(gameQuestions[currentQuestion].question);

		for (var i = 0; i <= 4; i++) {
			var list = $("<div>"); 

    list.text(gameQuestions[currentQuestion].choices[i]);
		list.attr({"data-index": i });
		list.addClass("thisChoice");
        $(".choices").append(list);
        
		}

    countdown();
		$(".thisChoice").on("click",function(){
			playerPick = $(this).data("index");
			clearInterval(time);
			displayAnswer();
		});
    }
    
    function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		time = setInterval(countdownTimer, 1000);
    }
    
    function countdownTimer() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "red"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			displayAnswer();
		}
    }
    
    function displayAnswer() {
		$("#gameQuestions").hide();
		$("#gameResults").hide();
		$("#gameAnswers").show();
		$(".thisChoice").empty();

		var rightAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQ].correct];
		var rightAnswerIndex = triviaQuestions[currentQ].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);
		
		var gifLink = triviaQuestions[currentQ].image;
		var Giffy = $("<img>");
		Giffy.attr("Src", gifLink);
		Giffy.addClass("gifImg");
		$("#gif").html(Giffy);
	
		var gifText = triviaQuestions[currentQ].answerText;
			newCap = $("<div>");
			newCap.html(gifText);
			newCap.addClass("gifCap");
			$("#gifText").html(newCap);

		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//Last Answer Reveal Timer
		if (currentQ === (triviaQuestions.length-1)) {
			setTimeout(results, 10000);
		} else {
			currentQ++;
			setTimeout(questions, 10000);
		}

	}

	function results() {
		$("#gameAnswers").hide();
		$("#gameQuestions").hide();
		$("#gameResults").show();
		$("#resultText").html(text.done);
		$("#correctAnswer").html("Correct Answers: " + correctAnswer);
		$("#incorrectAnswer").html("Wrong Answers: " + incorrectAnswer);
		$("#questionsUnanswered").html("Didn't Answer: " + questionsUnanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}


});