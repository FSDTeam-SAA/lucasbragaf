import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Create nodemailer transporter
    // Replace these with your actual email credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: Number.parseInt("587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Build email content
    let emailContent = `
      <h2>New Service Request from Braga Experience</h2>
      <p><strong>Service Type:</strong> ${formData.serviceType}</p>
    `;

    if (formData.serviceType === "Videography") {
      emailContent += `
        <p><strong>Videography Type:</strong> ${formData.videographyType}</p>
        <p><strong>Final Product:</strong> ${formData.finalProduct}</p>
      `;
    } else if (formData.serviceType === "Photography") {
      emailContent += `
        <p><strong>Photography Type:</strong> ${formData.photographyType}</p>
      `;
    }

    emailContent += `
      <p><strong>Budget:</strong> ${formData.budget}</p>
      <p><strong>Contact Method:</strong> ${formData.contactMethod}</p>
    `;

    if (formData.contactMethod === "Phone Call") {
      emailContent += `<p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>`;
    } else if (formData.contactMethod === "WhatsApp") {
      emailContent += `<p><strong>WhatsApp Number:</strong> ${formData.whatsappNumber}</p>`;
    } else if (formData.contactMethod === "Mail") {
      emailContent += `<p><strong>Email:</strong> ${formData.email}</p>`;
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New ${formData.serviceType} Request - Braga Experience`,
      html: emailContent,
    });

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
