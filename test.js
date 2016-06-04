angular.module('myApp', [])
.controller("maincont", ["$scope","$timeout", function($scope,$timeout) {
    $scope.circlesArray=[];
    $scope.stringVal="";
    $scope.nameVal="";
    $scope.lineArray=[];
    $scope.centerPoint={};
    var updateLines=function(){
         $scope.lineArray=[];
        var circles = document.getElementsByClassName("circleContent");
        var circleElems = angular.element(circles);
        var centerItem = document.getElementById("centerContent");
        var centerElem = angular.element(centerItem);
        $scope.centerPoint={"x":centerElem[0].offsetLeft+centerElem[0].offsetWidth/2,"y":centerElem[0].offsetTop+centerElem[0].offsetHeight/2-20};
        for(var i=0;i<circleElems.length;i++)
        {
            var itemPoint={"x":circleElems[i].offsetLeft+circleElems[i].offsetWidth/2,"y":circleElems[i].offsetTop+circleElems[i].offsetHeight/2-20};
            $scope.lineArray.push(itemPoint);
        }
    }
    $scope.$watch('stringVal', function(n, o) {
        $scope.circlesArray=[];
        for(var j=0;j<n.length;j++){
            var exists=-1;
            for(var i=0;i<$scope.circlesArray.length;i++){
                if($scope.circlesArray[i].name==$scope.stringVal[j]){
                    exists=i;break;
                }
            }
            if(exists==-1){
                $scope.circlesArray.push({
                    "style":{'width':'50px','height':'50px'},
                    "name":$scope.stringVal[j],
                    "count":1,
                    "top":{'top':'15px'}
                })
            }
            else{
                var width=$scope.circlesArray[exists].count*20+50;
                $scope.circlesArray[exists].style.width=width+'px';$scope.circlesArray[exists].style.height=width+'px';
                $scope.circlesArray[exists].top={'top':(width/2-15)+'px'}
                $scope.circlesArray[exists].count++;
            }
        }
        $timeout(function() {
            updateLines();
        });
    });
}])