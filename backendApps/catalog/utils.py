def get_cloudinary_url(resource):
    try:
        return resource.url if resource else None
    except AttributeError:
        return str(resource) if resource else None