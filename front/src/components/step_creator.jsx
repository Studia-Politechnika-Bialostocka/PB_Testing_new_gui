import { useState } from "react";
import { getPageHtml, getTags } from "../util/api";
import "./step_creator.css";

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

export default function StepCreator() {
  const [siteUrl, setSiteUrl] = useState("");
  const [pageHtml, setPageHtml] = useState("");
  const [showHtml, setShowHtml] = useState(false);
  const [action, setAction] = useState("clicking button");
  const [tags, setTags] = useState([]);
  const [tagFilter, setTagFilter] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);

  const scrapeSite = async () => {
    let data = await getPageHtml(siteUrl);
    let text = data["html"] || data["error"];

    setPageHtml(text);
  };

  const displayTags = async () => {
    let tag_data = actions[action];
    let data = await getTags(tag_data.tag_type, tag_data.tag_attributes);
    setTags(data.tags);
    setFilteredTags(data.tags);
    setTagFilter("");
  };

  const filterTags = (filter) => {
    setTagFilter(filter);
    if (!filter) {
      setFilteredTags(tags);
      return;
    }
    let filtered = tags.filter(
      (tag) =>
        JSON.stringify(tag.attrs).includes(filter) || tag.html.includes(filter)
    );
    setFilteredTags(filtered);
  };

  return (
    <div>
      <input type="text" onChange={(e) => setSiteUrl(e.target.value)} />
      <button onClick={scrapeSite}>Scrape</button>
      {pageHtml && (
        <button onClick={() => setShowHtml(!showHtml)}>Toggle Html</button>
      )}
      {pageHtml && (
        <div>
          <select
            name="actions"
            id="actions"
            onChange={(e) => setAction(e.target.value)}
          >
            {Object.keys(actions).map((action) => (
              <option value={action}>{action}</option>
            ))}
          </select>
          <button onClick={() => displayTags()}>Get Tags</button>
        </div>
      )}
      {pageHtml && showHtml && (
        <div className="text-container">
          <textarea value={pageHtml} />
        </div>
      )}
      {!!tags.length && (
        <div>
          Filter
          <input
            type="text"
            value={tagFilter}
            onChange={(e) => filterTags(e.target.value)}
          />
          {filteredTags.map((tag) => (
            <div>
              <div>tag type: {tag.type}</div>
              <div>attrs: {JSON.stringify(tag.attrs)}</div>
              <div className="text-container">
                <textarea value={tag.html} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
