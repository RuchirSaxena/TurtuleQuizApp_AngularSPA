/// <reference path="F:\Javascript_WiredParts\QuizApp_Angular\QuizApp_AngularProject\QuizApp_AngularProject\Scripts/angular.js" />

(function () {
    angular
        .module("turtleFacts")
        .controller("listCtrl", listController);

    //injecting the factory in listController
    listController.$inject = ['quizMetricsFactory', 'DataFactory'];

    function listController(quizMetricsFactory, DataFactory) {
        var vm = this;
        vm.data = DataFactory.turtlesData;
        vm.activeTurtle = {};
        vm.changeActiveTurtle = changeActiveTurtle;
        vm.search = "";
        vm.quizActive = false;
        vm.activateQuiz = activateQuiz;
        vm.quizMetricsFactory = quizMetricsFactory;

        function changeActiveTurtle(index) {
            vm.activeTurtle = index;
        }
        //for setting the visibility of list of turtles
        function activateQuiz() {
            //ascessing the method of quizMetricsFactory.activateQuiz and passing the relevant param
            quizMetricsFactory.activateQuiz("quiz",true);
            //ascessing the property of quizMetricsFactory.quizActive and passing the relevant param
            vm.quizActive = quizMetricsFactory.quizActive;
         }
    }

}());
