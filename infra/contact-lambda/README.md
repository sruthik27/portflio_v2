# contact-lambda

Backend for the portfolio contact form. POST JSON → SES → inbox.

Single-file Node 22 Lambda. The runtime bundles `@aws-sdk/client-sesv2`, so
the deploy artifact is just `index.mjs` zipped — no `npm install`, no
`node_modules/`.

## Expected request

```
POST /
content-type: application/json

{
  "subject":  "<= 200 chars, optional",
  "body":     "1..5000 chars, required",
  "replyTo":  "user@example.com, optional",
  "_hp":      "honeypot, must be empty"
}
```

Responses: `200 {ok:true}` on send, `204` if honeypot tripped, `400` on
validation error, `502` on SES failure.

## Env

- `CONTACT_EMAIL` — SES-verified address used as both `From` and `To`.

## Deployed resources

- Region: `ap-south-1`
- Function: `noc-portfolio-contact` (Node 22, arm64, 256MB, 10s timeout)
- IAM role: `noc-portfolio-contact-role` with `AWSLambdaBasicExecutionRole` + inline `ses-send` (scoped to one identity)
- SES identity: `sruthik2016@gmail.com` (sandbox — verified-only)
- Function URL CORS: `https://nocportfolio-eight.vercel.app`, `http://localhost:5173`, `http://localhost:4173`

## Redeploy after editing this file

```bash
cd infra/contact-lambda
zip -r function.zip index.mjs
aws lambda update-function-code \
  --function-name noc-portfolio-contact \
  --zip-file fileb://function.zip \
  --region ap-south-1
```

## Update CORS allow-list (e.g. when adding a custom domain)

```bash
aws lambda update-function-url-config \
  --function-name noc-portfolio-contact \
  --region ap-south-1 \
  --cors '{"AllowOrigins":["https://your-domain","http://localhost:5173","http://localhost:4173"],"AllowMethods":["POST"],"AllowHeaders":["content-type"],"MaxAge":86400}'
```

## Notes / known limits

- Reserved concurrency was not set: the account's total Lambda concurrency is
  10 and AWS requires ≥10 unreserved. Honeypot + CORS allow-list + input
  length caps are the active spam mitigations.
- SES is in sandbox: `From` and `To` must both be the verified address. That's
  fine here — both are `sruthik2016@gmail.com` and the visitor's address goes
  in `Reply-To`.
