export function exportPng(stage, scale, name = "drawing") {
  const link = document.createElement("a")
  link.href = stage.toDataURL({ pixelRatio: 2 / scale })
  link.download = name + ".png";
  link.click()
}
