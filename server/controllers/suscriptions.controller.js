import { webPushTool } from "./webPush.js"

export const suscribe = async (req, res) => {
    console.log(req.body);

    res.status(200).json();
}