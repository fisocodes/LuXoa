import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { createTransport, Transporter } from "nodemailer";
import { render } from "react-email";

import { ConfigurationService } from "../configuration/configuration.service";
import OtpEmailTemplate from "./templates/otp.template";

@Processor("mailer")
export class MailerProcessor extends WorkerHost {
  private readonly transporter: Transporter;

  constructor(private readonly _configurationService: ConfigurationService) {
    super();
    this.transporter = createTransport({
      auth: {
        pass: this._configurationService.smtpPassword,
        user: this._configurationService.smtpUser,
      },
      host: this._configurationService.smtpHost,
      port: this._configurationService.smtpPort,
      secure: this._configurationService.smtpSecure,
    });
  }

  async process(job: Job<{ to: string; code: string }>): Promise<void> {
    if (job.name !== "send:otp") {
      return;
    }

    const html = await render(OtpEmailTemplate({ code: job.data.code }));

    await this.transporter.sendMail({
      from: this._configurationService.smtpFrom,
      html,
      subject: "Your one time password",
      to: job.data.to,
    });
  }
}
