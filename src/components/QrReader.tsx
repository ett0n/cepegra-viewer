/* ------------- I M P O R T ------------- */
/* --- import dependencies --- */
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { QrReader } from "react-qr-reader"

/* --- import component --- */
import ScanOverlay from "./ScanOverlay";


//Encore cracra -> A refactorer

const QrScan = ({ setQrResult }:  {setQrResult: Dispatch<SetStateAction<any>>} ) => {
  const [getDelayScan, setDelayScan] = useState<number>(2000);
  const HandleScan = (result:any, error:any) => {
    if (result) {
      console.log(result);
      setQrResult(result?.text);
      //setDelayScan(false);
    } 
    else if (error) {
      //console.log("Prout: ", error);
      return;
    }
    // TEMP fix, wonrgly set the localStorage to userInfo with id 1, then redirect to the HomeScreen
    console.log('ok scanne')
    localStorage.setItem("userInfo", JSON.stringify({"id":1,"pseudo":"User1"}));

  };

  // // - - - Stop camera - - - 
  // console.dir('camera', MediaDevices)
  // // const stream = navigator.mediaDevices.getUserMedia();
  // // const StopCamera = (stream) => {
  // //   stream.getTracks().forEach(track => track.stop())
  // // }
  // navigator.mediaDevices.getUserMedia({video: true, audio: false})
  // .then(mediaStream => {
  //   const stream = mediaStream;
  //   const tracks = stream.getTracks();
  //   document.addEventListener('click', (e)  => {
  //     console.log(e)
  //     tracks.forEach(track => track.stop)
  //   })
  //   //Tracks[0].stop;
  // })

  console.log(navigator)

  return (
  /* ------------- R E N D U ------------- */
    <div>
      <QrReader
        constraints={{ facingMode: "environnement" }}
        onResult={HandleScan}
        scanDelay={getDelayScan}
        ViewFinder={ScanOverlay}
        className="qrScan"
        containerStyle={{ width: 200 }}
        videoStyle={{ height: 200 }}
      />
    </div>
  );
};

export default QrScan;

// const ScanQrPopUp = () => {
//     const [address, setAddress] = useState<string>("");
//     const [isRecording, setIsRecording] = useState<boolean>(true);
//     const  ref = useRef(null);

//     useEffect(() => {
//         setIsRecording(false)
//         closeCam();
//     }, [address]);

//     const closeCam = async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             audio: false,
//             video: true,
//         });
//         stream.getTracks().forEach(function (track) {
//             track.stop();
//             track.enabled = false;
//         });
//         ref.current.stopCamera()
//     };


//     return (
//         <div>
//             <h1>
//                 Buy
//             </h1>

//             {isRecording && (
//                 <div>
//                     <QrReader
//                         onResult={(result, error) => {
//                             if (result) {
//                             setAddress(result?.text);
//                             }
//                             if (error) {
//                             console.log(error);
//                             }
//                         }}
//                         containerStyle={{ width: 200 }}
//                         videoStyle={{ height: 200 }}
//                         ref={ref}
//                     />
//                 </div>
//             )}

//             <p>{address}</p>
//         </div>
//     );
// };