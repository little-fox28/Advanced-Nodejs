import {Router} from "express";

const productRouter = new Router();

productRouter.get('/products', (req, res) => {
    console.log(req.signedCookies["Hello"])

    if (req.signedCookies["Hello"] === "World") {
        return res.status(200).json("Ok!");
    }
    return res.status(404).json("Not Found!");
})

export default productRouter