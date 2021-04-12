document.addEventListener('DOMContentLoaded', nav)

function nav(){
const burger = document.querySelector('.burger');
const nav = document.querySelector('.main-nav');
burger.addEventListener('click', ()=>{
  nav.classList.toggle('show')
})
}

const state = {};
//je déclare une constante vide pour le moment.
const carouselList = document.querySelector('.carousel__list');
//j'établie une constante qui correspond à carousel list
const carouselItems = document.querySelectorAll('.carousel__item');

const elems = Array.from(carouselItems);
//je fais un tableau avec mes items du caroussel


carouselList.addEventListener('click', function (event) {
  //je fais en sorte que mon carrousel soit à l'écoute du clique.
  var newActive = event.target;
  //je suis la souris vers la cible enfin c est ce que je veux c'est pour ca que j en fais une var pour mon algo.
  var isItem = newActive.closest('.carousel__item');
  //permettra de faire virer l'item le plus proche au centre je suppose.

  if (!isItem || newActive.classList.contains('carousel__item_active')) {
    return;
  };
  
  update(newActive);
});//je veux bien les explication car ces commandes me sont inconnue
//The Logical OR operator ( || ) is an operator that returns its first
//or second operand depending on whether the first is truthy. ...
//This operator uses short-circuiting, meaning if the first expression is truthy,
//then the second expression is not evaluated and the first operand is returned immediately.
//pourquoi ordonner un return je suppose que c'est peut etre pour mettre a jour is item et donc
//permettre a l'animation de continuer à marcher ! surement ca vu le update new active de la fin.

//ahhh non en relisant tt je crois avoir capté 

const update = function(newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  const first = elems.find((elem) => elem.dataset.pos == -2);
  const last = elems.find((elem) => elem.dataset.pos == 2);

  //la je recapte la constante update est une fonction et cette fonction
  //contient plusieurs constante la premiere permettant de capter la valeur ((position)0,-1,1,-2,2)
  //de l'element actif les autres definissent les positions attribuées dans la page mais
  //attention evidemment ! c'est en fonction des datas positions attribuée dans la page html.
  
  current.classList.remove('carousel__item_active');

  //ma fonction va me servir à retirer la class active sur les cards qui ne le sont pas.
  
  [current, prev, next, first, last].forEach(item => {
    var itemPos = item.dataset.pos;

    //ma var item position va permettre de reaffecter à chaque card apres leur mouvement leurs nouvelles positions tooooopppp
    //je suis trop contente j'apprend pleins de choses qu'on avait pas vu en js !

    item.dataset.pos = getPos(itemPos, newActivePos)

    //confirme ce que j'ai ecris au dessus
  });
};

const getPos = function (current, active) {

  //pour finir je cree une fonction me permettant de chopper la position
  //fct qui est une constante s'appliquant sur le parametre courant et celui qui est actif
  const diff = current - active;
  //j'établi une constante correspondant à la différence entre la card current et active.
  //la j'avoue c'est encore flou je comprend pas trop comment en faisant ca le pc a la position
  //ahhhh si je viens de capter !!!

  //en gros la valeur de la card que j'ai current moins la active que j'ai selectionné
  //par exemple je suis a la position current (0) puis je selectionne la card avec la
  //premiere card. j'aurais donc la difference 0-2 = -2, l'ordinateur sera alors que j'ai choisi la premiere card et reaffectera cette
  //nouvelle position comme étant la current
  if (Math.abs(current - active) > 2) {
    return -current
  }
  //cas ou je sois en -1 ou 1 (active -2 et 2 par exemple)
  //alors on changera le signe de courant ce qui est logique
  //en soit car le 3 n'existe pas comme position et je
  //suis effectivement en position un si je me decale de 2 positions
  //meme principe pour les cas similaire ^^
  //math abs = valeur absolue doooooonnnc "transforme" les chiffres neg en positif pour les besoin de l'algo

  return diff;
}