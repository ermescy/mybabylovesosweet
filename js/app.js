const hamburger = document.querySelector('.header_hamburger');

const header = document.querySelector('.header');

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle('open');
    header.classList.toggle('active');

});





// time

function abso(a) { 
  return a - Math.floor(a);
}

function ten(x) {
  return x < 10 ? "0" + x : x;
}

const dy = document.getElementById("y");
const dm = document.getElementById("m");
const dw = document.getElementById("w");
const d = document.getElementById("d");
const dhr = document.getElementById("hr");
const dmin = document.getElementById("min");
const dsec = document.getElementById("sec");

function getCurrentTime() {
  const startDate = new Date("2023-12-27T00:00:00");
  const now = new Date();
  let msElapsed = now - startDate;

  // Calculate total elapsed time
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    let prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonth;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  dy.innerText = ten(years);
  dm.innerText = ten(months);
  d.innerText = ten(days);

  // Ensure weeks reset to 0 and days reflect exact remaining days
  let remainingDays = days % 7;
  let weeks = Math.floor(days / 7);
  
  dw.innerText = ten(weeks === 0 ? 0 : weeks);
  d.innerText = ten(remainingDays === 0 ? 7 : remainingDays);

  // Calculate hours, minutes, and seconds
  const hrM = abso(msElapsed / (24 * 3600 * 1000)) * 24;
  const hr = Math.floor(hrM);
  const minM = abso(hrM) * 60;
  const min = Math.floor(minM);
  const secM = abso(minM) * 60;
  const sec = Math.floor(secM);

  dhr.innerText = ten(hr);
  dmin.innerText = ten(min);
  dsec.innerText = ten(sec);
}

window.setInterval(getCurrentTime, 1000);
getCurrentTime(); // Initial call to prevent a 1-second delay




// scroll

const scroll = document.querySelector(".scroll");

window.addEventListener('scroll',function(){
    const h = document.documentElement.clientHeight *0.5;
   if(window.scrollY > h){
    scroll.classList.remove('inactive-scroll');
       scroll.classList.add('active-scroll');
   }else{
        scroll.classList.remove('active-scroll');
        scroll.classList.add('inactive-scroll');
    
   }
   
})

// spinner

const spinner = document.querySelector('.spinning')
const spinBtn = document.querySelector('.spin-con button')


spinBtn.addEventListener('click',spinWheel)
let  deg = 0;
let newDeg= null;
let prize ;
function spinWheel(){
  let rotateDeg = deg +( (Math.random() * 1000) + 3333) ;
  console.log(rotateDeg)
  let pureDeg = rotateDeg%360;
 
  pureDeg = changeDeg(pureDeg,rotateDeg);
  
  checkDeg(pureDeg);
 if(newDeg) rotateDeg = newDeg;
 console.log(rotateDeg)
  console.log(prize)
  spinBtn.removeEventListener('click',spinWheel)
  spinner.style.transform = `rotate(${rotateDeg}deg)`;
deg = rotateDeg;
newDeg = null;
  setTimeout(function(){
    let winner = document.querySelector(`.spin-con_content:nth-of-type(${prize})`)
    let infoSpin = document.querySelector('.spin-info')
    winner.classList.add('won');
    let wItem = winner.children[0].innerText;
    if(wItem.length<6)wItem = 'a ' + wItem;
    infoSpin.innerText=`Congrats Bae, you will get ${wItem}!`
    // spinBtn.addEventListener('click',spinWheel)
  },5000)
}


function changeDeg(deg,rotateD){
  let degArr = [20.5,69.5,114,159,203,249,293,339.5];
  for (i=0;i<degArr.length;i++){
    if(deg>degArr[i] && deg<(degArr[i]+3)){
      newDeg = rotateD + 8;
      return deg + 8;
    }
    if(deg<degArr[i] && deg>(degArr[i]-3)){
      newDeg = rotateD - 8;
      return deg - 8;
    } 

  }
  return deg;
}

function checkDeg(deg){
   // 20.5,69.5,114,159,203,249,293,339.5
  if(deg>20.5 && deg<69.5){
    prize = '8';
  }else if(deg>69.5 && deg<114){
    prize = '7';
  }else if(deg>114 && deg<159){
    prize = '6';
  }else if(deg>159 && deg<203){
    prize = '5';
  }else if(deg>203 && deg<249){
    prize = '4';
  }else if(deg>249 && deg<293){
    prize = '3';
  }else if(deg>293 && deg<339.5){
    prize = '2';
  }else {
    prize = '1';
  }
}


// gallery zoom

const photosArr = document.querySelectorAll('.gal-box span') ;
const galOv = document.querySelector('.gal-big');
const galOvImg = document.querySelector('.gal-big img');

galOv.addEventListener('click',function(e){
  if(e.target==this){
    galOv.classList.remove('show-galbig');
  }
})

photosArr.forEach((p)=>{
  p.addEventListener('click',function(){
    let src = p.children[0].getAttribute('src');
    galOvImg.setAttribute('src',src)
    galOv.classList.add('show-galbig')
  })
})