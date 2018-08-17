const worker = new Worker("js/worker.js");

worker.addEventListener("message", (e) => {
  // Receive results from worker thread
  console.log("received: " + e.data.toString());
}, false);

// Send child process some work
worker.postMessage(1000000000);