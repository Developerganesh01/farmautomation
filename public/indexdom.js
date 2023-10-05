const ele=document.querySelector('.text');
const  generate=()=>{
    let value=Math.floor(Math.random()*3+5);
    ele.innerHTML=value;
}
setInterval(generate,1000);