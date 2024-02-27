var form = document.getElementById("myForm");
    imgInput = document.querySelector(".img");
    file = document.getElementById("imgInput");
    userName = document.getElementById("userName");
    age = document.getElementById("age");
    city = document.getElementById("city");
    email = document.getElementById("email");
    phone = document.getElementById("phone");
    post = document.getElementById("post");
    dobDate = document.getElementById("dobDate");
    submitBtn = document.querySelector(".submit")
    userInfo = document.getElementById("data")
    modal = document.getElementById("userForm")
    headingEl = document.getElementById("heading")
    modalTitle = document.querySelector("#userForm .modal-title")

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

file.onchange = function(){
    if(file.files[0].size < 1000000){
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result;
            imgInput.src = imgUrl
        }
        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large")
    }
   
}

function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach((info)=>info.remove())
    getData.forEach((element,index)=>{
        let createElement = `<tr class="employeeDetails">
                                <td>${index+1}</td>
                                <td><img src="${element.picture}" width="50" height="50"></td>
                                <td>${element.employeeName}</td>
                                <td>${element.employeeAge}</td>
                                <td>${element.employeeCity}</td>
                                <td>${element.employeeEmail}</td>
                                <td>${element.employeePhone}</td>
                                <td>${element.employeePost}</td>
                                <td>${element.dob}</td>
                                <td>
                                     <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#readData" onclick="readInfo('${element.picture}','${element.employeeName}',
                                     '${element.employeeAge}','${element.employeeCity}','${element.employeeEmail}','${element.employeePhone}','${element.employeePost}','${element.dob}')"><i class="bi bi-eye"></i></button>

                                     <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userForm" onclick="editInfo(${index},'${element.picture}','${element.employeeName}',
                                     '${element.employeeAge}','${element.employeeCity}','${element.employeeEmail}','${element.employeePhone}','${element.employeePost}','${element.dob}')"><i class="bi bi-pencil-square"></i></button>
                                     
                                    <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>

                                </td>
                            </tr>`

        userInfo.innerHTML += createElement
    })
}

function readInfo(pic,name,age,city,email,phone,post,dob){
    document.getElementById("showImg").src = pic;
    document.getElementById("showName").value = name;
    document.getElementById("showAge").value = age;
    document.getElementById("showCity").value = city;
    document.getElementById("showEmail").value = email;
    document.getElementById("showPhone").value = phone;
    document.getElementById("showPost").value = post;
    document.getElementById("showDate").value = dob;

}

function deleteInfo(index){
    if(confirm("Are you sure you want to delete?")){
        getData.splice(index,1)
        localStorage.setItem("userProfile",JSON.stringify(getData))
        showInfo()
    }
}


function editInfo(index,pic,name,ageValue,cityName,emailId,phonenumber,position,dob){
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    age.value = ageValue
    city.value = cityName
    email.value = emailId
    phone.value = phonenumber
    post.value = position
    dobDate.value = dob
    submitBtn.textContent = "Update"
    headingEl.textContent = "Update the Form"
}


form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const information = {
        picture : imgInput.src == undefined ? "person.png" : imgInput.src,
        employeeName : userName.value,
        employeeAge : age.value,
        employeeCity : city.value,
        employeeEmail : email.value,
        employeePhone : phone.value,
        employeePost : post.value,
        dob : dobDate.value,
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile',JSON.stringify(getData))
    form.reset()
    showInfo()
    imgInput.src = "person.png"
    modal.style.display = "none";
    document.querySelector(".modal-backdrop").remove()

})