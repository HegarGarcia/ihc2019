export default class SpeechRec {
  constructor(_lang) {
    if ("webkitSpeechRecognition" in window) {
      this.rec = new webkitSpeechRecognition();
    } else {
      this.rec = new Object();
      console.log(
        "p5.SpeechRec: webkitSpeechRecognition not supported in this browser."
      );
    }

    if (_lang !== undefined) this.rec.lang = _lang;

    this.onResult;
    this.onStart;
    this.onError;
    this.onEnd;
    this.continuous = false;
    this.interimResults = false;
    this.resultJSON;
    this.resultValue;
    this.resultString;
    this.resultConfidence;
    var that = this;

    this.rec.onresult = function(e) {
      that.resultJSON = e;
      that.resultValue = e.returnValue;

      that.resultString = e.results[e.results.length - 1][0].transcript.trim();
      that.resultConfidence = e.results[e.results.length - 1][0].confidence;
      if (that.onResult != undefined) that.onResult();
    };

    this.rec.onstart = function(e) {
      if (that.onStart != undefined) that.onStart(e);
    };

    this.rec.onerror = function(e) {
      if (that.onError != undefined) that.onError(e);
    };

    this.rec.onend = function() {
      if (that.onEnd != undefined) that.onEnd();
    };
  }

  start() {
    if ("webkitSpeechRecognition" in window) {
      this.rec.continuous = this.continuous;
      this.rec.interimResults = this.interimResults;
      this.rec.start();
    }
  }
}
