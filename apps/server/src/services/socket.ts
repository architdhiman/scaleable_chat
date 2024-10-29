import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
    host: "caching-391f243b-scalable-chatappkuchbhi.d.aivencloud.com",
    port: 23147,
    username: "default",
    password: "AVNS_qrbL4gdKZQwnhKHJ7BT"
})
const sub = new Redis({
    host: 'caching-391f243b-scalable-chatappkuchbhi.d.aivencloud.com',
    port: 23147,
    username: 'default',
    password: 'AVNS_qrbL4gdKZQwnhKHJ7BT'
})
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
        sub.subscribe("MESSAGES")
    }

    public initListener()
    {
        const io = this._io
        console.log("init socket listener..")
        io.on('connect', (socket)=>{
            console.log("new socket connected", socket.id)
            socket.on('event:message', async({message}:{message:string})=>{
                console.log("new message received", message)

                await pub.publish("MESSAGES", JSON.stringify({message}))
            })
        })

        sub.on('message', (channel,message)=>{
            if(channel=== "MESSAGES")
            {
                io.emit('message',message)
            }
        })
    }

    get io()
    {
        return this._io
    }
}

export default SocketService