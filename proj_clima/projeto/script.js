document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); // Previne o comportamento pradão

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfo();
        shoWarning('Carregando ...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;

        // Executa a requisição
        let results  = await fetch(url);
        // Transforma em objeto, com o resultado inteiro
        let json = await results.json(); 

        //Verifica se a localização existe
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            shoWarning('Não encontramos esse localização. Recarregando a página...')

            setTimeout(function(){    
                reloadPage();
            }, 2800)
        }

    }else{
        let avisoVazio = document.querySelector('.avisoVazio').innerHTML = 'Espaço em vazio, digite alguma localização. Recarregando a página...';

        setTimeout(function(){    
            reloadPage();
        }, 3000)
    }
});

//Exibir informação
function showInfo(json){
    shoWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
}

function reloadPage() {
    window.location.reload();
}

function clearInfo(){
    shoWarning('');
    document.querySelector('.resultado').style.display = 'none';
};

function shoWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
};

