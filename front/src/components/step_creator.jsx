import { useEffect, useState } from "react";
import { getPageHtml, getTags } from "../util/api";
import "./step_creator.css";
import "highlight.js/styles/nord.css";
import hljs from "highlight.js";

const actions = {
  // "all": { tag_type: null, tag_attributes: null },
  "clicking button": { tag_type: "button", tag_attributes: null },
  "clicking link": { tag_type: "a", tag_attributes: null },
  "clicking input": { tag_type: "input", tag_attributes: null },
  "clicking checkbox": {
    tag_type: "input",
    tag_attributes: { type: "checkbox" },
  },
  "clicking radio button": {
    tag_type: "input",
    tag_attributes: { type: "radio" },
  },
  "clicking submit input": {
    tag_type: "input",
    tag_attributes: { type: "submit" },
  },
};

const INPUT_STATUS_BORDER_CLASS = {
  0: "",
  1: "input-success",
  2: "input-error",
};

const SVG_WIDTH = "200px";

export default function StepCreator() {
  const [siteUrl, setSiteUrl] = useState("");
  const [pageHtml, setPageHtml] = useState("");
  const [showHtml, setShowHtml] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagFilter, setTagFilter] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const [scrapeStatus, setScrapeStatus] = useState(0);
  const [filterStatus, setFilterStatus] = useState(0);

  useEffect(() => {
    hljs.highlightAll();
  }, [filteredTags]);

  const scrapeSite = async () => {
    let data = await getPageHtml(siteUrl);
    let text = data["html"] || data["error"];

    if (data["html"]) setScrapeStatus(1);
    else if (data["error"]) setScrapeStatus(2);

    setPageHtml(text);
  };

  const displayTags = async (newAction) => {
    let tag_data = actions[newAction];
    let data = await getTags(tag_data.tag_type, tag_data.tag_attributes);
    data.tags.forEach((tag) => (tag.preview = false));
    setTags(data.tags);
    setFilteredTags(data.tags);
    setTagFilter("");
  };

  const filterInputClass = (filter, filtered) => {
    if (!filter.length) return 0;
    if (!filtered.length) return 2;
    return 1;
  };

  const filterTags = (filter) => {
    setTagFilter(filter);
    if (!filter) {
      setFilteredTags(tags);
      setFilterStatus(0);
      return;
    }
    let filtered = tags.filter(
      (tag) =>
        JSON.stringify(tag.attrs).includes(filter) || tag.html.includes(filter)
    );
    setFilteredTags(filtered);
    setFilterStatus(filterInputClass(filter, filtered));
  };

  const syntaxHighlight = (code) => {
    return hljs.highlight(code, { language: "html" }).value;
  };

  const hasSvg = (code) => {
    return code.includes("<svg") && code.includes("</svg>");
  };

  const toggleSvg = (idx) => {
    let oldTags = filteredTags;
    let tag = oldTags[idx];
    tag.preview = !tag.preview;
    console.log(oldTags);
    setFilteredTags([...oldTags]);
  };

  const extractSvg = (code) => {
    let startIdx = code.indexOf("<svg");
    let endIdx = code.indexOf("</svg>") + 6;
    let svgCode = code.substring(startIdx, endIdx);
    let el = document.createElement("div");
    el.innerHTML = svgCode;
    let svgEl = el.childNodes[0];
    svgEl.style.width = "200px";
    return el.innerHTML;
  };

  useEffect(() => {}, [tagFilter]);

  return (
    <div>
      <input
        id="scrape-url"
        className={INPUT_STATUS_BORDER_CLASS[scrapeStatus]}
        type="text"
        onChange={(e) => setSiteUrl(e.target.value)}
      />
      <button onClick={scrapeSite}>Scrape</button>
      {pageHtml && (
        <button onClick={() => setShowHtml(!showHtml)}>Toggle Html</button>
      )}
      {pageHtml && (
        <div>
          <select
            name="actions"
            id="actions"
            defaultValue="0"
            onChange={(e) => displayTags(e.target.value)}
          >
            <option value="0" disabled>
              --Select Action--
            </option>
            {Object.keys(actions).map((action) => (
              <option value={action}>{action}</option>
            ))}
          </select>
        </div>
      )}
      {pageHtml && showHtml && (
        <div className="text-container">
          <textarea value={pageHtml} />
        </div>
      )}
      {!!tags.length && (
        <div>
          <input
            className={INPUT_STATUS_BORDER_CLASS[filterStatus]}
            type="text"
            placeholder="Filter"
            value={tagFilter}
            onChange={(e) => filterTags(e.target.value)}
          />
          {filteredTags.map((tag, idx) => (
            <div className="preview-container">
              <div className="tag-container">
                <div className="tag-preview">
                  <pre>
                    <code className="language-html">{tag.html}</code>
                  </pre>
                </div>
                {hasSvg(tag.html) && (
                  <button onClick={() => toggleSvg(idx)}>Preview SVG</button>
                )}
              </div>
              {tag.preview != 0 && (
                <div
                  dangerouslySetInnerHTML={{ __html: extractSvg(tag.html) }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
