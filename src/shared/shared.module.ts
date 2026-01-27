import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities/utilities.service';
import { MailService } from './mail/mail.service';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';

@Module({
    imports: [RepositoriesModule],
    providers: [UtilitiesService, MailService],
    exports: [UtilitiesService, MailService,RepositoriesModule ]
})
export class SharedModule { }
