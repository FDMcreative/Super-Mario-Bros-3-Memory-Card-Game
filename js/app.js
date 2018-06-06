$(() => {
  // console.log('workoddio');

  $cards = $('.cards');
  $card = $('.card');
  $start = $('#start');
  $reset = $('#reset');
  $items = $('#items');
  let divIndex = 1;
  var twoPicks = [];
  let i = 0;
  var lost = 0;
  let wrong = 0;
  var yourItems = [];



  var deckCards = ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom','mushroom','mushroom', 'star', 'star', 'star', 'star', '1up', '1up', '10 coins','10 coins', '20 coins', '20 coins'];
  // console.log(deckCards);

  var randomNumber = Math.floor(Math.random() * deckCards.length);

  //This Starts the Game
  $start.on('click', () => {

    //This removes the ace of spades
    $card.css({"background-image": "none"});

    //This sets the Cards on the Table
    while (deckCards.length > 0) {

      //This gets a random Element from the card deck and its Index
      randomNumber = Math.floor(Math.random() * deckCards.length);
      randomCard = deckCards[randomNumber];
      var indexArray = deckCards.indexOf(deckCards[randomNumber]);
      // console.log(randomCard, indexArray);

      //remove that Element from the Deck
      deckCards.splice(indexArray, 1);
      // console.log('remaining cards: ' + deckCards);

      //put that Element inside a Div and advance to the next one
      var div = ('#' + divIndex);
      // console.log(div);
      $(div).text(randomCard);
      divIndex++;

    };

    //This Picks a Card
    $cards.children().on('click', (e) => {
      twoPicks[i] = $(e.target).text();
      $(e.target).css({"pointer-events": "none", "background-color":"grey"})
      i++;
      console.log(twoPicks);
      console.log(twoPicks[1]);
      //This checks the 2 Cards
      if (twoPicks[1] !== undefined) {
        if (twoPicks[0] === twoPicks[1]) {
          console.log('right');
          yourItems.push(twoPicks[0]);
          $items.text(yourItems);
          twoPicks = [];
          i = 0;
        }
        else {
          console.log('wrong');
          twoPicks = [];
          i = 0;
          lost++;
          wrong++;
          $('#wrongs').text(wrong)
        };

        //This checks if 2 lost
        if (lost === 3) {
          console.log('LOSssTTTT');
          $('#display').text('You Lost');
          $card.css({"pointer-events":"none"});
        }
      }

    });

  })

  // This Resets the Game
  $reset.on('click', () =>{
    divIndex = 1;
    $card.text('');
    deckCards = ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom','mushroom','mushroom', 'star', 'star', 'star', 'star', '1up', '1up', '10 coins','10 coins', '20 coins', '20 coins'];
    $card.css({"pointer-events": "auto","background-color":"white"});
    $card.off();
    $items.text('');
  });

});
