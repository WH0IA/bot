const TelegramApi = require('node-telegram-bot-api')

const token = '5057479971:AAGfRmHycEhBw8pEHNIZv81Ayifws3qXZZI'

const bot = new TelegramApi(token ,{polling:true})

const http = require('http')
const fs  = require('fs')

const chats = {}

async function getWeather(chatId,city){
  http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=299a04aaaa8058639e479e39607c97a5`, function (response) {   
    var buffer = "", 
        data,
        route;
  
    response.on("data", function (chunk) {
        buffer += chunk;
    }); 
    response.on("end",  function (err) {
        data = JSON.parse(buffer);
        if(data.message == 'city not found'){
          return bot.sendMessage(chatId,`Я не знаю такого города, попробуй другой`)
        }
        console.log(data)
        let temperature = data.main.temp
        return bot.sendMessage(chatId,`Сейчас температура в городе ${city} равна ${Math.round(temperature - 273)} ❄`) 
    }); 
  }); 
}

const file = JSON.parse(fs.readFileSync('russia.json','utf-8'))

const Options = {
  reply_markup:{
    keyboard:[
      ["Узнать погоду"]
    ]
  }
}
const kOptions = {
  reply_markup:{
    keyboard:[
      ['']
    ]
  }
}

const startGame = async ( chatId) => {
  await bot.sendMessage(chatId, 'Угадай число от "0" до "9"')
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber
  await bot.sendMessage(chatId , 'Отгадывай' , gameOptions)
}

const start = () => {
  bot.setMyCommands([
    {command:'/start' , description:'Запуск бота'},
    {command:'/info' , description:'Получить информацию о погоде'},
  ])
  
  bot.on('message' , async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    if(text == '/start'){
      return bot.sendMessage(chatId, 'Добро пожаловать \u270B \nЗдесь ты можешь получить информацию о погоде \u2601 ',Options)
    }
    if(text == '/info'){
      return bot.sendMessage(chatId, 'Здесь ты найдешь информацию')
    }
    if(text == 'Узнать погоду'){
      return bot.sendMessage(chatId,'Напиши название города 🌆\nКак на примере - Moscow',kOptions)
    }
    return getWeather(chatId,text)
  })

  bot.on('callback_query' , async (msg) => {
    const data = msg.data
    const chatId = msg.message.chat.id
    console.log(chats)
    console.log(chatId , data)
    if(data === '/again'){
      return startGame(chatId)
    }
    if(data == chats[chatId]){
      return bot.sendMessage(chatId , 'Ты угадал' , againOptions)
    }else{
      return bot.sendMessage(chatId , 'Не угадал' , againOptions)
    }
  })
}

start()