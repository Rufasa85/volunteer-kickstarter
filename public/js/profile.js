console.log("linked!")
document.querySelector("#newEvent").addEventListener("submit",e=>{
    e.preventDefault()
    const oppObj = {
        title:document.querySelector("#title").value,
        description:document.querySelector("#description").value,
        date:document.querySelector("#date").value,
        volunteersNeeded:document.querySelector("#volunteersNeeded").value,
    }
    fetch("/api/opportunities",{
        method:"POST",
        body:JSON.stringify(oppObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
    console.log(oppObj);
})