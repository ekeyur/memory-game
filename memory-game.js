var app = angular.module('memory-game', []);
app.controller('gameController', function($scope, $timeout) {

  $scope.state = "first";
  $scope.firstcard = '';
  var cardsArray = [];
  for (var i=1;i<17;i++) {
    cardsArray.push(new Card(i));
  }

  shuffle(cardsArray);
  // creating a new card for logo card
  var tempCards = [];
  for(var j=0;j<8;j++){
    card = cardsArray.pop();
    tempCards.push(card);
    tempCards.push(card.copy());
  }
  shuffle(tempCards);
  $scope.gameCards = tempCards;
  $scope.firstCard = function(card){
    if($scope.state !== "second"){
      card.open = true;
      $scope.firstcard = card;
      $scope.state = "second";
    }
    else if($scope.state === "second"){
      card.open = true;
      console.log($scope.firstcard);
      console.log(card);
      if(card.url === $scope.firstcard.url){
        $scope.firstcard.matched = true;
        card.matched = true;
        $scope.state = "first";
        if($scope.gameCards.every(function(card){
          return card.open;
        })){
          $timeout(function () {
            $scope.winmessage = "You win";
          }, 300);

        }

      }
      else
      {
        $timeout(function () {
          card.open = false;
          $scope.firstcard.open = false;
          $scope.state = "first";
        }, 500);
      }
    }
  };

});


///------ Shuffle method
var shuffle = function(cArray){
  for(var k=0;k<cArray.length;k++){
    var r = Math.floor(Math.random() * cArray.length);
    var temp = cArray[k];
    cArray[k] = cArray[r];
    cArray[r] = temp;
  }
};

Card = function(card) {
  this.number = card;
  this.url = 'images/monsters-' + card.toString() + '.png';
  this.open = false;
  this.matched = false;
};
Card.prototype.getCardUrl = function() {
  return this.url;
};
Card.prototype.copy = function(){
  return new Card(this.number);
};
var gameOver = function() {
  alert("Out of time!");
};
