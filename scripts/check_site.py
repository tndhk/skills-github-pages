#!/usr/bin/env python3
"""Check generated HTML links and reachability without external HTTP requests."""

import argparse
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.doctype = False
        self.ids = set()
        self.links = []
        self.feed(content)

    def handle_decl(self, decl):
        self.doctype = decl.lower() == "doctype html" or self.doctype

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("name"):
            self.ids.add(attrs["name"])
        for attr in ("href", "src"):
            if attrs.get(attr):
                self.links.append((tag == "a" and attr == "href", attrs[attr]))


def check_site(root, baseurl):
    root = root.resolve()
    baseurl = "/" + baseurl.strip("/") if baseurl.strip("/") else ""
    origin = "https://tndhk.github.io"
    pages = {p: Page(p.read_text()) for p in root.rglob("*.html")}
    edges = {p: set() for p in pages}
    errors = []
    for source, page in pages.items():
        if not page.doctype:
            errors.append(f"{source.relative_to(root)}: missing HTML doctype")
        source_url = origin + baseurl + "/" + source.relative_to(root).as_posix()
        for navigation, href in page.links:
            target_url = urlsplit(urljoin(source_url, href))
            if target_url.scheme not in ("http", "https"):
                continue
            if target_url.netloc != urlsplit(origin).netloc:
                continue
            path = unquote(target_url.path)
            if baseurl and not path.startswith(baseurl + "/") and path != baseurl:
                errors.append(f"{source.relative_to(root)}: outside baseurl: {href}")
                continue
            target = (root / path[len(baseurl):].lstrip("/")).resolve()
            if not target.is_relative_to(root):
                errors.append(f"{source.relative_to(root)}: outside site: {href}")
                continue
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                errors.append(f"{source.relative_to(root)}: missing target: {href}")
                continue
            if target in pages:
                if navigation:
                    edges[source].add(target)
                fragment = unquote(target_url.fragment)
                if fragment and fragment not in pages[target].ids:
                    errors.append(f"{source.relative_to(root)}: missing anchor: {href}")

    home = root / "index.html"
    seen = set()
    pending = deque([home])
    while pending:
        page = pending.popleft()
        if page not in seen:
            seen.add(page)
            pending.extend(edges.get(page, set()) - seen)
    for page in sorted(set(pages) - seen):
        errors.append(f"{page.relative_to(root)}: unreachable from home")
    if home not in pages:
        errors.append("missing home: index.html")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(pages)} HTML pages; internal targets, anchors and home reachability")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site", type=Path)
    parser.add_argument("--baseurl", default="/skills-github-pages")
    args = parser.parse_args()
    check_site(args.site, args.baseurl)
