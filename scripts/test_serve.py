import functools
from http.server import ThreadingHTTPServer
from pathlib import Path
import tempfile
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from serve import Handler


class RangeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        root = Path(cls.temp.name)
        (root / 'video.mp4').write_bytes(b'0123456789')
        cls.http = ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Handler, directory=root))
        cls.thread = threading.Thread(target=cls.http.serve_forever, daemon=True)
        cls.thread.start()
        cls.url = f'http://127.0.0.1:{cls.http.server_port}/video.mp4'

    @classmethod
    def tearDownClass(cls):
        cls.http.shutdown()
        cls.http.server_close()
        cls.thread.join()
        cls.temp.cleanup()

    def test_complete(self):
        with urlopen(self.url) as response:
            self.assertEqual(response.read(), b'0123456789')
            self.assertEqual(response.headers['Accept-Ranges'], 'bytes')

    def test_seek(self):
        with urlopen(Request(self.url, headers={'Range': 'bytes=3-5'})) as response:
            self.assertEqual(response.status, 206)
            self.assertEqual(response.headers['Content-Range'], 'bytes 3-5/10')
            self.assertEqual(response.read(), b'345')

    def test_suffix(self):
        with urlopen(Request(self.url, headers={'Range': 'bytes=-3'})) as response:
            self.assertEqual(response.read(), b'789')

    def test_open_ended(self):
        with urlopen(Request(self.url, headers={'Range': 'bytes=8-'})) as response:
            self.assertEqual(response.read(), b'89')

    def test_head(self):
        with urlopen(Request(self.url, method='HEAD')) as response:
            self.assertEqual(response.headers['Content-Length'], '10')
            self.assertEqual(response.read(), b'')

    def test_unsatisfiable(self):
        with self.assertRaises(HTTPError) as error:
            urlopen(Request(self.url, headers={'Range': 'bytes=15-'}))
        self.assertEqual(error.exception.code, 416)
        self.assertEqual(error.exception.headers['Content-Range'], 'bytes */10')

    def test_no_directory_listing(self):
        with self.assertRaises(HTTPError) as error:
            urlopen(self.url.rsplit('/', 1)[0] + '/')
        self.assertEqual(error.exception.code, 404)


if __name__ == '__main__':
    unittest.main()
