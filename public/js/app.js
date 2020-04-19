console.log('js is running')


const w_form=document.getElementById('weatherform')
const search=document.querySelector('input')
w_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
   
    response.json().then((data)=>{
           if(data.error)
           {
               console.log(data.error)
               document.getElementById('textloc').innerHTML=data.error
           }
           else{
               console.log(data.location)
               console.log(data.temperature)
               console.log(data)
               document.getElementById('textloc').innerHTML='Its currently '+ data.temperature + ' degree celsius outside and feels like ' + data.feels_like + ' degree celsius ' + ' and location is ' + data.location 
           }
    })
})
    
    
})



