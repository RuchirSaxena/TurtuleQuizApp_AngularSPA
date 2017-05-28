/// <reference path="F:\Javascript_WiredParts\QuizApp_Angular\QuizApp_AngularProject\QuizApp_AngularProject\Scripts/angular.js" />
/// <reference path="../factories/quizMetrics.js" />
(function () {

    angular
        .module("turtleFacts")
        .controller("resultCtrl", ResultController);

    ResultController.$inject = ['quizMetricsFactory', 'DataFactory'];

    function ResultController(quizMetricsFactory, DataFactory) {
        var vm = this;
        vm.quizMetricsFactory = quizMetricsFactory;
        vm.dataFactory = DataFactory;
        vm.activeQuestion = 0;
        vm.getAnswerClass = getAnswerClass;
        vm.setActiveQuestion = setActiveQuestion;
        vm.resetQuiz = resetQuiz;

        function getAnswerClass(index) {
            if (index === quizMetricsFactory.correctAnswers[vm.activeQuestion]) {
                return "bg-success";
            } else if(index===DataFactory.quizQuestions[vm.activeQuestion].selected) {
                return "bg-danger";
            }
        }

        function setActiveQuestion(index) {
            vm.activeQuestion = index;
        }

        function resetQuiz() {
            quizMetricsFactory.activateQuiz("results", false);
            quizMetricsFactory.noOfCorrectAnswers = 0;

            for (var i = 0; i < DataFactory.quizQuestions.length; i++) {
                var data = DataFactory.quizQuestions[i];
                data.selected = null;
                data.correct = null;
            }
        }
    }

}());