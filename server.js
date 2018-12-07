const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const database={
	Users:[
		{
			id:"123",
			name:"Rajat",
			email:"rajat@gmail.com",
			password:"bread",
			joining: new Date(),
			entries:0
		},
		{
			id:"124",
			name:"Rajan",
			email:"rajan@gmail.com",
			password:"shake",
			joining: new Date(),
			entries:0
		},
		{
			id:"125",
			name:"User",
			email:"user@gmail.com",
			password:"password",
			joining: new Date(),
			entries:0
		},
		{
			id:"126",
			name:"John",
			email:"john@gmail.com",
			password:"123",
			joining: new Date(),
			entries:0
		}

	]
};




const app=express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send(database.Users);
});


app.post('/signin',(req,res)=>{
	let userExist=false;
	database.Users.map(user=>{
		if(req.body.email===user.email && req.body.password===user.password){
			userExist=true;
			res.send(user);
		}
	});
	if(userExist===false){
		res.status(400).json("user not exist, please register...");
	}
});

app.post('/register',(req,res)=>{
	let registered=false;
	let currId =Number(database.Users[(database.Users.length)-1].id);
	currId++;

	database.Users.map(user=>{
		if(req.body.email===user.email && req.body.password===user.password){
			registered=true;
			res.json("already registered");
		}
	});

	if(registered===false && req.body.name && req.body.email && req.body.name){

		database.Users.push({
			id:String(currId),
			email:req.body.email,
			password:req.body.password,
			joining: new Date(),
			entries:0,
			name:req.body.name
		});
		res.send(database.Users[(database.Users.length)-1]);
		
	}

});


app.put('/image',(req,res)=>{
	

		
			
		database.Users.forEach(user=>{
			if(user.email===req.body.user.email && user.password===req.body.user.password){
				user.entries=req.body.user.entries;
				res.send(user);
			}
		});


	
	


});

app.listen(process.env.PORT || 3001,()=>{
	console.log(`listening to port ${process.env.PORT}`);
});
