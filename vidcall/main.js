let localStream, remoteStream;
let localVideo, remoteVideo;
let peerConnection;

const iceServers = [
  { urls: 'stun:stun1.l.google.com:19302' },
];

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');

    if (cameras.length >= 2) {
      const constraints1 = { video: { deviceId: cameras[0].deviceId } };
      const constraints2 = { video: { deviceId: cameras[1].deviceId } };

      const stream1 = await navigator.mediaDevices.getUserMedia(constraints1);
      const stream2 = await navigator.mediaDevices.getUserMedia(constraints2);

      localStream = stream1;
      remoteStream = stream2;

      localVideo = document.getElementById('localVideo');
      remoteVideo = document.getElementById('remoteVideo');

      localVideo.srcObject = localStream;
      remoteVideo.srcObject = remoteStream;

    } else {
      console.log('Not enough cameras detected.');
    }
  } catch (error) {
    console.error('Error accessing cameras:', error);
  }
}

async function startCall() {
  try {
    //access cams
    await getCameras();

  
    peerConnection = new RTCPeerConnection({ iceServers });

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    //remote stream
    peerConnection.ontrack = event => {
      if (!remoteVideo.srcObject) {
        remoteVideo.srcObject = event.streams[0];
      }
    };

    //SDP offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);


  } catch (error) {
    console.error('Error starting call:', error);
  }  
}

function endCall() {
  //close connection
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  if (remoteStream) {
    remoteStream.getTracks().forEach(track => track.stop());
    remoteStream = null;
  }
  //clear video
  if (localVideo) {
    localVideo.srcObject = null;
  }
  if (remoteVideo) {
    remoteVideo.srcObject = null;
  }
}
