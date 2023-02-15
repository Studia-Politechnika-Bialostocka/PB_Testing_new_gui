import io
import sys

from url_importer import django


def test_call():
    assert django.import_urls() is False
