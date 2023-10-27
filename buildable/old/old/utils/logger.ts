import pino from "pino";
import pretty from "pino-pretty";
import { Webhook, MessageBuilder } from "discord-webhook-node";
import { DiscordLogOptions } from "old/DiscordLogOptions";

export const LOCALES = {
  SERVER: { NAME: "⌠Mutiny Rp⌡" },
  LOG: "MUTINY:CORE:LOG",
};
const stream = pretty({
  colorize: true,
});
export class Logger {
  private logger: pino.Logger;
  hookInfo: Webhook;
  hookWarn: Webhook;
  constructor() {
    this.hookInfo = new Webhook(
      "https://discord.com/api/webhooks/1163231082834034728/HWcsyOtLzYdXCt5giWqeWz4RgTa4mJpO3CR6PbtWCVpdXH4Id8tX8vtdERbyn94bUPJq"
    );
    this.hookWarn = new Webhook(
      "https://discord.com/api/webhooks/1163231347343638578/RpDgG8p-0cY74PlzQzdjBIxPlV1IrV29CVG1pUYRGOfxuYYO5BwB7ENJtoX0eKebWd5N"
    );
    this.logger = pino(stream);
  }

  info(message: string, data?: any) {
    this.logger.info(data, message);
  }

  warn(message: string, data?: any) {
    this.logger.warn(data, message);
  }

  infoToDiscord(message: string, opts?: DiscordLogOptions) {
    // Implement logic to send message to Discord
    this.logger.info(opts, message);
    this.determineLevel("info", opts);
  }

  warnToDiscord(message: string, opts?: DiscordLogOptions) {
    // Implement logic to send message to Discord
    this.logger.warn(opts, message);
    this.determineLevel("warn", opts);
  }

  async determineLevel(level: string, opts: DiscordLogOptions) {
    const embedBuilders: any = {
      1: new MessageBuilder()
        .setTitle(opts.title)
        .setAuthor(`${opts.resource}`)
        .addField(opts.field, opts.content, opts.inline || 0)
        .setColor(opts.color || 2)
        .setFooter(LOCALES.SERVER.NAME)
        .setTimestamp(),
      2: new MessageBuilder()
        .setTitle(opts.title)
        .setAuthor(`${opts.resource}`)
        .addField(opts.field, opts.content, opts.inline || 0)
        .addField(opts.field_2, opts.content_2, opts.inline_2 || 0)
        .setColor(opts.color || 2)
        .setFooter(LOCALES.SERVER.NAME)
        .setTimestamp(),
      3: new MessageBuilder()
        .setTitle(opts.title)
        .setAuthor(`${opts.resource}`)
        .addField(opts.field, opts.content, opts.inline || 0)
        .addField(opts.field_2, opts.content_2, opts.inline_2 || 0)
        .addField(opts.field_3, opts.content_3, opts.inline_3 || 0)
        .setColor(opts.color || 2)
        .setFooter(LOCALES.SERVER.NAME)
        .setTimestamp(),
    };

    const embedBuilder = embedBuilders[opts.count];
    if (level === "info") {
      try {
        await this.hookInfo.send(embedBuilder);
      } catch (error) {
        console.log(error);
      }
    } else if (level === "warn") {
      try {
        await this.hookWarn.send(embedBuilder);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
