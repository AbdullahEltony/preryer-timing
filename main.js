const time = document.getElementById('time')
const date = document.getElementById('date')
const amType = document.getElementById('Am')
const pmType = document.getElementById('Pm')
const Days = document.querySelectorAll('#days  input')
const timingsPreter = document.querySelector('.timings__preyers')
weakDays = {
    sun:0,
    mon:1,
    tue:2,
    wen:3,
    thur:4,
    fri:5,
    sat:6
}

setInterval(()=>{
    const Time = new Date();
    let hours = Time.getHours();
    if(hours > 12) {
        pmType.checked = true;
        hours = hours - 12;
    }else {
        amType.checked = true;
    }
    
    let minuts = Time.getMinutes()
    if(minuts < 10) {
        minuts = "0" + minuts;
    }
    let day = Time.getDate();
    let month = Time.getMonth() + 1;
    let year = Time.getFullYear()
    let fullDate = `
        <span>${day}</span><span>${month}</span><span>${year}</span>
    `
    let fullTime = `
         <span>${hours}</span>:<span>${minuts}</span>
    `
    time.innerHTML =fullTime; 
    date.innerHTML = fullDate;

    Days.forEach(day=>{
        if(Time.getDay() == weakDays[`${day.getAttribute('id')}`]){
            day.checked = true;
        }
    })
        
},1000)

async function gettimings() {
    let timings = await fetch('https://api.aladhan.com/v1/timingsByCity/:date?city=EG-MN&country=Minya');
    timings = await timings.json();
    console.log(timings)
    renderData(timings.data.timings)
}
gettimings();
function renderData(times) {
   let time =`
            <p><b>Fajr</b> <span class="glow-text">${times.Fajr}</span><b>الفجر</b><br></p>
            <p><b>Sunrise</b> <span class="glow-text">${times.Sunrise}</span><b>الشروق</b><br></p>
            <p><b>Dhuhr</b> <span class="glow-text">${times.Dhuhr}</span><b>الظهر</b><br></p> 
            <p><b>Asr</b> <span class="glow-text">${times.Asr}</span><b>العصر</b><br></p>
            <p><b>maghrab</b> <span class="glow-text">${times.Maghrib}</span><b>المغرب</b><br></p>
            <p><b>Ishaa</b> <span class="glow-text">${times.Isha}</span><b>العشاء</b><br></p>
   `
   timingsPreter.innerHTML = time;
}