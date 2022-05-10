const allAttendBtns = document.querySelectorAll(".attendBtn");

allAttendBtns.forEach(butn=>{
    butn.addEventListener("click",e=>{
        const {userid,oppid} = e.target.dataset;
        console.log(userid,oppid)
        fetch(`/api/opportunities/${oppid}/addvolunteer/${userid}`,{
            method:"POST",
        }).then(res=>{
            if(res.ok){
                location.href=`/opps/${oppid}`
            } else {
                alert("trumpet sound")
            }
        })
    })
})

console.log("linked!")