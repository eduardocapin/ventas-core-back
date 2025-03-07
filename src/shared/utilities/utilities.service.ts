import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import handlebars from "handlebars";
@Injectable()
export class UtilitiesService {
    generateCode(n: number): string {
        let result = "";
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < n; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    loadEmailTemplate(templatePath: string,
        replacements: Record<string, string>): string {
        const template = fs.readFileSync(templatePath, "utf8");
        const compiledTemplate = handlebars.compile(template);
        return compiledTemplate(replacements);
    }
}
