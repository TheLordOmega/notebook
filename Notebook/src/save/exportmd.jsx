const prefix = {
  heading: "## ",
  heading1: "## ",
  heading2: "### ",
  heading3: "#### "
}

export function blockToMd(block) {
  if (block.type === "todo") return (block.checked ? "- [x] " : "- [ ] ") + block.text
  if (block.type === "ink") return "*(drawing)*";
  return (prefix[block.type] ?? "") + block.text
}

export function downloadMd(note) {
  const text = ["#" + (note.title || "Untitled"),
    ...note.blocks.map(blockToMd)].join("\n\n");
  const blob = new Blob([text], { type: "text/markdown" })

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = (note.title || "untitled") + ".md"
  link.click()
  URL.revokeObjectURL(link.href)
}
