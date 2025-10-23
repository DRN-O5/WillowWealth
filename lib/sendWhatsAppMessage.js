

export async function sendWhatsAppMessage(phone, message) {
  try {
    const response = await fetch(`${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message },
      }),
    });

    const data = await response.json();
    console.log("WhatsApp API response:", data);
    return data;
  } catch (err) {
    console.error("WhatsApp send error:", err);
  }
}
