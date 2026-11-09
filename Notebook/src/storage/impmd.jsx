const uploadInput = document.getElementById("uploadInput");

uploadInput.addEventListener("change", () => {

  let numberOfBytes = 0;
  for (const file of uploadInput.files) {
    numberOfBytes += file.size
  }

  const units = ["B", "Kib", "Mib", "GiB", "Tb"]

  const exponent = Math.min(
    Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
    units.length -1,
  )


  const approx = numberOfBytes / 1024 ** exponent
  const output =
    exponent === 0
   ? `${numberOfBytes} bytes`
      : `${approx.toFixed(3)} ${units[exponent]}
   (${numberOfBytes} bytes`


  document.getElementById("fileNum").textContent = uploadInput.file.length
  document.getElementById("fileSize").textContent = output
})


//thumbnail:

function handleFiles(files) {
  for (const file of files) {
    if (!file.type.startWith("image/")) {
      continue
    }
    const img = document.createElement("img")
    img.classList.add("obj")
    img.file = file
    preview.appendChild(img)


    const reader = new FileReader()
    reader.onload = (e) => {
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

//url to display images
//
const fileSelect = document.getElementById("fileSelect")
fileElem = document.getElementById("fileElem")
FileList = document.getElementById("fileList")

fileSelect.addEventListener("click", (e) => {
  if (fileElem) {
    fileElem.click()
  }
  e.preventDefault()
})

fileElem.addEventListener("change", handleFiles)

function handleFiles() {
  FileList.textContent = ""
  if (!this.files.length) {
    const p = document.createElement("p")
    p.textContent = "no files selected."
    fileList.appendChild(p)
  } else {
    const list = document.createElement("ul")
    fileList.appendChild(list)
    for (const file of this.files) {
      const li = document.createElement("li")
      list.appendChild(li)



      const img = document.createElement("img")
      img.src = URL.createObjectURL(file)
      img.height = 60
      li.appendChild(img)
      const info = document.createElement("span")
      info.textContent = `${file.name}: ${file.size} bytes`
      li.appendChild(info)

    }
  }
}
