const prisma = require("../config/prisma")

exports.create = async(req,res)=>{
    try{
        // code
        const { name } = req.body
        const category = await prisma.category.create({
            data:{
                name: name
            }
        })
        return res.send(category)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error" })
        return;
    }
}
exports.list = async(req,res)=>{
    try{
        // code
        const category = await prisma.category.findMany()
        return res.send(category)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error" })
        return;
    }
}
exports.remove = async(req,res)=>{
    try{
        // code
        const { id } = req.params
        const category = await prisma.category.delete({
            where:{ 
                id: Number(id)
             }
        })
        return res.send(category)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error" })
        return;
    }
}