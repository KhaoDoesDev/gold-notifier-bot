# Khao's Gold Price Notifier Line Bot

This is a Line bot for notifying the gold prices from the [Gold Trader's Association Of Thailand](https://www.goldtraders.or.th/).

This was a quick bot project made for my grandmother to notify her when the buying gold price changes by notifying her through her messaging app of choice, Line.

## Why Line?

Well, it's what my grandmother and many other Thai people use.

If it wasn't Line, it would've been either Discord or Telegram but sadly, my grandmother doesn't use those "technologies".

## How to use it?

You need a Cloudflare account, a LINE OA with Messaging API turned on, a channel access token, and the user ID or group ID that'll receive the gold price notificaations.

Clone the repository and install deps:

```bash
git clone https://github.com/KhaoDoesDev/gold-notifier-bot
cd gold-notifier-bot
bun install
```

Log in to Cloudflare:

```bash
bunx wrangler login
```

Copy `.env.example` to `.env` and fill it in:

```bash
cp .env.example .env
```

Use a user id to message one account, or a group id if you invited the bot to a group. If you don't know the id then temporarily uncomment the webhook logging code in `src/index.ts`, set your webhook url to your deployed worker url, send the bot a message, and read the worker logs.

### Deploy

After secrets are set, run:

```bash
bun run deploy --secrets-file .env
```

## License

MIT - have at it, it was quick anyways.
