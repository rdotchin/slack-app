var Slack = require('slack-node');
var express = require('express');
var url = require('url');
var app = express();
var request = require('request');




////////////// THE SETUP ///////////////////////////////////////////


app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'))
app.get('/', function(request, response) {
    var urlObject = url.parse(request.url,true).query
    getGif(urlObject);
}); //app.get

    /*

    var urlObject =
    {
        "token":"bTeQkkma7XQfffFywrOdLAp",
        "team_id":"T3CH65SSSS0",
        "team_domain":"slack-js",
        "channel_id":"C3C235JS0",
        "channel_name":"general",
        "user_id":"U3D2342TG",
        "user_name":"leon",
        "command":"/foobar",
        "text":"catfish",
        "response_url":"https://hooks.slack.com/commands/T44H65ES0/13333098677718/zdrhmyaaaeBwYrRrDDlcwHYrmD2V3"
    }


    */


/////////////// THE SEND MESSAGE //////////////////////////////////////////


function getGif(urlObject){

    slack = new Slack();
    slack.setWebhook(urlObject.response_url);

    //   /mySlashCommand catfish    'catfish' is stored in var userCommand
    var userCommand = urlObject.text;

    // API call
    request('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC', function (error, response, body) {

        var giphy_url = JSON.parse(body).data[0].images.fixed_height.url;
        console.log(giphy_url);

        slack.webhook({
         channel: urlObject.channel_name,
         attachments: [
            {"image_url": giphy_url} // the response back to slack
         ]    
        }, function(err, response) {
            if (err){
                console.log(err)
            }
        })//webhook

    })//request

} //getGif