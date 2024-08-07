import { Twilio } from 'twilio';
import { config, logger } from '../config';

/**
 * Sends an SMS.
 * @param {string} to The recipient's phone number.
 * @param {string} body The SMS body.
 * @returns {Promise<any>} The SMS message.
 */
export const sendSMS = async (to: string, body: string) => {
  try {
    const client = new Twilio(
      config.SMS.SMS_ACCOUNT_ID,
      config.SMS.SMS_AUTH_TOKEN
    );
    const message = await client.messages.create({
      body,
      from: config.SMS.SMS_FROM,
      to,
    });
    logger.info(`SMS sent to ${to}: ${message.sid}`);
    return message;
  } catch (error) {
    logger.error(`Error sending SMS to ${to}`);
    throw error;
  }
};
