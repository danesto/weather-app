window.addEventListener('load',()=>{
    let long;
    let lat;

    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let timezoneCity=document.querySelector('.city h1');
    let temperatureSection=document.querySelector('.temperature');
    let metric=document.querySelector('.metric');

    let max=document.querySelector('.max span');
    let low=document.querySelector('.low span');

    let lowMetric=document.querySelector('#lowMetric');
    let maxMetric=document.querySelector('#maxMetric');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            // console.log(position);
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const proxy='http://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/4b8229e89f3f65b3c07ffa2e828524da/${lat},${long}`;
            
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    const {temperatureHigh,temperatureLow}=data.daily.data[0];
                    max.textContent=Math.round(temperatureHigh);
                    low.textContent=Math.round(temperatureLow);

                    const {temperature,summary,icon} = data.currently;
                    temperatureDescription.textContent=summary;
                    temperatureDegree.textContent=Math.round(temperature);
                    timezoneCity.textContent=data.timezone;
                    setIcon(icon, document.querySelector('.icon'));
                    
                    // Tempterature in celsius
                    celsius=(temperature-32)*5/9;
                    // Low and Max in celsius
                    celsiusMax=(temperatureHigh-32)*5/9;
                    celsiusLow=(temperatureLow-32)*5/9;

                    temperatureDegree.addEventListener('click',() =>{
                        if(metric.textContent==="F"){
                            metric.textContent="C";
                            temperatureDegree.textContent=Math.round(celsius);

                            // MAX AND LOW
                            max.textContent=Math.round(celsiusMax);
                            low.textContent=Math.round(celsiusLow);

                            maxMetric.textContent='C';
                            lowMetric.textContent="C";
                        }else{
                            temperatureDegree.textContent=Math.round(temperature)
                            metric.textContent="F";

                            max.textContent=Math.round(temperatureHigh);
                            low.textContent=Math.round(temperatureLow);

                            maxMetric.textContent='F';
                            lowMetric.textContent='F';
                        }
                    })
                })
        });
    }
    function setIcon (icon, iconId){
        const skycons=new Skycons({"color":"#fff"});
        const currentIcon=icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconId,Skycons[currentIcon]);
    }
})