function scrollIt(e,t=200,n="linear",o){const c={linear:e=>e,easeInOutCubic:e=>e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},i=window.pageYOffset,m="now"in window.performance?performance.now():(new Date).getTime(),d=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight),r=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight,u="number"==typeof e?e:e.offsetTop,l=Math.round(d-u<r?d-r:u);if("requestAnimationFrame"in window==!1)return window.scroll(0,l),void(o&&o());!function e(){const d="now"in window.performance?performance.now():(new Date).getTime(),r=Math.min(1,(d-m)/t),u=c[n](r);window.scroll(0,Math.ceil(u*(l-i)+i)),window.pageYOffset!==l?requestAnimationFrame(e):o&&o()}()}document.getElementById("navHomeButton").addEventListener("click",()=>{scrollIt(document.querySelector("#home"),1e3,"easeInOutCubic")}),document.getElementById("navContactButton").addEventListener("click",()=>{scrollIt(document.querySelector("#contact"),1e3,"easeInOutCubic")});