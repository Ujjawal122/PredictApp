// utils/sendVerificationSMS.ts
import emailjs from "@emailjs/browser";

export const sendVerificationSMS = async (phone: string, code: string) => {
  try {
    const templateParams = {
      to_phone: phone, 
      code: code,
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_SMS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    console.log("✅ Verification SMS request sent via EmailJS");
  } catch (error) {
    console.error("❌ EmailJS SMS error:", error);
    throw new Error("Failed to send verification SMS");
  }
};
