/* This file runs blackjack
This game will be a hit-17 game, resplit aces, double down on any first two cards
single deck (for now), dealer checks for blackjacks on aces and tens (pays 3 to 2??)
No insurance.
*/
// orderedDeck is a collection of 52 cards, organised by rank
/* Without suits:
    "A","A","A","A",
    "2","2","2","2",
    "3","3","3","3",
    "4","4","4","4",
    "5","5","5","5",
    "6","6","6","6",
    "7","7","7","7",
    "8","8","8","8",
    "9","9","9","9",
    "T","T","T","T",
    "J","J","J","J",
    "Q","Q","Q","Q",
    "K","K","K","K",
*/
/* With letter suits:
    "AS","AH","AC","AD",
    "2S","2H","2C","2D",
    "3S","3H","3C","3D",
    "4S","4H","4C","4D",
    "5S","5H","5C","5D",
    "6S","6H","6C","6D",
    "7S","7H","7C","7D",
    "8S","8H","8C","8D",
    "9S","9H","9C","9D",
    "TS","TH","TC","TD",
    "JS","JH","JC","JD",
    "QS","QH","QC","QD",
    "KS","KH","KC","KD",
*/
while(true){ // Allows for the game to be replayed continuously.
const orderedDeck = [
    "A♠","A♥","A♣","A♦",
    "2♠","2♥","2♣","2♦",
    "3♠","3♥","3♣","3♦",
    "4♠","4♥","4♣","4♦",
    "5♠","5♥","5♣","5♦",
    "6♠","6♥","6♣","6♦",
    "7♠","7♥","7♣","7♦",
    "8♠","8♥","8♣","8♦",
    "9♠","9♥","9♣","9♦",
    "T♠","T♥","T♣","T♦",
    "J♠","J♥","J♣","J♦",
    "Q♠","Q♥","Q♣","Q♦",
    "K♠","K♥","K♣","K♦",
];
// Suits (may be unnecessary): ♠ ♥ ♣ ♦
// RemoveFromArray was taken directly from arrayAndLoopPractice:
function removeFromArray(inputArray, removed){
    inputArray.push(removed)
    let indexRemoved = inputArray.indexOf(removed)
    for(i = indexRemoved; i < inputArray.length; i++){
        let temp = inputArray[indexRemoved]
        temp = inputArray[i + 1]
        inputArray[i] = temp
    }
    inputArray.pop(inputArray[inputArray.length])
    inputArray.pop(inputArray[inputArray.length])
    return inputArray
};
// Generates a random integer between 0 and number (Using 51: indicies of orderedDeck):
function randomInteger(number){
    return Math.floor(Math.random() * number)
};
// Creates a random variation of the ordered deck:
const shuffledDeck = [];
for(let i = 0; i < 52; i++){
    let randomIndex = randomInteger(51 - i)
    shuffledDeck[i] = orderedDeck[randomIndex];
    removeFromArray(orderedDeck, orderedDeck[randomIndex]);
};
// Shuffled deck, but all letters are changed to numbers:
const shuffledNumbers = [];
for(let i = 0; i < 52; i++){
    function faceCardValues(card){
        if(card.charAt(0) === "A"){
            return "11" + card.charAt(1);
        } else if(
            (card.charAt(0) === "K") ||
            (card.charAt(0) === "Q") ||
            (card.charAt(0) === "J") ||
            (card.charAt(0) === "T")
        ){
            return "10" + card.charAt(1);
        } else {
            return card;
        }
    }
    shuffledNumbers[i] = faceCardValues(shuffledDeck[i]);
} // faceCardValues() assigns numerical values to each letter card. Aces are 11 by default.
function acesLow(indexOn, array){
    for(let i = indexOn; i < 52; i++){
        if(array[i] == ("11")){
            array[i] = "1";
        } else {
            array[i] = array[i];
        }
    } return array;
}
// Shuffled deck, but with no suits
const noSuits = []
function removeSuits(card){
    return card.slice(0,-1);
}
for(i = 0; i < 52; i++){
    noSuits[i] = removeSuits(shuffledNumbers[i])
}
const noSuitsDealer = [] // This is primarily to reset the dealer's ace values when drawing.
for(i = 0; i < 52; i++){
    noSuitsDealer[i] = removeSuits(shuffledNumbers[i])
}
const playerHand = [shuffledDeck[0], shuffledDeck[2]]; // Visual display of player's hand
const playerHandRaw = [noSuits[0], noSuits[2]]; // Invisible display of player's hand, numerically. Used for calculations
const dealerHand = [shuffledDeck[1], " █"]; // Visual display of dealer's hand
const dealerHandRaw = [noSuits[1]]; // Invisible display of dealer's hand, numerically. Used for calculations
const dealerPreHand = [shuffledDeck[1], shuffledDeck[3]]; // Dealer's actual hand. Revealed later.
const dealerPreHandRaw = [noSuits[1], noSuits[3]]; // Invisible display of dealer's hand, numerically. Used for calculations
function addArrayElements(inputArray){
    let total = 0
    for(i = 0; i < inputArray.length; i++){
        total += Number(inputArray[i]);
    }
    return total;
} // addArrayElements() adds the elements in an array (assuming each element is an integer)
// A game with no aces uses the hard total. A game with aces uses both.
let hardTotal = addArrayElements(playerHandRaw);
let softTotal;
let grandTotal = `${hardTotal - 10} or ${hardTotal}`
let aceReverted;
function softAceDecider(hand, runningTotal){
    let score
    if(aceReverted !== true){
        if(hand.includes("A♠") || hand.includes("A♥") || hand.includes("A♣") || hand.includes("A♦")){
        score = runningTotal - 10;
        } else {
            score = runningTotal;
        }
    } else {
        score = runningTotal;
    }
    return score;
} /* softAceDecider() will determine whether an ace is worth 1 point of 11 points towards a given score
    (designed to be flexible to player and dealer's score). */
function getDecision(){
    if(addArrayElements(playerHandRaw) == 22){ // Specifies case in which player gets two aces
        acesLow(1, playerHandRaw);
        hardTotal -= 10;
        grandTotal = `${hardTotal - 10} or ${hardTotal}`;
        return prompt(`Please type your decision. You may hit or stand:
            Dealer's hand: ${dealerHand}, (${dealerHandRaw})
            Your hand: ${playerHand}, (${grandTotal})`
            ).trim().toLowerCase();
    } else if((playerHand.includes("A♠") || playerHand.includes("A♥") || playerHand.includes("A♣") || playerHand.includes("A♦")) && (aceReverted !== true)){
        return prompt(
            `Please type your decision. You may hit or stand:
            Dealer's hand: ${dealerHand}, (${dealerHandRaw})
            Your hand: ${playerHand}, (${grandTotal})`
            ).trim().toLowerCase();
    } else {
        return prompt(
            `Please type your decision. You may hit or stand:
            Dealer's hand: ${dealerHand}, (${dealerHandRaw})
            Your hand: ${playerHand}, (${hardTotal})`
            ).trim().toLowerCase();
    }
}
// getDecision() determines whether the player hits or stands.
// End of functions. Game loop:
let ply = 4; // ply refers to the number of cards taken (taken from the similar idea of a "ply" in chess.)
let decision;
hardTotal = addArrayElements(playerHandRaw);
let bust = true /* This variable is used for the sole purpose of allowing for continuous playing without refreshing the page.
    By changing bust to false after every hand, bust effectively acts as a continue command for the entire massive loop. */
let twentyOnePlayer
let dealerPreTotal = addArrayElements(dealerPreHandRaw);
while(bust == true){
    acesLow(noSuits.indexOf("11") + ply - 1, noSuits) /* acesLow() is being used to replace all aces past the first one with a value of 1
    This is because any ace after the first cannot add a value of 11 without causing a bust. */
    grandTotal = `${hardTotal - 10} or ${hardTotal}`; // grandTotal exists specifically to allow the score to write the two possible scores with an ace
    // Specific cases will be notated depending on if the player busts or stands, if the dealer busts or stands, and who wins.
    if((hardTotal == 21) && (playerHand.length == 2)){ // If player has blackjack
        if(addArrayElements(dealerPreHandRaw) == 21){ // Player blackjack, dealer blackjack - Push
            alert(
                `Both you and the dealer have blackjack. Push.
                Dealer's hand: ${dealerPreHand} (${dealerPreTotal})
                Your hand: ${playerHand}, (${hardTotal})`);
                bust = false
            break;
        } else { // Player blackjack, dealer has no blackjack - Player wins
            alert(
                `Blackjack! You win.
                Dealer's hand: ${dealerPreHand} (${dealerPreTotal})
                Your hand: ${playerHand}, (${hardTotal})`);
                bust = false
            break;
        }
    }
    if((dealerPreTotal == 21) && (dealerHand.length == 2)){ // If dealer has blackjack - Dealer wins (code above already covered blackjack for blackjack)
        alert(
            `Dealer blackjack. You lose.
            Dealer's hand: ${dealerPreHand} (${dealerPreTotal})
            Your hand: ${playerHand}, (${hardTotal})`);
            bust = false
    }
    if(twentyOnePlayer !== true){ // Checks if player has a score of 21 (not necessarily a natural 21). Forces stand if so
        decision = getDecision();
    } else {
        decision = "stand"
    }
    if(decision == "hit"){ // Code that runs if player hits
        playerHand.push(shuffledDeck[ply]); // Adds next card to player's visual display of hand
        playerHandRaw.push([ply]); // Adds next card to player's numerical invisible display of hand
        if((aceReverted !== true) && (hardTotal < 21)){ /* If an ace has not been redefined at 1, and if the player has not busted,
            simply increase the total by the score of the next card. */
            hardTotal += Number(noSuits[ply]);
        } else if((aceReverted == true) && (hardTotal + Number(noSuits[ply]) > 21)){ // Player ace is 1, player busts - Dealer wins
            alert(`${hardTotal + Number(noSuits[ply])}. Bust.
                Dealer's hand: ${dealerPreHand}, (${addArrayElements(dealerHandRaw)})
                Your hand: ${playerHand}, (${hardTotal + Number(noSuits[ply])})`
            );
            bust = false
            break;
        } else if((aceReverted == true) && (hardTotal + Number(noSuits[ply] < 21))){ // Player ace is 1, player draws
            hardTotal += Number(noSuits[ply]);
            softTotal += Number(noSuits[ply]);
        }
        softTotal = softAceDecider(playerHand, hardTotal); /* Determines whether the soft total should be equal to the hard total or not
        depending on if there is an ace. */
        ply++; // Increasing the ply by 1 to prepare for the next card
        if(hardTotal == 21){ // Another check for a 21 from the player
            twentyOnePlayer = true;
            continue;
        } else if(hardTotal < 21){
            continue;
        } else if(hardTotal > 21 && softTotal > 21){ // If the player busts both their hard and soft total
            alert(
                `${hardTotal}. Bust.
                Dealer's hand: ${dealerPreHand} (${addArrayElements(dealerPreHandRaw)})
                Your hand: ${playerHand} (${hardTotal})`
            );
            bust = false
            break;
        } else if(hardTotal > 21 && softTotal < 21){ // If the player busts their hard total but not their soft total
            if(aceReverted == true){
                continue;
            } else {
                aceReverted = true;
                hardTotal = softTotal;
                continue;
            }
        }
    } else if(decision == "stand"){ // Code that runs if the player stands
        for(let i = 0; i < 52; i++){
            function faceCardValues(card){
                if(card.charAt(0) === "A"){
                    return "11" + card.charAt(1);
                } else if(
                    (card.charAt(0) === "K") ||
                    (card.charAt(0) === "Q") ||
                    (card.charAt(0) === "J") ||
                    (card.charAt(0) === "T")
                ){
                    return "10" + card.charAt(1);
                } else {
                    return card;
                }
            }
            shuffledNumbers[i] = faceCardValues(shuffledDeck[i]); // This operation is rerun because of the acesLow() function previously run
        }
        dealerHand.push(shuffledDeck[3]); // Adds next card to dealer's visual display of hand
        dealerHandRaw.push(noSuitsDealer[3]); // Adds next card to player's numerical invisible display of hand
        removeFromArray(dealerHand, " █") // Removes black space ("flipping over the downard")
        let dealerHardTotal = addArrayElements(dealerHandRaw); // Recalculates dealer's hand total
            while((dealerHardTotal < 17) || ((dealerHardTotal == 17) && (dealerHandRaw.includes("11") == true))){
                dealerHand.push(shuffledDeck[ply]);
                dealerHandRaw.push(noSuits[ply]);
                dealerHardTotal = addArrayElements(dealerHandRaw);
                ply++
        } // Forces dealer to draw until higher than 17 OR if dealer has soft 17
            if(dealerHardTotal > 21){ // Player stands, dealer busts - Player wins
                alert(
                    `Dealer draws to ${dealerHardTotal} and busts. You win!
                    Dealer's hand: ${dealerHand}, (${dealerHardTotal})
                    Your hand: ${playerHand}, (${hardTotal})`)
                    bust = false
            } else if(dealerHardTotal == 21){ // Dealer draws to 21, player has 21 - Push
                if(dealerHardTotal == hardTotal){
                    alert(
                        `Dealer draws to 21 and stands. Push.
                        Dealer's hand: ${dealerHand}, (${dealerHardTotal})
                        Your hand: ${playerHand}, (${hardTotal})`)
                        bust = false
                } else {
                    alert( // Player stands on < 21, dealer draws to 21 - Dealer wins
                        `Dealer draws to 21 and stands. You lose.
                        Dealer's hand: ${dealerHand}, (${dealerHardTotal})
                        Your hand:${playerHand}, (${hardTotal})`)
                        bust = false
                }
            } else if(dealerHardTotal < 21){ // Dealer stands
                if(dealerHardTotal == hardTotal){ // Player stands on N, dealer stands on N - Push
                    alert(`Dealer draws to ${dealerHardTotal} and stands. Push.
                        Dealer's hand: ${dealerHand}, (${dealerHardTotal})
                        Your hand: ${playerHand}, (${hardTotal})`)
                        bust = false
                } else if(dealerHardTotal > hardTotal){ // Player stands on N, dealer stands > N - Dealer wins
                    alert(`Dealer draws to ${dealerHardTotal} and stands. You lose.
                        Dealer's hand: ${dealerHand}, (${dealerHardTotal})
                        Your hand: ${playerHand}, (${hardTotal})`)
                        bust = false
                } else { // Player stands on N, dealer stands < N - Player wins
                    alert(
                        `Dealer draws to ${dealerHardTotal} and stands. You win!
                        Dealer's hand: ${dealerHand}, (${dealerHardTotal})
                        Your hand: ${playerHand}, (${hardTotal})`)
                        bust = false
                }
            }
        break;
    } else {
        alert("Please type a valid option."); 
    }
}
}