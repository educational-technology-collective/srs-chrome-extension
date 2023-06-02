import { detectCopy, detectPaste } from "./copyPasteDetectionFeature";
import { detectTranscript } from "./transcriptDetectionFeature";
import { detectVideo } from "./videoDetectionFeature";
import { detectIvq } from "./ivqDetectionFeature";

// on initial load of the page.
console.log("extension loaded");

// add new features here.
detectCopy();
detectPaste();
detectTranscript();
detectVideo();
detectIvq();
