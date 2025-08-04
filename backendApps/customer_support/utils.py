import requests
import os

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_IDS = [
    "765039367",  # admin 1
]

def send_to_admins(text: str):
    if not TELEGRAM_BOT_TOKEN:
        print("❌ TELEGRAM_BOT_TOKEN not set.")
        return

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    for chat_id in TELEGRAM_CHAT_IDS:
        try:
            response = requests.post(url, data={
                "chat_id": chat_id,
                "text": text,
                "parse_mode": "HTML"
            }, timeout=5)
            if response.status_code != 200:
                print(f"⚠️ Telegram error {response.status_code}: {response.text}")
        except Exception as e:
            print(f"❌ Failed to send to {chat_id}:", e)

def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0].strip()
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip or "0.0.0.0"

def get_ip_location(ip):
    try:
        response = requests.get(f"https://ipinfo.io/{ip}/json", timeout=5)
        if response.status_code == 200:
            data = response.json()
            city = data.get("city", "")
            region = data.get("region", "")
            country = data.get("country", "")
            return ", ".join(part for part in [city, region, country] if part)
    except Exception as e:
        print("Geo IP lookup failed:", e)
    return "невідомо"