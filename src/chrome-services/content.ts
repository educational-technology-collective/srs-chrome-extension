import {
  detectTranscript,
  detectPlayback,
  detectVideo,
  detectIvq,
  detectCopy,
  detectPaste,
  getUserData,
} from "./features";

// On initial load of the page.
console.log("extension loaded");

// Add new features here.
getUserData();
detectPlayback();
detectTranscript();
detectVideo();
detectIvq();
detectCopy();
detectPaste();
