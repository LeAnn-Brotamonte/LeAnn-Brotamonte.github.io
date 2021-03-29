let paint = document.querySelector('#paint')
//let saveButton = document.querySelector('.save');
let ctx = paint.getContext("2d");
let x = 0;
let y = 0;
let rect = paint.getBoundingClientRect();
let style ="#FF0000";
let isDrawing = false;
var myVar; // Variable for timer

//Mouse events
paint.addEventListener('mousedown', e => {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top; // to get the cursor position relative to the "origin" of the canvas
    isDrawing = true;
})

paint.addEventListener('mousemove', e => {
    if(isDrawing === true){
        lineDraw(ctx,x,y,e.clientX - rect.left,e.clientY - rect.top,style);
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
})

paint.addEventListener('mouseup', e => {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    isDrawing = false;
    x = 0;
    y = 0;
})

//Functions for the different buttons
function DrawPen(){
    style = "#FF0000"; 
}
function Erase(){
    style = "#F5F5F5";
}
function ClearPaint(){
    ctx.clearRect(0,0,paint.width,paint.height);
}

function displayBtn() {
    //myVar = setInterval(saveCanvas,500); // Calls saveCanvas every 500 ms or 0.5 sec
    saveCanvas();
}
// This save function was copied from the following video https://www.youtube.com/watch?v=YoVJWZrS2WU&t=343s
function saveCanvas () {
    const a = document.createElement("a");
    document.body.appendChild(a); // we are going to add the URL to the anchortag
    a.href = paint.toDataURL();
    a.download = "userDesign.png";
    a.click(); // virtually click to download
    document.body.removeChild(a); // delete a to create new one each time
}

//Drawing function
function lineDraw(ctx,x1,y1,x2,y2,styleColor){
    ctx.beginPath();
    ctx.strokeStyle = styleColor;
    ctx.lineWidth = 5;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.shadowColor = styleColor;
    ctx.stroke();
    ctx.closePath()
}