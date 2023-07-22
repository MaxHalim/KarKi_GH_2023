const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
let localStream, remoteStream;
let peerConnection;


const iceServers = [
  { urls: 'stun:stun1.l.google.com:19302' },
];

//tried to implement remote conection but was unable to complete it due to time constraints :(
async function startCall() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    //conmnect
    peerConnection = new RTCPeerConnection({ iceServers });

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    //event handler
    // peerConnection.ontrack = handleRemoteStreamAdded;
    // peerConnection.onicecandidate = handleICECandidateEvent;

    //sdp offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // wss.clients.forEach(client => {
    //   if (client !== wss && client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify({type: 'offer: ', sdp:peerConnection.localDescription}));
    //   }

    // });


  } catch (error) {
    console.error('Error starting call:', error);
  }
  
}



