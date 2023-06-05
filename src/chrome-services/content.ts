import { detectTranscript, detectVideo, detectIvq, detectCopy, detectPaste, chunkTranscript } from "./features";

// on initial load of the page.
console.log("extension loaded");

// add new features here.
detectTranscript();
detectVideo();
detectIvq();
detectCopy();
detectPaste();
chunkTranscript();
