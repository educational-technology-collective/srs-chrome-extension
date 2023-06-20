import {
  detectTranscript,
  detectPlayback,
  detectVideo,
  detectIvq,
  detectCopy,
  detectPaste,
  chunkTranscript,
  sideBar,
} from "./features";

// on initial load of the page.
console.log("extension loaded");

// add new features here.
detectTranscript();
detectPlayback();
detectVideo();
detectIvq();
detectCopy();
detectPaste();
chunkTranscript(60);
sideBar();
