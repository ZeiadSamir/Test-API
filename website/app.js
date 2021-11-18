/* Global Variables */




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const  baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey = '&appid=7985060aa2d785ce5109ac2f8b43fb4d&units=imperial';
const zipCode = document.getElementById('zip').value;
const Feelings = document.getElementById('feelings').value;


// REF : Classroom asynchronous JavaScript => 6.Adding Fetch to Your Code

// async function using fetch to get data when calling API

const getWeather = async (baseURL, zip, key)=>{

    const zipCode = document.getElementById('zip').value;
    const Feelings = document.getElementById('feelings').value;
    const response = await fetch (baseURL+zipCode+APIKey)
    try{
        const data =await response.json();
        // console.log(data);
        return data;
    }catch(error){
        console.log("error", error);
    }
};

// event listen to getWeather function when click on generate button

document.getElementById('generate').addEventListener('click', doAction);

function doAction(e){

    getWeather(baseURL, zipCode, APIKey)
    // postReq('/all',{date:d, temp: data.temp})
    .then(function(data){
        // console.log(data);
        postReq('/add',{date: d, temp:data, content:document.getElementById('feelings').value});
        updateUI();


    })

};

// REF : Classroom => HTTP requests & routes => 6.Client Side, Server Side
const postReq = async (url='', data = [])=>{

    // console.log(data);
    const response = await fetch (url, {
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log('error', error);
    }
}


const updateUI = async ()=> {

    const request = await fetch('/all');
    try {
        const allData = await request.json()
        console.log(allData);

        const temp = allData.temp.main.temp;
        //console.log(typeof(temp));

        // console.log(temp);
        document.getElementById('date').innerHTML = `date : ${d}`;
        document.getElementById('temp').innerHTML = `temperature : ${temp} Fahrenheit `
        document.getElementById('content').innerHTML = `you feel ${document.getElementById('feelings').value} today.`;

    }catch(error){
        console.log('error', error);
    }
}




