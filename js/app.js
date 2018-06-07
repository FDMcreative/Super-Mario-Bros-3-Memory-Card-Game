$(() => {
  // console.log('workoddio');

  $cards = $('.cards');
  $card = $('.card');
  $start = $('#start');
  $reset = $('#reset');
  $items = $('#items');
  $wrongs = $('#wrongs');
  $display = $('#display');
  let divIndex = 1;
  var twoPicks = [];
  let i = 0;
  var lost = 0;
  let wrong = 0;
  var yourItems = [];
  let storeDivs = [];



  var deckCards = ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom','mushroom','mushroom', 'star', 'star', 'star', 'star', '1up', '1up', '10-coins','10-coins', '20-coins', '20-coins'];
  // console.log(deckCards);

  var randomNumber = Math.floor(Math.random() * deckCards.length);

  //This Starts the Game
  $start.on('click', () => {

    //This shows the cards
    $cards.css({"display":"block"});

    //This sets the Cards on the Table Randomly
    while (deckCards.length > 0) {

      //This gets a random Element from the card deck and its Index
      randomNumber = Math.floor(Math.random() * deckCards.length);
      randomCard = deckCards[randomNumber];
      var indexArray = deckCards.indexOf(deckCards[randomNumber]);
      // console.log(randomCard, indexArray);

      //removes that Element from the Deck
      deckCards.splice(indexArray, 1);
      // console.log('remaining cards: ' + deckCards);

      //puts that Element inside a Div and advances to the next one
      var div = ('#' + 'card' + divIndex);
      // console.log(div);
      $(div).text(randomCard);
      divIndex++;

    };

    //This Picks a Card
    $cards.children().on('click', (e) => {

      //This removes the ace of spades
      $(e.target).css({"background-image": "none"});
      //This brings the text in the foreground
      $(e.target).css({"text-indent": "1px"});
      //This sets the image
      let url = ('./images/' + $(e.target).text() + '.jpg');
      // console.log(url);
      $(e.target).css({"background-image": "url(" + url + ")"});

      twoPicks[i] = $(e.target).text();
      $(e.target).css({"pointer-events": "none", "background-color":"grey"})

      console.log('twoPicks: ' + twoPicks);
      // console.log(twoPicks[1]);

      //This store that Div inside an Array for a possible reset
      // let x = $(e.target).id;
      // console.log('x: ' + x);
      storeDivs[i] = '#' + $(e.target).attr('id');
      console.log('storeDiv: ' + storeDivs);

      i++;

      //This checks the 2 Cards
      if (twoPicks[1] !== undefined) {
        if (twoPicks[0] === twoPicks[1]) {
          console.log('right');
          yourItems.push(twoPicks[0]);
          $items.text(yourItems);
          twoPicks = [];
          i = 0;
          storeDivs = [];
        }
        else {

          setTimeout(storeDivsReset, 1000);
          //This sets the 2 divs back to original state AND reset storeDivs
          function storeDivsReset () {
            console.log('wrong')
            $(storeDivs[0]).css({"pointer-events": "auto","background-color":"white", "text-indent": "-9999px", "background-image": "url('./images/ace-of-spade.jpg')"});
            $(storeDivs[1]).css({"pointer-events": "auto","background-color":"white", "text-indent": "-9999px", "background-image": "url('./images/ace-of-spade.jpg')"});
            storeDivs = [];
          };

          twoPicks = [];
          i = 0;
          lost++;
          wrong++;
          $wrongs.text(wrong)

        };

        //This checks if 2 lost
        if (lost === 3) {
          console.log('LOSssTTT');
          $display.hide();
          // $('#display').text('You Lost');
          $card.css({"pointer-events":"none"});
          reset();
        }
      }

    });

  })

  // This Resets the Game
  $reset.on('click', () =>{
    reset();
  });

  function reset() {
    //This hides the cards
    $cards.hide();
    //This resets DISPLAY
    $display.show();
    //sets back the ace of spades
    $card.css({ "text-indent": "-9999px", "background-image": "url('./images/ace-of-spade.jpg')" });
    divIndex = 1;
    $card.text('');
    deckCards = ['flower', 'flower', 'flower', 'flower', 'mushroom', 'mushroom','mushroom','mushroom', 'star', 'star', 'star', 'star', '1up', '1up', '10-coins','10-coins', '20-coins', '20-coins'];
    $card.css({"pointer-events": "auto","background-color":"white"});
    $card.off();
    $items.text('');
    console.log('RESeeET');
    $wrongs.text(0)
    wrong = 0;
    lost = 0;
  };

});
