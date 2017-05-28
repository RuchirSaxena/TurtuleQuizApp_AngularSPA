/// <reference path="F:\Javascript_WiredParts\QuizApp_Angular\QuizApp_AngularProject\QuizApp_AngularProject\Scripts/angular.js" />

(function () {
    angular
        .module("turtleFacts")
        .controller("quizctrl", QuizContoller);

    //injecting the factory in QuizContoller
    QuizContoller.$inject = ["quizMetricsFactory", "DataFactory"];

    function QuizContoller(quizMetricsFactory, DataFactory) {
        var vm = this;
        vm.quizMetrics = quizMetricsFactory;
        vm.dataFactory = DataFactory;
        vm.activeQuestion = 0;
        vm.questionAnswered = questionAnswered;
        vm.setActiveQuestion = setActiveQuestion;
        vm.selectedAnswer = selectedAnswer;
        vm.error = false;
        vm.finalise = false;
        vm.finaliseAnswers = finaliseAnswers;

       
        var numberOfQuestionAnswered = 0;
        function questionAnswered() {
            //getting the length of quiz
            var quizLength = DataFactory.quizQuestions.length;
            //checking if the selected question is answered or not
            if (DataFactory.quizQuestions[vm.activeQuestion].selected != null) {
                numberOfQuestionAnswered++; //if current question is answered
                //checking if the number of question answerd is equal to quizlength
                if (numberOfQuestionAnswered >= quizLength) {
                   
                    //checking if any question has not been answerd and then 
                    //making that question as active question
                    for (var i = 0; i < quizLength; i++) {
                        if (DataFactory.quizQuestions[i].selected === null) {
                            setActiveQuestion(i);
                            return;
                        }
                    }
                    //finalising quiz
                    //if all the questions has been answered then finalising the quiz
                    vm.error = false;
                    vm.finalise = true;
                    return;
                }
            }
            vm.setActiveQuestion();
        }

        function setActiveQuestion(index) {
            if (index===undefined) {
                var breakOut = false;
                var quizLength = DataFactory.quizQuestions.length - 1;

                while (!breakOut) {
                    //here if the length of the quiz reaches to the end then the quiz will move to 1st quesion 
                    vm.activeQuestion = vm.activeQuestion < quizLength ? ++vm.activeQuestion : 0;

                    if (vm.activeQuestion === 0) {
                        vm.error = true;
                    }

                    if (DataFactory.quizQuestions[vm.activeQuestion].selected === null) {
                        breakOut = true;
                    }
                }
            } else {
                vm.activeQuestion = index;
            }
        }

        function selectedAnswer(index) {
            DataFactory.quizQuestions[vm.activeQuestion].selected = index;
        }

        function finaliseAnswers() {
            vm.finalise = false;
            numberOfQuestionAnswered = 0;
            vm.activeQuestion = 0;
            quizMetricsFactory.checkingQuizAnswers();
            quizMetricsFactory.activateQuiz("quiz", false);
            quizMetricsFactory.activateQuiz("results", true);
          //  location.href = "http://localhost:45497/Result.html";

        }
     }
}());