//inicio
mongod
mongo

//mostrar todas bases de dados
show dbs 

//Usar uma base de dados, mesmo que ela não exista pode ser usado o comando. USE
use db_finance
use curso_mongo

//Mostra em qual base você está
db

//Criando, exibir e apagando Collections (para apagar , você precisa estar no banco selecionado)
db.createCollection('billingcycles')
db.createCollection('aluno')
show collections
db.billingcycles.drop()
db.aluno.drop()


////////////////////////////////////////////////// inserts

db.billingcycles.insert({ name: "Janeiro17", month: 1, years: 2017 });

db.aluno.insert({ 
    "name" : "Maria",
    "idade" : 25,
    "sexo" : "F",
    "cpf" : "543.985.789-30",
    "rg" : "897.624.89-96",
    "matricula" : "kouc1258"
 });



////////////////////////////////////////////////  inserts  com listas
db.billingcycles.insert({
    name: "Março17",
    month: 3,
    years: 2017,
    credits: [
        { name: "Salário", value: 5000 }
    ],
    debtis: [
        { name: "Luz", value: 100, status: "PAGO" },
        { name: "Telefone", value: 100, status: "PENDENTE" }
    ]
});

db.aluno.insert({
    "name" : "Fernanda",
    "idade" : 32,
    "sexo" : "F",
    "cpf" : "543.985.789-30",
    "rg" : "897.624.89-96",
    "matricula" : "hdfuc1258",
    "curso_interesse" : [ 
        {
            "name" : "Desenvolvedor NodeJS"
        }, 
        {
            "name" : "Desenvolvedor WEB - Crie 6 projetos do zero"
        }
    ]
 });
///////////////////////////////////////////    Consultas SELECT

db.billingcycles.find()
db.aluno.find().pretty()
db.billingcycles.findOne()
db.billingcycles.findOne({ month: 2 })
db.billingcycles.find({ $or: [{ month: 1 }, { month: 2 }] }).pretty()
db.billingcycles.find({ credits: { $exists: true } }).pretty()
db.billingcycles.find({ credits: { $exists: true } },{_id:0, name:1}).pretty()
db.billingcycles.find({ years: 2017 })
db.billingcycles.find({ years: 2017 }).skip(1)
db.billingcycles.find({ years: 2017 }).skip(1).limit(1)

/////////////////////////////////////////////////////////// OPERADORES LOGICOS -  /////////////////////////////////////////////////////////

$eq("="), $gte(">="), $gt(">"), $lt("<"), $lte("<="), $ne("!=");

// and >> (SELECT * FROM ALUNO WHERE SEXO = 'F' AND IDADE > 30 ")
{
	sexo:{$eq:'F'},
	idade:{$gt:30}
}
	
EX.: db.getCollection('aluno').find({
       sexo:{$eq:'F'},
       idade:{$gt:30}
    });

// OR >> (SELECT * FROM ALUNO WHERE SEXO = 'F' or IDADE > 30 ")
{
	$or:[
	    {sexo:{$eq:'F'}},
	    {idade:{$gt:30}}
	]
}

Ex.: db.getCollection('aluno').find({
      $or:[
	    {sexo:{$eq:'F'}},
	    {idade:{$gt:30}}
	]
    });

// IN/NOT IN >> (SELECT * FROM tickets WHERE _id in (1151,568,66))  para not in  / $nin 
db.getCollection('tickets').find({ '_id': {$in:[
    ObjectId("592ba968fdba133951ae0418"),
    ObjectId("592ba967fdba133951ae0417"),
    ObjectId("592ba968fdba133951ae0419")
 ]}});

////////////ILIKE %%  o 'i' no final é ignore case
db.getCollection('tags').find({ name: /D/i })

/////////////////////////////////////////////////////////// update

db.aluno.update(
{'parametros para condições a serem executadas tipo (WHERE e AND)'},
{$set:{'os campos com os novos valores a serem inseridos'},
{multi:true} // OBS.: O campo (multi:true) atualiza todos os documentos com base nos parametros informados, se for 'false' ele só irá autalizar o primeiro registro que encontrar. Padrão é FALSE
)

Ex.: db.aluno.update(
	{nome: 'Jorge'},
	{
		$set:{sexo:'Masculino', idade:29}
	}
})

