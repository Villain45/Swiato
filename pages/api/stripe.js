import Stripe from 'stripe'

const stripe = new Stripe (
    "sk_test_51LREHvSDKOWr3XHhbvPJxrSVHBFdIMV8IpooQawGwu4Gz3nceQxV5K7LwGNVgkCHORK6KRfXWiiQMs6BChqbkUtb008036V7F8"
)

export default async function handler(req, res) {
    if(req.method == "POST") {
        try {
            const params = {
                submit_type: "pay",
                mode:"payment",
                payment_method_types : ['card'],
                line_items :req.body.map((eachItem)=>{
                    const img = eachItem.image.asset._ref  //this is path how sanity stores the images

                    const newImage = img.replace(
                        "image-",
                        "https://cdn.sanity.io/images/1zn57jtn/production/"
                    )
                    .replace("-jpg",".jpg") //from sanity jpg to normal extension

                    return {
                        price_data : {
                            currency: "inr",
                            product_data : {
                                name : eachItem.name, //food name 
                                images:[newImage] //image above
                            },
                            unit_amount:eachItem.price*100
                        },
                        adjustable_quantity: { 
                            enabled : false //so cant change quantity in checkout
                        },
                        quantity:eachItem.quantity
                    }
                }),
                success_url:`${req.headers.origin}/success`,
                cancel_url:`${req.headers.origin}/cart`
            };

            const session = await stripe.checkout.sessions.create(params)
            console.log(session);
            res.status(200).json(session)
        } catch (error) {
            res.status(500).json(error.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method not allowed")
    }
}