/// <reference path="F:\Javascript_WiredParts\QuizApp_Angular\QuizApp_AngularProject\QuizApp_AngularProject\Scripts/angular.js" />
/// <reference path="dataFactory.js" />

(function () {
    angular
        .module("turtleFacts")
        .factory("quizMetricsFactory", QuizMetrics);

    QuizMetrics.$inject=["DataFactory"];

    function QuizMetrics(DataFactory) {
        var quizObj = {
            quizActive: false,
            resultsActive:false,
            activateQuiz: activateQuiz,
            correctAnswers:[],
            //checks the number of correct answers in quiz
            checkingQuizAnswers: checkingQuizAnswers,
            dataFactory: DataFactory,

            //setting the count the of correct answer
            noOfCorrectAnswers:0
        };

        function activateQuiz(metric, state) {
            if (metric === "quiz") {
                quizObj.quizActive = state;
            } else if (metric === "results") {
                quizObj.resultsActive = state;
            } else {
                return false;
            }
        }
        //getting the number of correct answer
        function checkingQuizAnswers() {
            quizObj.correctAnswers = quizObj.dataFactory.correctAnswers;

           for (var i = 0; i < quizObj.dataFactory.quizQuestions.length; i++) {
                if (quizObj.dataFactory.correctAnswers[i] == quizObj.dataFactory.quizQuestions[i].selected) {
                    quizObj.noOfCorrectAnswers++;
                    quizObj.dataFactory.quizQuestions[i].correct = true;
                    quizObj.correctAnswers.push[i];
                } else {
                    quizObj.dataFactory.quizQuestions[i].correct = false;
                }
            }
        }
        return quizObj;
    }
}());