import React, { useState, useEffect } from "react";
import axios from "axios";

import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

const ResumePage = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const NOTION_PAGE_ID = "Lee-Jeong-Bae-66920c94e0e14611bfdafa93eca82fa4";

    axios
      .get(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then(({ data }) => {
        setResponse(data);
      });
  }, []);

  return <NotionRenderer blockMap={response} fullPage={true} />;
};

export default ResumePage;
