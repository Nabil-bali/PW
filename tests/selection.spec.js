/**
 * 
 * 
page.locator() => Locators are strict. This means that all operations on locators that imply some target DOM element will throw an exception if more than one element matches.
css
xpath
hasText
...
nth()
first()
last()
locator(“tag”).all() : pour plusieurs éléments
-il y a méthodes associées : click, fill types…
-Mécanisme d’attente automatique (auto-waiting, voir le lien)

Autres fonctions de sélections : 
- getByRole
- getByText
- page.$
- page.$$
- ElementHandle (pour des éléments figés dans le temps)
- await page.click('text="Submit"');
- await page.click('button#submit');
- evaluate : await page.evaluate(() => { const element = document.querySelector('selector'); element.click(); });

 */