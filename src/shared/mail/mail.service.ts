import { Inject, Injectable } from '@nestjs/common';
import { UtilitiesService } from 'src/shared/utilities/utilities.service';
import * as nodemailer from 'nodemailer';
import { User } from 'src/users/entities/user.entity';
import * as path from 'path';
@Injectable()
export class MailService {

    private transporter;

    constructor(
        private readonly utilitiesService: UtilitiesService, @Inject('LOGGER') private readonly logger) {

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
        this.logger.debug(url)
        const name = to.name;
        console.log(name)
        this.logger.debug(name)
        const replacements = { name: name, url: url };
        const templatePath = path.join(
            __dirname,
            '..', // desde dist/shared/mail → dist/shared
            '..', // → dist
            'assets',
            'templates',
            'resetPasswordEmailTemplate.html',
        );

        const htmlToSend = this.utilitiesService.loadEmailTemplate(
            templatePath,
            replacements,
        );

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: to.email,
            subject: "[Mobentis] Cambio de contraseña",
            html: htmlToSend,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.join(
                        __dirname,
                        '..',
                        '..',
                        'assets',
                        'logo.png',
                    ),
                    cid: 'logo'
                }
            ]
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log("Correo enviado con éxito");
            this.logger.info(`Correo de reseto enviado con exito a: ${to}`)
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            this.logger.error(`Error al enviar el correo de reseto de contraseña a: ${to}, ${error}`)
        }
    }

}
