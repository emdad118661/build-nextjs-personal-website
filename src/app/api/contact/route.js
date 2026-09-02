export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Log the message to console (you can see this in server logs)
    console.log('=== New Contact Form Submission ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Date:', new Date().toISOString());
    console.log('===================================');

    // TODO: To actually receive emails, you can integrate with:
    // 1. SendGrid: https://sendgrid.com/
    // 2. Resend: https://resend.com/
    // 3. EmailJS: https://www.emailjs.com/
    // 4. Nodemailer with your SMTP server
    
    // Example with Resend (uncomment and add RESEND_API_KEY to .env):
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: ['emdad118661@gmail.com'],
    //   subject: `New message from ${name}`,
    //   html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    // });

    return Response.json(
      { 
        success: true, 
        message: 'Message received successfully' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
