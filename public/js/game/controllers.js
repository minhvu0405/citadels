define(["angular"], function (angular) {
  "use strict";

  return angular.module("game.controllers", [])
    .controller("LobbyCtrl", ["$scope",
      function ($scope) {
        var socketData = $scope.socketData;
        var roomName = $scope.$stateParams.roomName;
        var nickname = socketData.localPlayer.nickname;

        $scope.leave = function () {
          $scope.socket.emit("leave room", {roomName: roomName});
          delete $scope.socketData.remoteRooms[roomName].players[nickname];
          console.log(nickname + " has left " + roomName);
          if (Object.keys(socketData.remoteRooms[roomName].players).length == 0) {
            delete $scope.socketData.remoteRooms[roomName];
            console.log(roomName + " has been destroyed")
          }
          $scope.$state.go("main");
        }
    }]);
});