var mongoClient = require('mongodb').MongoClient; //mongodb://erik:a123456@ds251245.mlab.com:51245/chat-data  [ds135433.mlab.com:35433]
mongoClient.connect("mongodb://erik:erik123@ds135433.mlab.com:35433/chatdb",
    function (err, conn) {
        if (err) return console.log('Não conectou ao banco\n' + err);
        global.db = conn.db('chatdb');
    });

function saveUser(name, lastName, passWord, callback) {
    global.db.collection('user').insert({ name, lastName, passWord }, function (err, result) {
        if (err) return console.log("algo deu errado" + err);
        callback();
    });
}

function getUser(name, callback) {
    global.db.collection('user').find({ $or: [{ name: name }, { lastName: name }] }).toArray(
        function (err, docs) {
            if (err) return console.log("algo deu errado" + err);
            callback(docs);
        }
    );
}

function chekUser(logName, logLastName, callback) {
    global.db.collection('user').find({ name: logName, lastName: logLastName }).count(function (err, docs) {
        if (err) return console.log("algo deu errado" + err);
        callback(docs);

    });
}

function chekPasswordUser(logName, logLastName, logPassword, callback) {
    global.db.collection('user').find({ name: logName, lastName: logLastName, passWord: logPassword }).count(function (err, docs) {
        if (err) return console.log("algo deu errado" + err);
        callback(docs);
    });
}

function getChat(nameChat, nameUser, callback) {
    global.db.collection('chatUsers').find({ 
        $or: [ 
            { $and : [ { nameChat: nameChat }, { nameUser: nameUser } ] },
            { $and : [ { nameUser: nameChat }, { nameChat: nameUser } ] }
        ]
    }).sort({date: 1}).toArray(
        function (err, docs) {
            if (err) return console.log("algo deu errado" + err);
            callback(docs);
        }
    );
}

function setMsg(nameChat, nameUser, txtMsg, callback){
    global.db.collection('chatUsers').insert({ nameChat: nameChat, nameUser: nameUser, date: new Date(), msg: txtMsg }, 
        function (err, docs) {
            if (err) return console.log("algo deu errado" + err);

                global.db.collection('chatUsers').find({ 
                    $or: [ 
                        { $and : [ { nameChat: nameChat }, { nameUser: nameUser } ] },
                        { $and : [ { nameUser: nameChat }, { nameChat: nameUser } ] }
                        ]
                }).sort({date: 1}).toArray(
                    function (err, docs) {
                    if (err) return console.log("algo deu errado" + err);
                    callback(docs);
                }
                );
        }
    );   
}

function exitChat(callback) {

}

module.exports = { saveUser, getUser, chekUser, chekPasswordUser, exitChat, getChat, setMsg }

