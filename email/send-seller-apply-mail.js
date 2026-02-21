import nodemailer from 'nodemailer';

export const sendApplySellerMail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Seller Creation Request',
            html: `
                <p>A new seller creation request has been submitted.</p>
                <p>User Email: <b>${email}</b></p>
                <p>
                    <a href="${process.env.FRONTEND_URL}/admin/sellers"
                       style="display:inline-block;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">
                        See New Request
                    </a>
                </p>
            `,
        };

        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Seller Creation Request Received',
            html: `
                <p>Your seller creation request has been received.</p>
                <p>Our team will review your request and contact you soon.</p>
            `,
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        console.log('Seller request emails sent successfully');
    } catch (error) {
        console.error('Error sending seller email:', error);
        throw error;
    }
};