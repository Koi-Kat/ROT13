const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');
const { strict } = require('assert');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function handleDefault(req, res) {
    res.status(200).sendFile('/home/user06/encrypt/public/index.html')
    path.resolve('../public')
};

app.get('/', handleDefault);

function rotate(s) {

    if(s == " "){
        return s;
    }
    else{;
        var uniNum = String(s).charCodeAt(0) // -> unicode value
        //makes charCode a number called uninum that then has 10 added to it
        if(uniNum < 113)
        {
            uniNum += 10;
        }
        else
        {
            move = (122 - uniNum)+1;
            uniNum = 97 + 10-move;
        }
        //add a loop for after 'q'
        finalS = String.fromCharCode(uniNum) // -> back to char
        //returns the uniNum number back to a character
        // charcodeat = unicode value to put it into
        //his has str, so I somehow need to put whatever s is to be string
        //from the original char
        return finalS;
    }
}

app.get('/encrypt', (request, response) => {
    var plaintext = request.query.plaintext;
    var ciphertext = '';

    for(var n=0; n < plaintext.length; n++) {
        ciphertext += rotate(plaintext[n].toLowerCase())
    }

    response.status(200).send(ciphertext);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});