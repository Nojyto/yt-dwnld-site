from io import BytesIO
from base64 import b64encode
from flask_restful import Resource, reqparse
from pytube import YouTube


class InterfaceApi(Resource):
    def get(self):
        return {
            'status': 'Success',
            'message': "Hello Api Handler"
        }

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('url', type=str, required=True, help="URL cannot be blank!")
        args = parser.parse_args()

        try:
            yt = YouTube(args['url'])
            buffer = BytesIO()
            video_selection = yt.streams.get_by_itag(140)

            if video_selection is None:
                raise ValueError("No audio stream found")

            video_selection.stream_to_buffer(buffer)
            buffer.seek(0)
            blob_file = b64encode(buffer.read()).decode("UTF-8")

            return {
                'status': 'Success',
                'blob' : blob_file,
                'title' : video_selection.title,
                'author' : yt.author,
            }
        except Exception as e:
            return {
                'status': 'Error',
                'message': str(e)
            }
