(function () {
  "use strict";
  

  angular.module('ctu').controller('WebRtcController', WebRtcController);

  function WebRtcController(skylink) {
    var me = this;
    me.joinRoom = function (roomName) {
      skylink.joinRoom(roomName, {
        'audio': true,
        'video': {
          'resolution': {
            'width': 640,
            'height': 320
          }
        }
      });
    };

    // var skylink = new Skylink();

    skylink.on('peerJoined', function (peerId, peerInfo, isSelf) {
      if (isSelf) return; // We already have a video element for our video and don't need to create a new one.
      var vid = document.createElement('video');
      vid.autoplay = true;
      vid.muted = true; // Added to avoid feedback when testing locally
      vid.id = peerId;
      document.body.appendChild(vid);
    });

    skylink.on('incomingStream', function (peerId, stream, isSelf) {
      if (isSelf) return;
      var vid = document.getElementById(peerId);
      attachMediaStream(vid, stream);
    });

    skylink.on('peerLeft', function (peerId, peerInfo, isSelf) {
      var vid = document.getElementById(peerId);
      document.body.removeChild(vid);
    });

    skylink.on('mediaAccessSuccess', function (stream) {
      var vid = document.getElementById('myvideo');
      attachMediaStream(vid, stream);
    });

    skylink.init({
      apiKey: '1901cbc8-db47-4508-8bcd-c837c0ee5e79', // Get your own key at developer.temasys.com.sg
      defaultRoom: getRoomId()
    });
    function joinRoom() {
      skylink.joinRoom('room', {
        'audio': true,
        'video': {
          'resolution': {
            'width': 640,
            'height': 320
          }
        }
      });
    }
    function webcam(event) {
      event.target.style.visibility = 'hidden';
    }

    function start() {
      skylink.shareScreen();
    }

    /* Helper functions */

    function getRoomId() {
      var roomId = document.cookie.match(/roomId=([a-z0-9-]{36})/);
      if (roomId) {
        return roomId[1];
      }
      else {
        roomId = skylink.generateUUID();
        var date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = 'roomId=' + roomId + '; expires=' + date.toGMTString() + '; path=/';
        return roomId;
      }
    };

  }
} ());