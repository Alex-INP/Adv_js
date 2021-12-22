'use strict'

const el_text = document.querySelector(".text")
const reg = /(?<=\s)’|’(?=\s)/g;
const new_txt = el_text.textContent.replace(reg, '"')

el_text.insertAdjacentHTML("afterend", `<br/><br/><span>${new_txt}<span/>`)

