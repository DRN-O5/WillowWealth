import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function sendSMS(to, body) {
  try {
    const message = await client.messages.create({
      from: twilioPhone,
      to, 
      body,
    });
    console.log("SMS sent:", message.sid);
    return message;
  } catch (error) {
    console.error("SMS send error:", error);
  }
}
