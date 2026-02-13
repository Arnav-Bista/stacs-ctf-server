API Specification:

POST /api/v1/upload-profile.php
    Description:
        Upload a new user profile image
    Body:
        Content Type: multipart/form-data
        Properties:
            file - Image to upload. Should be a PNG or JPEG.
    Returns:
        200 OK - Image uploaded

GET /api/v1/profiles/images/<file name>
    Description:
        Get a profile image.
    Returns:
        200 OK - The image
