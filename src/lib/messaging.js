import twilio from "twilio";

// Send SMS message using Twilio
export const sendTextMessage = async (phoneNumber, message) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  console.log({ accountSid, authToken, fromNumber });

  const client = twilio(accountSid, authToken);

  try {
    // Initialize Twilio client with environment variables
    // Send the message
    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: phoneNumber,
    });

    console.log(
      `[sendTextMessage] Message sent successfully. SID: ${result.sid}`
    );
    return { success: true, messageSid: result.sid };
  } catch (error) {
    console.error("Error sending text message", error);
    return { success: false, error: error.message };
  }
};
