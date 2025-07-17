from urllib.parse import urlparse

def get_cloudinary_url(resource):
    try:
        return resource.url if resource else None
    except AttributeError:
        return str(resource) if resource else None
    
def extract_public_id(cloudinary_url: str) -> str:
    parsed = urlparse(cloudinary_url)
    parts = parsed.path.split('/')
    try:
        index = parts.index("upload") + 1
        relevant_parts = parts[index:]  # skip "upload"
        # remove version if present (starts with 'v' followed by digits)
        if relevant_parts[0].startswith("v") and relevant_parts[0][1:].isdigit():
            relevant_parts = relevant_parts[1:]
        public_id_with_ext = "/".join(relevant_parts)
        public_id = public_id_with_ext.rsplit('.', 1)[0]
        return public_id
    except Exception as e:
        print(f"[ERROR] Failed to extract public_id: {e}")
        return None