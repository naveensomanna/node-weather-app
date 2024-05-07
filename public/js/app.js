



const input=document.getElementsByTagName("input");
const btn=document.getElementsByTagName("button");


const message1=document.querySelector("#message-1");
const message2=document.querySelector("#message-2");



btn[0].addEventListener("click",function(e){
    message1.innerText="Loading.....";
    message2.innerText="";
    fetch(`http://localhost:3000/weather?address=${input[0].value}`).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            message1.innerText=data.error;
        }else{
            message1.innerText=data.location;
            message2.innerText=data.foreCast;
            input[0].value="";
        }
    })
})
})

