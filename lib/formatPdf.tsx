const formatPdf = (contentHTML: string) => {
  const dotHTML = `<div style="width: 5px; height:5px; border-radius:50%; background:black;"></div>`;

  const newHTML = contentHTML
    .replaceAll(/<li>(.*?)<\/li>/g, (_, content) => {
      return `<div style="display:flex; gap: 4px;">${dotHTML}<div style="padding-bottom: 15px;">${content}</div></div>`;
    })
    .replaceAll(
      /<li style="list-style: inside;">(.*?)<\/li>/g,
      (_, content) => {
        return `<div style="display:flex; gap: 4px;">${dotHTML}<div style="padding-bottom: 15px;">${content}</div></div>`;
      },
    )
    .replaceAll("<ul", "<div")
    .replaceAll("</ul>", "</div>");

  return newHTML;
};

export default formatPdf;
