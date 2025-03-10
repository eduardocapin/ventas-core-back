import { Injectable } from '@nestjs/common';
import { UtilitiesService } from 'src/shared/utilities/utilities.service';
import * as nodemailer from 'nodemailer';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class MailService {

    private transporter;

    constructor(
        private readonly utilitiesService: UtilitiesService) {

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS,
              },
        });
    }
    async sendResetPasswordMail(to: User, url: string) {
        console.log(url)
        const name = to.name;
        console.log(name)
        const replacements = { name: name, url: url };
        const htmlToSend = this.utilitiesService.loadEmailTemplate(
            "/app/src/assets/templates/resetPasswordEmailTemplate.html",
            replacements
        );

        const mailOptions = {
            from: process.env.MAIL_USER, 
            to: to.email,
            subject: "[Mobentis] Cambio de contraseña",
            html: htmlToSend,
            attachments: [
                {
                    filename: 'logo.png',
                    path: '/code/app/src/assets/logo.png',
                    cid: 'logo'
                }
            ]
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log("Correo enviado con éxito");
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    }

}
