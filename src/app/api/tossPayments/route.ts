export default async  function Handler(req : any, res:Response) {
    const {orderId, paymentKey, amount} = req.query;
    const secrtKey = process.env.TOSS_SECRET_KEY;

    const url = "https://api.tosspayments.com/vi/payments/corfirm";
    const basicToken = Buffer.from(`${secrtKey};`, "utf-8").toString("base64");

    await fetch(url, {
        method: 'post',
        body: JSON.stringify({
            amount, orderId, paymentKey,
        }),
        headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type" : "application/json"
        }
    }).then(res => res.json());
}