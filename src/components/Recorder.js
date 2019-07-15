import Recorder from "opus-recorder"

class MediaRecorder {
    constructor() {

        this.recorder = null;
        this.deletePendingRecording = false;

        this.complete = new Promise((resolve) => {

            this.recorder = new Recorder({
                encoderPath: "./waveWorker.min.js",
                streamPages: false
            });

            this.recorder.ondataavailable = evt => {
                let audioData = evt.detail;

                if (this.deletePendingRecording) {
                    this.deletePendingRecording = false;
                    audioData = null;
                }

                this.killStream();
                resolve(audioData);
            };

            this.recorder.start();
        });
    }

    stop(deletePendingRecording) {
        this.deletePendingRecording = deletePendingRecording;
        this.recorder.stop();
    }

    get analyser() {

        return new Promise((resolve, reject) => {

            let maxCount = 200;
            let checkForSourceNode = () => {
                if (typeof this.recorder.sourceNode === 'undefined') {

                    maxCount--;
                    if (maxCount === 0)
                        return reject();

                    return setTimeout(checkForSourceNode, 100);
                }

                let listener = this.recorder.audioContext.createAnalyser();
                this.recorder.sourceNode.connect(listener);

                resolve(listener);
            };

            checkForSourceNode();
        });

    }

    killStream() {
        if (!this.recorder.stream)
            return;

        let tracks = this.recorder.stream.getTracks();
        tracks.forEach(track => track.stop());
    }

}

export default MediaRecorder
