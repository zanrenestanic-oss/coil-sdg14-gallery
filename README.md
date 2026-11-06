# COIL – SDG 14: Life Below Water

Ta mapa vsebuje prilagojeno predlogo interaktivne spletne galerije za **14. cilj trajnostnega razvoja (SDG 14 – Life Below Water)**. Tema projekta je **onesnaževanje oceanov s plastiko**.

> Pomembno: po navodilih iz izvirne predloge mora biti končna spletna stran v angleščini. Besedila na strani so zato pripravljena v angleščini; ta README vsebuje navodila v slovenščini.

## Kaj je že pripravljeno?
- naslovnica za SDG 14;
- razlaga problema onesnaževanja morja s plastiko;
- galerija z 12 vzorčnimi ilustracijami in filtri;
- povečevanje fotografij v galeriji;
- interaktivno križanko z izrazi, povezanimi s SDG 14;
- demonstracijska anketa z grafičnim prikazom rezultatov;
- predlogi rešitev in dejanj;
- časovnica nastajanja projekta;
- ločena predstavitev dijaka A in dijaka B;
- mesta za oba predstavitvena videa in video o nastajanju projekta;
- odziven prikaz za telefon in računalnik.

## 1. Fotografije – obvezno
V mapi `assets/images/` zamenjajta vzorčne datoteke `sample-01.svg` do `sample-12.svg` s svojimi fotografijami. Predlagana imena:
- dijak A: `student-a-01.jpg` do `student-a-06.jpg`;
- dijak B: `student-b-01.jpg` do `student-b-06.jpg`.

Nato v `gallery-data.js` popravita `src`, naslov, opis in avtorja pri vsaki fotografiji. Ohranita najmanj 6 originalnih fotografij na dijaka. Vzorčne ilustracije niso fotografije in ne štejejo v obvezno kvoto.

## 2. Razdelitev dela
| Dijak A | Dijak B |
|---|---|
| Pripravi uvodno predstavitev SDG 14. | Pripravi raziskani opis onesnaževanja oceanov s plastiko. |
| Prispeva najmanj 6 lastnih fotografij. | Prispeva najmanj 6 lastnih fotografij. |
| Uredi naslovnico in prvi del galerije. | Uredi drugi del galerije in zaključek. |
| Sodeluje pri interaktivni vsebini in testiranju. | Sodeluje pri interaktivni vsebini in testiranju. |
| Doda svoj predstavitveni video. | Doda svoj predstavitveni video. |

Skupaj načrtujta videz strani, preverita kviz, anketo, filtre, fotografije in mobilni prikaz.

## 3. Videoposnetki
V `index.html` poiščita mesta `Project video`, `Introduction video A` in `Introduction video B`. Zamenjajta nadomestne bloke z vdelavo videa. Za YouTube uporabita URL za embed, na primer:

```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
        title="Student A introduction" loading="lazy"
        allowfullscreen></iframe>
```

Za lokalni MP4 lahko uporabita:

```html
<video controls preload="metadata">
  <source src="assets/videos/student-a.mp4" type="video/mp4">
</video>
```

Datoteke dodajta v `assets/videos/`. Video naj bo optimiziran, da ni prevelik.

## 4. Prilagoditev vsebine
- V `index.html` dodajta imeni, lokalne primere, zaključek in vire.
- V `gallery-data.js` vnesita svojih 12 fotografij in opise. Trenutne slike so AI-generirane ilustracije za predogled; ne štejejo kot vajine originalne fotografije.
- Križanka je že pripravljena v `index.html`; odgovore in namige lahko uredita v vrsticah z razredom `crossword-entry`.
- Anketa je demonstracijska: glasovi se shranjujejo samo v trenutnem brskalniku (`localStorage`), ne pa skupno za vse obiskovalce.
- V `style.css` lahko spremenita barve in oblikovanje.

## 5. GitHub – sodelovanje v paru
1. Dijak A ustvari javni (*Public*) repozitorij.
2. Naloži vsebino te mape, tako da je `index.html` neposredno v korenu repozitorija.
3. V `Settings → Collaborators` povabi dijaka B.
4. Dijak B sprejme povabilo.
5. Vsak lahko dela v svoji veji (*branch*) in spremembe pošlje prek *Pull Requesta*.
6. Skupaj pregledata in združita spremembe (*Merge*).

## 6. GitHub Pages
V repozitoriju odprite `Settings → Pages`. Pri *Build and deployment* izberite:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/(root)`

Kliknite **Save**. Počakajta nekaj minut. Stran bo običajno dosegljiva na `https://UPORABNIK.github.io/IME-REPOZITORIJA/`.

## 7. Končni pregled pred oddajo
- [ ] Stran je v angleščini.
- [ ] Tema in vsebina se nanašata na SDG 14.
- [ ] Dijak A je dodal vsaj 6 svojih fotografij.
- [ ] Dijak B je dodal vsaj 6 svojih fotografij.
- [ ] V galeriji so pravilni naslovi, opisi in avtorji.
- [ ] Dodana sta oba predstavitvena videa.
- [ ] Dodan je video o nastajanju projekta, če ga zahtevajo navodila.
- [ ] Kviz, anketa, filtri in povečevanje slik delujejo.
- [ ] Stran je preizkušena na telefonu in računalniku.
- [ ] Dodani so zanesljivi viri.

## Viri za raziskovanje
- UN SDG 14: https://sdgs.un.org/goals/goal14
- UN – Life Below Water: https://www.un.org/sustainabledevelopment/oceans/
- NOAA Marine Debris: https://marinedebris.noaa.gov/
