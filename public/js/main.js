document.querySelector("#logoutBtn").addEventListener("click",e=>{
    fetch("/api/volunteers/logout",{
        method:"DELETE",
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})