let myleads=[]
const saveBtn=document.getElementById("save-btn")
const inpBtn=document.getElementById("input-el")
const ulEL=document.getElementById("ul-el")
const delBtn=document.getElementById("del-btn")
const leadsStorage=JSON.parse(localStorage.getItem("myLeads"))
const tabBtn=document.getElementById("tab-btn")
// let num1=document.getElementById("cal-in1")
// let num2=document.getElementById("cal-in2")
// let res
if(leadsStorage){
    myleads=leadsStorage
    render(myleads)
}

tabBtn.addEventListener('click',function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myleads))
        render(myleads)
    })
})

function render(leads){
    let listItems=''
    for(let i=0;i<leads.length;i++){
        listItems+=`
        <li>
            <a target='_blank' href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>
        `
    }
    ulEL.innerHTML=listItems
}

saveBtn.addEventListener('click',function(){
    myleads.push(inpBtn.value)
    inpBtn.value=""
    localStorage.setItem("myLeads",JSON.stringify(myleads))
    render(myleads)
})

delBtn.addEventListener('dblclick',function(){
    localStorage.clear()
    myleads=[]
    render(myleads)
})
// function add(){
//     return res=parseFloat(num1.value)+parseFloat(num2.value)
// }
// function sub(){
//     return res=parseFloat(num1.value)-parseFloat(num2.value)
// }
// function mul(){
//     return res=parseFloat(num1.value)*parseFloat(num2.value)
// }
// function div(){
//     return res=parseFloat(num1.value)/parseFloat(num2.value)
// }
// console.log(res)
// document.addEventListener('DOMContentLoaded', function () {
//     const convertBtn = document.getElementById('convertBtn')
//     convertBtn.addEventListener('click', function convertCurrency() {
//         const amount = document.getElementById('amount').value
//         amount.value=""
//         const exchangeRate = 83.33
//         const result = amount * exchangeRate
//         document.getElementById('result').innerText = `${amount} USD = ${result.toFixed(2)} INR`
//     })
// })
const convert=document.getElementById("convertBtn")
const amt=document.getElementById("amount")
const res=document.getElementById("result")
const clear=document.getElementById("clrBtn")
convert.addEventListener('click',function(){
    const rate=83.33
    const amtval=amt.value
    const result=amtval*rate.toFixed(2)
    res.innerText=`${amtval} USD = ${result} INR`
    amt.value=""
})
clear.addEventListener('click',function(){
    res.innerText=""
})
const convertInr=document.getElementById("convertBtnInr")
const amtInr=document.getElementById("amountInr")
const resInr=document.getElementById("resultInr")
const clearInr=document.getElementById("clrBtnInr")
convertInr.addEventListener('click',function(){
    const rate=83.33
    const amtvalInr=amtInr.value
    const resultInr=(amtvalInr/rate).toFixed(2)
    resInr.innerText=`${amtvalInr} INR = ${resultInr} USD`
    amtInr.value=""
})
clearInr.addEventListener('click',function(){
    resInr.innerText=""
})

document.addEventListener('DOMContentLoaded', function () {
    const checkWeatherBtn = document.getElementById('checkWeatherBtn');
    checkWeatherBtn.addEventListener('click', checkWeather);
});
async function checkWeather() {
    const apiKey = '63e20ad4cf1f880ab9fe8430bc2b83c8'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city.');
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found. Please enter a valid city name.');
            return;
        }
        const weatherInfo = document.getElementById('weatherInfo');
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        weatherInfo.innerHTML = `<p>Temperature: ${temperature} &#8451;</p><p>Description: ${description}</p>`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please try again.');
    }
}
