
var nIntervId;
var timer = 30;
var randomNumber = questions.length - 1 //becuase length starts at 1 array starts at 0***************
var wrong = 0;
var right = 0;
var baseUrl = "http://www.soundjay.com/button/";
var audio = ["beep-01a.mp3", "beep-02.mp3", "beep-03.mp3", "beep-04.mp3", "beep-05.mp3", "beep-06.mp3", "beep-07.mp3", "beep-08b.mp3", "beep-09.mp3"];



questions.forEach((question, index) => {
    console.log(question)
});

function startTimerFunction() {
    console.log(`Question Count ${randomNumber}`)
    if (randomNumber < 0) {
        $(".container").html(`
            <div>
            <h1> End Of Questions </h1>
            <h3></h3> 
            <h3> Score ${Math.round(right / questions.length * 100).toFixed(2)}%</h3>
            <button onClick="restart()">Try Again? </button>
            </div>
        
        `)
    } else {
        nIntervId = setInterval(startTimer, 1000);
        $("#startButton").remove();
        $(".container").html(`<div id="timer">30</div>\
    <ol id="questions">${questions[randomNumber].question}\
        <li>
           <input type="radio" id="answerA" name="question" 
            value="${questions[randomNumber].answers[0].content}">\
           ${questions[randomNumber].answers[0].content}
         </li>   
         <li>
            <input type="radio" id="answerB" name="question" 
            value="${questions[randomNumber].answers[1].content}">\
            ${questions[randomNumber].answers[1].content}
        </li>
            <li>
            <input type="radio" id="answerC" name="question"
             value="${questions[randomNumber].answers[2].content}">\
            ${questions[randomNumber].answers[2].content}
            </li>
            <li>
            <input type="radio" id="answerD" name="question"
             value="${questions[randomNumber].answers[3].content}">\
            ${questions[randomNumber].answers[3].content}
            </li>
    </ol>\
        <input type='button' onClick='submitAnswer()' value="Submit"></input>
        
`);
    }
};
function restart() {
    nIntervId;
    timer = 30;
    randomNumber = questions.length - 1 //becuase length starts at 1 array starts at 0***************
    wrong = 0;
    right = 0;
    startTimerFunction()
};



function startTimer() {
    timer = timer - 1
    $("#timer").html(timer);
    if (timer <= 0) {
        $(".container").html(`
            <div>
            <h1> Out Of Time!  </h1>
            </div >
        
        `)
        timer = 30;
        stopTimer()
        wrong++
        randomNumber--
        thenNextQuestion()
        console.log('Next called')
    }

};


function stopTimer() {
    clearInterval(nIntervId);
};



function submitAnswer() {

    console.log('Submit Worked')
    var answer = $('input[name=question]:checked', '#questions').val();
    console.log(answer);
    if (answer == `${questions[randomNumber].correctAnswer}`) {
        $(".container").html(`
            <div>
            <h1>Correct </h1>
            <h2>Correct Answer:${ questions[randomNumber].correctAnswer}</h2>
            </div >
        
        `)

        new Audio(baseUrl + audio[6]).play();
        randomNumber--
        right++
        stopTimer()
        timer = 30
    }
    else {
        $(".container").html(`
            <div>
            <h1>Wrong </h1>
            <h2>Correct Answer:${ questions[randomNumber].correctAnswer}</h2>
            </div>
        
        `)
        new Audio(baseUrl + audio[2]).play();
        randomNumber--
        wrong++
        timer = 30
        stopTimer()
    }
    thenNextQuestion()

};


function thenNextQuestion() {
    var timeout = setTimeout(startTimerFunction, 2000);
}















