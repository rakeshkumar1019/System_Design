import { createClient } from "redis";

const client = createClient();

async function main() {
    await client.connect();
    while(1){
        const response = await client.brPop("submissions",0)//block rpop =>wait infinite time till some push happens 
        console.log(response);
        //run user code
        await new Promise((resolve)=>setTimeout(resolve,1000))
        //send to the pub sub
        console.log("Processed user submisson!!")
    }
}
main()
