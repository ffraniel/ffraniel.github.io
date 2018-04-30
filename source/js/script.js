function scrollIt(destination, duration = 200, easing = 'linear', callback) {

    const easings = {
      linear(t) {
        return t;
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      }
    };
  
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
  
    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }
  
    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
  
      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }
  
      requestAnimationFrame(scroll);
    }
  
    scroll();
  }

document.getElementById('navHomeButton').addEventListener('click', () => {
    scrollIt(document.querySelector('#home'), 1000, "easeInOutCubic")
});

document.getElementById('navContactButton').addEventListener('click', () => {
    scrollIt(document.querySelector('#contact'), 1000, "easeInOutCubic")
});

//////form submitter////
let form = document.querySelector("form");
let submitButton = document.querySelector("#submit");
submitButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const submission = {
        name:form[0].value,
        email:form[1].value,
        comment:form[2].value
    };
    return fetch ('https://script.google.com/macros/s/AKfycbyA-nTxgm9s2-zLBIbKB6pXXlbiA5fbXokfAH3j7sGVpSqTX1w/exec', {
      method:'post',
      body: submission, 
      mode: 'no-cors',
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  })
  .then((res)=>{
    console.log(res)
    form[0].value = "";
    form[1].value = "";
    form[2].value = "";
    console.log(submission)
  })
  .catch(console.log)
})

//temporary broken form message
form.addEventListener('click', (e)=>{
  alert("Sorry, this form isn't working currently. Twitter: 'fran_whitehead'")
});