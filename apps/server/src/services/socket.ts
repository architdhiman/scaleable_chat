import { Server } from "socket.io";

class SocketService{
    private _io:Server

    constructor()
    {
        console.log("socket created init service")
        this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin:"*"
            }
        })
    }

    public initListener()
    {
        const io = this._io
        console.log("init socket listener..")
        io.on('connect', (socket)=>{
            console.log("new socket connected", socket.id)
            socket.on('event:message', async({message}:{message:string})=>{
                console.log("new message received", message)
            })
        })
    }

    get io()
    {
        return this._io
    }
}

export default SocketService