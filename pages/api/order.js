// api to handle reequest from client to server.

import {client} from '../../lib/client'

export default async function handler(req,res) {
    switch (req.method) {
        case "POST":
            const newOrder = await JSON.parse(req.body); //getting newOrder when u click the place order button in Modal of cart
            try {
                await client.create({
                    _type: "order",
                    name: newOrder.name,
                    phone: newOrder.phone,
                    address: newOrder.address,
                    total: newOrder.total,
                    method: newOrder.method,  //which payment method
                    status: 1 //for cooking,
                }).then((data) => {   //obtained data,send with its id
                    res.status(200).json(data._id);
                })
            } catch (error) {
                console.log(error);
                res.status(500).json({msg: "Error Occurred, Check your console"});
            }
            break;
    }
}