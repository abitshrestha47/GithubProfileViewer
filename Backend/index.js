const express=require('express');
const axios=require('axios');
const cors=require('cors');

const app=express();
app.use(cors());

const port=3001;

//async for waiting the get to terminate/complete 
app.get('/api/user/:username',async(req,res)=>{
    const username=req.params.username;
    try{
        chttps://github.com/abitshrestha47/GithubProfileViewer/tree/master/Backendonsole.log('check');
        //axios for the managing of apis
        const response=await axios.get(`https://api.github.com/users/${username}`);
        //for retrieving the data portion only from the header and payload portion
        const data=response.data;
        res.json(data);
        console.log('data sent');
    }catch(error){
        console.log(error);
    };
});

app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}`);
})