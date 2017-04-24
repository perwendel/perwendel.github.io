// add target blank to all external links
for (var i = 0; i < document.links.length; i++) {
   if (document.links[i].hostname != window.location.hostname) {
       document.links[i].target = "_blank";
   } 
}

// init smoothscroll
smoothScroll.init({
    selector: 'a[href^="#"]', // Selector for links (must be a class, ID, data attribute, or element tag)
    selectorHeader: 'header', // Selector for fixed headers (must be a valid CSS selector) [optional]
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    offset: 24, // Integer. How far to offset the scrolling anchor location in pixels
    callback: function ( anchor, toggle ) {} // Function to run after scrolling
});

// scroll to current element on load
if (window.location.hash) {
    setTimeout(function() {
       window.scrollTo(0, window.scrollY - 110); 
    }, 0);
}

// trim blank lines around code
var codeBlocks = document.getElementsByTagName("code");
for (var i = 0; i < codeBlocks.length; i++) {
    codeBlocks[i].innerHTML = codeBlocks[i].innerHTML.trim();
}

// Calculate time to read
if(document.getElementById("timeToRead") !== null) {
    function getText(a){for(var d="",c=0;c<a.childNodes.length;c++){var b=a.childNodes[c];8!==b.nodeType&&(d+=1!=b.nodeType?" "+b.nodeValue:getText(b))}return d}function wordCount(a){return a.replace(/\r+/g," ").replace(/\n+/g," ").replace(/[^A-Za-z0-9 ]+/gi,"").replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s+/gi," ").split(" ").length} var estTime=Math.floor(wordCount(getText(document.getElementsByTagName("article")[0]))/100),estInterval=5*Math.round((estTime-estTime/3)/5)+"-"+5*Math.round((estTime+estTime/3)/5),estInterval=("0-0"===estInterval||"0-5"===estInterval||"5-5"===estInterval)?"~5":estInterval; document.getElementById("timeToRead").innerHTML = "Reading time: <b>"+estInterval+" min</b>";
}
