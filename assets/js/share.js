function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  let val = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    // console.clear();

    if (--timer < 0) {
      timer = duration;
      clearInterval(val);
      console.log("Finished");
      // document.getElementById('filelink').style.display = "none";
      document.getElementById("filelink").remove();
      document.getElementById("expired").innerHTML +=
        "<p>Download Link has expired</p><br><a href='/'>Go Back to Homepage</a>";
    }
  }, 1000);
}
window.onload = function () {
  var setTimerInMin = 60 * 0.5,
    display = document.getElementById("timer");
  startTimer(setTimerInMin, display);
};

function copy(evt) {
  var link = document.querySelector("#link");
  // var range = document.createRange();
  // range.selectNode(link.href);
  // window.getSelection().addRange(range);

  // try {
  //   // Now that we've selected the anchor text, execute the copy command
  //   var successful = document.execCommand('copy');
  //   var msg = successful ? 'successful' : 'unsuccessful';
  //   console.log('Copy link command was ' + msg);
  // } catch (err) {
  //   console.log('Oops, unable to copy');
  // }

  // // Remove the selections - NOTE: Should use
  // // removeRange(range) when it is supported
  // window.getSelection().removeAllRanges();
  evt.preventDefault();
  navigator.clipboard.writeText(link.getAttribute("href")).then(
    () => {
      /* clipboard successfully set */
      console.log("Copied Successfully");
    },
    () => {
      /* clipboard write failed */
      console.log("Copy Failed");
    }
  );
}
