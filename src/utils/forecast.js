const request = require('request')

const forecast = (address,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d4952d0e223f88c6d24ff39cc6d4d146&query=' + address

    request({ url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect weather services!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined, {
                temperature: "It currently " + body.current.temperature + " degree celcius",
                location: body.location.name
            })
        }
    })
}

module.exports = forecast