Ex.: db.getCollection('aluno').update(
        {sexo: 'F'},
	{
            $set:{sexo:'Feminino', idade:29}
	},
        {
            multi:true
        }
    )

Ex.: db.getCollection('aluno').update(
        {$and: [{sexo: 'Feminino'},{idade:{$lte:30}}]},
	{
            $set:{sexo:'X', idade:29}
	},
        {
            multi:true
        }
    )

Ex.: db.billingcycles.update({$and: [{ month: 1}, { years: 2017 }] }, {$set:{credits:[{name:"Salário", value:5000}]}})
//USANDO ID
Ex.: db.experiences.update({"_id" : ObjectId("58f651417b8a61601690c546")},{$set: {name: 'aaa'}})

////////////////////////// REMOVER ou add um novo campo no documento (upsert:false) não cria um novo doc. se for TRUE criará  outro doc.
db.getCollection('tags').update({},{$set : {system:NumberInt(1)}},{upsert:false, multi:true})
db.getCollection('experiences').update({}, {$unset: {tag:'none'}}, false, true);


////////////////////////////////////////////////save - O SAVE muda o documento quando se passa a chave. Do contrario ele faz insert também.
db.billingcycles.save({ name: "xxxx", month: 5, years: 2020 })
db.billingcycles.save( {"_id" : ObjectId("58e2460ca591954402d36ef4"), "name":"Filipe"})
db.billingcycles.save({"_id" : ObjectId("58e2460ca591954402d36ef4"), "name": "xxxx", "month": 5, "years": 2020 })



////////////////////////////////////////////// REMOVE

db.billingcycles.count()
db.billingcycles.remove({month:2}) // exclui todos os que ele encontrar com mes = 2
db.billingcycles.remove({years:2017},1) // exclui o primeiro registro que ele encontrar

db.dropDatabase();



//Aggregate

db.billingcycles.aggregate([{
    $project: {
        credit: { $sum: "$credits.value" },
        debt: { $sum: "$debtis.value" }
    },
},
{
    $group: {
        _id: null,
        credt: { $sum: "$credit" },
        debt: { $sum: "$debt" }
    }
}])























/////////////////////////////////////////////////////////  use theglint  ///////////////////////////////////////////////////////////////////////////////////////////////////////////


db.users.find().pretty()
db.experiences.find().pretty()
db.experiences.find({"startTime" : ISODate("2017-10-05T03:00:00Z"), 'deleted' : 0, 'status': 'published'}).pretty()


db.notifications.remove({type: "email"})
db.notifications.remove({"recipient" : ObjectId("59137c3fe7e6ddd41f105e6d")}) 

db.users.remove({email:"fsbvieira@gmail.com"})
db.users.remove({email:"fsbvieiragame@gmail.com"})

MKLINK /D "C:\Repositories\Sisnet\theglint-backend\theglint-app-server\node_modules\theglint-core" "C:\Repositories\Sisnet\theglint-backend\theglint-core"
 


//UPDATE com ID
db.experiences.update({"_id" : ObjectId("59078a1083928580064deff0")},{$set: {status: 'published'}})
db.experiences.remove({"_id" : ObjectId("58f651417b8a61601690c546")})


db.users.update({"_id" : ObjectId("59133c16e7e6ddd41f105e6c")},{$set: {"createdOn" : ISODate("2017-05-02T16:13:10.787Z")}})
db.users.update({  email:"filipeicr@hotmail.com"  },{$set: {"createdOn" : ISODate("2017-05-01T16:13:10.787Z")}})
db.users.update({  email:"filipe@sisnet.com.br"  },{$set: {"createdOn" : ISODate("2017-05-01T16:13:10.787Z")}})
git clone -b dev/filipe https://github.com/sisnetglobal/theglint-backend.git


