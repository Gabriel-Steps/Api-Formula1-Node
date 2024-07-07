import fastify from "fastify";
import { StatusCode } from "./utils/status-code";
import { ApplicationType } from "./utils/application";
import { DriverParams } from "./models/driver-model";
import cors from "@fastify/cors";

const server = fastify({logger: true});
server.register(cors, {
    origin: "*"
})

const teams = [
    {id: 1,name: "MacLaren", base: "Woking, United Kigdom"},
    {id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
    {id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom"},
];
const drivers = [
    {id: 1,name: "Max Vesrtappen", team: "Red Bull Racing"},
    {id: 2,name: "Lewis Hamilton", team: "Ferrari"},
    {id: 3,name: "Lando Norris", team: "McLaren"}, 
];

server.get("/teams",async(request,response) =>{
    response.type(ApplicationType.JSON).code(StatusCode.OK);

    return {teams};
});

server.get("/drivers",async(request,response) => {
    response.type(ApplicationType.JSON).code(StatusCode.OK);
    return {drivers};
});

server.get<{Params: DriverParams}>("/drivers/:id", async(request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);
    if(!driver){
        response.type(ApplicationType.JSON).code(StatusCode.NOT_FOUND);
        return { message: "Driver not found!"};
    }else{
        response.type(ApplicationType.JSON).code(StatusCode.OK);
        return {driver};
    }
});

server.listen({port: 3333}, () =>{
    console.log("Server init");
});