import express from "express";
import { Resend } from "resend";
import Message from "../models/Message.js";

const router = express.Router();
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  let emailSent = false;

  try {
    // Always save to DB first so no message is ever lost
    const saved = await Message.create({ name, email, message });

    // Try sending an email notification via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: `Portfolio Contact <${process.env.CONTACT_FROM_EMAIL}>`,
          to: process.env.CONTACT_TO_EMAIL,
          reply_to: email,
          subject: `New portfolio message from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
          `,
        });
        emailSent = true;
        saved.emailSent = true;
        await saved.save();
      } catch (emailErr) {
        console.error("Resend email failed:", emailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      emailSent,
      message: "Message received. Thank you for reaching out!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
