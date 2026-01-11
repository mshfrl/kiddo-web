const params = new URLSearchParams(window.location.search); 
const subject = params.get("subject"); 

const script = document.createElement("script"); 

if(subject === "circle-btn") {
    script.src = "quiz-math.js"; 
} else if (subject === "english") {
    script.src = "quiz-english.js";
} else if (subject === "science" ) {
    script.src = "quiz-science.js";
}
document.head.appendChild(script);
