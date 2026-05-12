import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_SUBJECT = 200;
const MAX_BODY = 5000;
const MAX_REPLY_TO = 200;

const json = (statusCode, payload) => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payload),
});

export const handler = async (event) => {
  const method = event.requestContext?.http?.method ?? event.httpMethod;
  if (method !== "POST") return json(405, { ok: false, error: "method_not_allowed" });

  let payload;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  if (typeof payload._hp === "string" && payload._hp.length > 0) {
    return { statusCode: 204 };
  }

  const subject = (payload.subject ?? "").toString().trim();
  const body = (payload.body ?? "").toString().trim();
  const replyTo = (payload.replyTo ?? "").toString().trim();

  if (body.length === 0 || body.length > MAX_BODY) {
    return json(400, { ok: false, error: "invalid_body" });
  }
  if (subject.length > MAX_SUBJECT) {
    return json(400, { ok: false, error: "invalid_subject" });
  }
  if (replyTo && (replyTo.length > MAX_REPLY_TO || !EMAIL_RE.test(replyTo))) {
    return json(400, { ok: false, error: "invalid_reply_to" });
  }

  const finalSubject = `[Portfolio] ${subject || "Hello Sruthik"}`;
  const finalBody =
    `From: ${replyTo || "(no reply-to provided)"}\n` +
    `------------------------------------------\n\n` +
    body;

  const cmd = new SendEmailCommand({
    FromEmailAddress: CONTACT_EMAIL,
    Destination: { ToAddresses: [CONTACT_EMAIL] },
    ReplyToAddresses: replyTo ? [replyTo] : undefined,
    Content: {
      Simple: {
        Subject: { Data: finalSubject, Charset: "UTF-8" },
        Body: { Text: { Data: finalBody, Charset: "UTF-8" } },
      },
    },
  });

  try {
    await ses.send(cmd);
    return json(200, { ok: true });
  } catch (err) {
    console.error("ses_send_failed", { name: err.name, message: err.message });
    return json(502, { ok: false, error: "send_failed" });
  }
};
