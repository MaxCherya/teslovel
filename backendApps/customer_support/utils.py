import requests
import os

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_IDS = [
    "765039367",  # admin 1
]

def send_to_admins(text: str):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    for chat_id in TELEGRAM_CHAT_IDS:
        try:
            requests.post(url, data={
                "chat_id": chat_id,
                "text": text,
                "parse_mode": "HTML"
            }, timeout=5)
        except Exception as e:
            print(f"❌ Failed to send to {chat_id}:", e)