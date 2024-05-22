const ul=document.querySelector('ul');
document.querySelector('#srch-btn').addEventListener('click',search)

function search(){
    const value = document.querySelector('#date').value;
    ul.innerHTML="";
    
    if(value){
        axios.get(`http://localhost:4000/getdate/${value}`)
        .then(result=>{
    console.log(result);
            if(result.data.length>0){
                const table=document.createElement('table');
                let html=`<tr>
                <th>ID</th>
                <th>Name</th>
                <th>Attendance</th>
            </tr>`;
                result.data.forEach(element => {
                    const status=element.attendances[0].present===true?"✅️":"❌️";
                    html+=`<tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${status}</td>
                </tr>`
                });
                table.innerHTML=html;
                ul.appendChild(table);
            }
            else{
                ul.innerHTML="";
                addElements(value);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}


function submitData(event,records,date){
    event.preventDefault();
    const arr=[];
    
    let check=false;
    for(let i=0;i<records.length;i++){
        const clas=`radio${records[i].id}`;
        const radioclass=document.querySelectorAll(`.${clas}`);
        check=false;
        for(let j=0;j<radioclass.length;j++){
            if(radioclass[j].checked===true){
                const str= `${records[i].id}_${j===0?'true':'false'}`;
                arr.push(str);
                check=true;
                continue;
            }

        }
        if (!check)break;
    }
    if(check){
        axios.post(`http://localhost:4000/postattendance`,{date:date,data:arr})
        .then(result=>{

            
            if(result.status===201){
                search();
            }
            else{
                alert("Something Wrong with Database")
            }
        })
      
    }
    else{
        alert("Choose All Buttons");
        
    }
    
}

function addElements(date){
    axios.get(`http://localhost:4000/getstudent`)
    .then(result=>{
        
        if(result.data.length>0){
            const form =document.createElement('form');

             form.onsubmit=(event)=>{
                submitData(event,result.data,date)
             }
            ul.appendChild(form);
            
            const table=document.createElement('table');
                let html=`<tr>
                <th>ID</th>
                <th>Name</th>
                <th>Attendance</th>
                <th> </th>
            </tr>`;

            result.data.forEach(element=>{

                html+=`
                <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td><label for="True">Present</label>
                <input type="radio" name='radio_${element.id}' value="true" class="radio${element.id}"/></td>
                <td><label for="True">Absent</label>
                <input type="radio" name="radio_${element.id}" value="false" class="radio${element.id}"/></td>
                </tr>
                `
            })

            table.innerHTML=html;
            form.appendChild(table);
            const button=document.createElement('button');
            button.textContent="Mark Attendance";
            button.setAttribute('id','submit');
            button.type='submit';
            form.appendChild(button);

            }
    })
    .catch(err=>console.log(err))

}

document.querySelector('#fetch-btn').addEventListener('click',()=>{
    axios.get("http://localhost:4000/getreport")
    .then(result=>{
        console.log(result);
       displayReport(result.data);
    })
    .catch(err=>console.log(err))
})


function displayReport(data){
    ul.innerHTML="";
    if(data.length>0){
        const table=document.createElement('table');
                let html=`<tr>
                <th>ID</th>
                <th>Name</th>
                <th>Attendance Counts</th>
                <th>Attendance Percent</th>
            </tr>`;
    data.forEach(element=>{
        html+=`<tr>
                <td>${element.id}</th>
                <td>${element.name}</th>
                <td>${element.days}</th>
                <td>${element.percent==null?0:element.percent}%</th>
            </tr>`
    })
    table.innerHTML=html;
    ul.appendChild(table);}

}

