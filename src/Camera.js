import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 540,
    facingMode: "environment"
};

const Camera = () => {
    const webcamRef = useRef(null);
    const [url, setUrl] = useState(null);

    const capturePhoto = React.useCallback(async (e) => {
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
       
        setUrl(imageSrc);

        console.log(imageSrc);
        //convert this imageSrc(base64) to imageFile
        const imageFile = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
           
        });
    }, [webcamRef]);

    return (
        <div className="w-full flex justify-between mt-4">
            <div className="w-1/2 mr-2">
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    mirrored={false}
                />
                <button onClick={capturePhoto}>Capture</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    setUrl(null);
                }}>Refresh</button>
            </div>
            <div>
                {url ? (
                    <img src={url} alt="Screenshot" className="" />
                ) : <span className="m-auto text-center">Your Pic will be below 👇</span>}
            </div>
        </div>
    );
};
export default Camera;