import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {orderId : orderId, paymentKey : paymentKey, amount : amount } = req.query;

    // Logging the incoming request parameters
    console.log("API request parameters:", { orderId, paymentKey, amount });

    // Ensure environment variable is defined
    const secretKey = process.env.NEXT_PUBLIC_CLIENT_TOSS_SECRET_KEY;
    
    if (!secretKey) {
        console.error("NEXT_PUBLIC_CLIENT_TOSS_SECRET_KEY is not defined in environment variables");
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }

    // URL correction
    const url = "https://api.tosspayments.com/v1/payments/confirm";
    
    // Properly encoding the basic token
    const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

    try {
        // Fetching the response from Toss Payments API
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                amount: Number(amount), // Ensure amount is a number
                orderId,
                paymentKey,
            }),
            headers: {
                Authorization: `Basic ${basicToken}`,
                "Content-Type": "application/json"
            }
        });

        // Parsing the response
        const result = await response.json();

        if (!response.ok) {
            // If the response is not OK, log the error and respond with an error message
            console.error("Error from Toss Payments API:", result);
            res.status(response.status).json(result);
            return;
        }

        // Log the result for debugging purposes
        console.log("Toss Payments API response:", result);

        // Redirect to the complete page with orderId
        res.redirect(`/payments/complete?orderId=${orderId}`);
    } catch (error) {
        // Catch any fetch errors
        console.error("Fetch error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
