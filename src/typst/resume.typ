// Shared layout for generated résumé documents.
// Résumé facts come from src/contents/CV_en.md, never from this file.

#let contact-grid(items) = {
  block(
    below: 9pt,
    grid(
      columns: (1fr, 1fr),
      column-gutter: 5mm,
      row-gutter: 0pt,
      ..items.map(item => block(
        breakable: false,
        inset: (top: 3pt, bottom: 3pt, left: 4pt, right: 4pt),
        stroke: (bottom: 0.4pt + rgb("bdbdbd")),
        text(size: 8.5pt)[#strong(item.at(0)) #item.at(1)],
      )),
    ),
  )
}

#let resume(body) = {
  set document(
    title: "Asai Neko — Résumé",
    author: "Asai Neko",
    keywords: ("résumé", "systems", "infrastructure", "cloud native", "AI"),
  )
  set page(
    paper: "a4",
    margin: (top: 12mm, right: 14mm, bottom: 16mm, left: 14mm),
    footer: context {
      set text(size: 8pt, fill: rgb("54595d"))
      align(right)[#counter(page).display() / #counter(page).final().first()]
    },
  )
  set text(font: "Noto Sans", size: 9.5pt, lang: "en", fallback: false)
  set par(leading: 0.43em, justify: false)
  set list(indent: 0pt, body-indent: 0.6em, spacing: 3pt)

  show link: set text(fill: rgb("000000"))
  show link: underline

  show heading.where(level: 1): it => block(
    above: 0pt,
    below: 10pt,
    sticky: true,
    text(size: 23pt, weight: 700, it.body),
  )
  show heading.where(level: 2): it => block(
    above: 14pt,
    below: 7pt,
    inset: (bottom: 3pt),
    stroke: (bottom: 0.5pt + rgb("777777")),
    sticky: true,
    text(size: 11.5pt, weight: 700, it.body),
  )
  show heading.where(level: 3): it => block(
    above: 10pt,
    below: 4pt,
    sticky: true,
    text(size: 10.5pt, weight: 700, it.body),
  )

  body
}
