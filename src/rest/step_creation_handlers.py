from codecs import decode

from flask import Blueprint, make_response, request
from flask_cors import cross_origin
from markupsafe import escape

from services.site_info import SiteInfo

step_creation = Blueprint("step_creation", __name__)

# site_info = SiteInfo(for_flask=True)
site_info = SiteInfo()


@step_creation.route("/scrape/page_html")
def page_html():
    site_url = request.args.get("site_url")
    if not site_url:
        return {"error": "missing site_url param"}, 400

    try:
        html, is_new = site_info.get_saved_site_anonymous(site_url)
    except ConnectionError as e:
        return {"error": str(e)}

    return {"html": html}


@step_creation.route("/scrape/tags")
def html_tags():
    params = dict(request.args)
    tag_type = params.pop("tag_type", None)
    tag_attributes = params or None
    try:
        tags, errors = site_info.get_tag_anonymous(
            site_info.last_site, tag_type, tag_attributes=tag_attributes
        )
    except ConnectionError:
        return {"error": "Scrape a valid site first"}

    return {
        # "tags": [
        #     {
        #         "type": tag.type_of_tag,
        #         "attrs": tag.attrs,
        #         "html": str(tag.element_html.prettify()),
        #     }
        #     for tag in tags
        # ]
    }
