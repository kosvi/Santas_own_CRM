# Santa's own CRM

## Käynnissä olevat versiot

[Tämän linkin](https://santas-crm.codecache.eu/) takaa löytyy ajosta viimeisin Docker Hub -kuva sovelluksesta. Kuva perustuu master-haaran viimeisimpään versioon. ("tuotantoversio", eli reset ei toimi)

[Tämän linkin](https://glacial-shore-58496.herokuapp.com/) takaa löytyy Herokussa käynnissä oleva Docker-kuva. Kuva perustuu release-haaran viimeisimpään versioon. (Suositeltu testaamiseen, mahdollinen resetoida)

## Tuntikirjanpito

[Tuntikirjanpito](spend_hours.md) on toteutettu "sprintteinä" linkin takana olevassa tiedostossa. Eteneminen oli huomattavasti hitaampaa kuin olin arvioinut, koska TypeScriptin valinta kieleksi
aiheutti yllättäviä hidasteita ja toisaalta työvälineeni olivat surkeat (ei edes FullHD-näyttöä). Lisäksi tein töitä lyhyissä pätkissä aina, kun löysin jostain aikaa, jolloin työ keskeytyi
aina juuri vauhtiin päästessä ja näin "flow" jäi hyödyntämättä. 

## Käyttöohjeet

Sovellus toimitetaan Docker Hubin kautta kuvana, jonka käyttöönotto on sangen suoraviivaista. Repositoriossa löytyy myös tiedostot, joiden pohjalta sekä Docker Hubin että Herokun kuvat on 
rakennettu. Näitä tiedostoja ja [README](../README.md):ssa lueteltuja ympäristömuuttujia avuksi käyttäen on mahdollista rakentaa myös oma kuva sovelluksesta. 

Repositoriossa on myös useampi tiedosto, jotka määrittelevät docker-composen avulla suoritettavan suoritusympäristön tietokantoineen päivineen. Näistä on mahdollista laatia halutessaan myös
oma versio, jonka avulla suorittaa sovellus paikallisesti. 



Käyttöliittymät eivät ole erikoisalaani, joten en tässä projektissa edes yrittänyt lähteä rakentamaan näyttävää käyttöliittymää, vaan pidin sen yksinkertaisena mustavalkoisena. Myöskään intuiiviset
käyttöliittymät eivät ole ikinä itseltäni onnistuneet, joten en nyt keskittynyt siihenkään. [Käyttöohje](guide.md) auttaa tarvittaessa löytämään eri nappulat. Herokussa olevan version
voi halutessaan resetoida polusta [/api/reset](https://glacial-shore-58496.herokuapp.com/api/reset) löytyvän ohjeen mukaan. 

## Testit

Testien kirjoittaminen on ottanut melko paljon aikaa ja loppua kohden jouduin keventämään testikattavuuden tavoittelua, koska halusin saada edes jonkinlaisen toimivan version ulos ennen
tehtävän palautusta. Tästä syystä etenkin frontend-puolen testit ovat hyvin suppeat ja korkeintaan osoittavat, että sellaisia pystyin kirjoittamaan. 

Backend-puolella olen harmissani siitä, että en suunnitellut testausta etukäteen lainkaan. Tästä johtuen (testi)koodissa on rutkasti toistoa, jonka pois jättäminen olisi vapauttanut aikaa
itse projektin kirjoittamiseen. Samoin e2e-testit on tehty vastoin Cypressin ohjeistamia hyviä tapoja ja tässäkin olisi ollut kehittämisen varaa. 

## Yhteenvetoa

Projekti oli opettavainen kokemus, jonka aikana opin uusia asioita etenkin TypeScriptistä. Silti koen monien asioiden olevan todella hankalia TypeScriptin kanssa ja joihinkin asioihin 
en edes ole vielä löytänyt miellyttävää ratkaisua. Tässä on vielä paljon kehittymisen varaa. 

Koodini on paikoin paisunut aika pitkiksi funktioiksi, jolloin niiden luettavuus on päässyt heikentymään. Samoin importit on huonosti organisoitu tiedostojen alussa. Paikoin koodini uhkaa
mennä (ellei jo ole mennyt) spagettikoodiksi, eikä asiaa aina auta verrattain suppea kommentointi. Olen tältä osin kirjoittanut parempaakin koodia kuin tämä projekti. 

Yksi asia mikä yllätti, oli myös se, miten projektin kasvaessa on yhä vaikeampaa hahmottaa kokonaisuutta. Näenkin hyvän suunnittelun yhä tärkeämpänä osana onnistunutta projektia ja 
esimerkiksi frontendin kohdalla projektissani on jäänyt hieman hieman epäselväksi "routejen", hookkien ja servicejen välinen suhde. Tämä olisi pitänyt miettiä paremmin etukäteen valmiiksi, 
jolloin jatkokehitys olisi helpompaa. 
