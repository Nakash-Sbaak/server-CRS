import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserOtp(email: string, ar: boolean) {
    const otp = this.generateOTP();

    const emailStatus = await this.mailerService.sendMail({
      to: email,
      subject: 'forget password mail',
      template: ar ? './ar_otp' : './otp',
      context: {
        otp,
      },
    });
    return { ...emailStatus, otp: otp };
  }
  private generateOTP(): string {
    const randomNumber = randomInt(0, 999999);
    return randomNumber.toString().padStart(6, '0');
  }
}
