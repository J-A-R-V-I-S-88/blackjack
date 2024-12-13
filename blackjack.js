/* This file runs blackjack
This game will be a hit-17 game, resplit aces, double down on any first two cards
single deck (for now), dealer checks for blackjacks on aces and tens (pays 3 to 2??)
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
console.log(shuffledDeck);
// Shuffled deck, but all letters are changed to numbers:
const shuffledNumbers = [];
for(let i = 0; i < 52; i++){
    function faceCardValues(card){
        if(card.charAt(0) === "A"){
            return "1" + card.charAt(1);
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
}
console.log(shuffledNumbers);
// Shuffled deck, but with no suits
const noSuits = []
function removeSuits(card){
    return card.slice(0,-1);
}
for(i = 0; i < 52; i++){
    noSuits[i] = removeSuits(shuffledNumbers[i])
}
const playerHand = [shuffledDeck[0], shuffledDeck[2]];
const playerHandRaw = [noSuits[0], noSuits[2]];
const dealerHand = [shuffledDeck[1], " █"];
const dealerHandRaw = [noSuits[1]];
function addArrayElements(inputArray){
    let total = 0
    for(i = 0; i < inputArray.length; i++){
        total += Number(inputArray[i]);
    }
    return total;
} // addArrayElements() adds the elements in an array (assuming each element is an integer)
// A game with no aces uses the hard total. A game with aces uses both.
let hardTotal = addArrayElements(playerHandRaw);
let softTotal = hardTotal - 10;
function getDecision(){
    return prompt(
        `Please type your decision. You may hit or stand:
        Dealer's hand: ${dealerHand}, (${dealerHandRaw})
        Your hand: ${playerHand}, (${hardTotal})`
        ).trim().toLowerCase();
}
let ply = 4;
let decision;
hardTotal = addArrayElements(playerHandRaw);
let bust = true
while(bust == true){
    decision = getDecision();
    if(decision == "hit"){
        hardTotal += Number(noSuits[ply]);
        playerHand.push(shuffledDeck[ply]);
        ply++;
        if(hardTotal == 21){
            alert(hardTotal);
        } else if(hardTotal < 21){
            continue;
        } else if(hardTotal > 21){
            alert(`${hardTotal}. Bust.`);
        }
    } else if(decision == "stand"){
        dealerHand.push(shuffledDeck[3]);
        dealerHandRaw.push(noSuits[3]);
        removeFromArray(dealerHand, " █")
        dealerHardTotal = addArrayElements(dealerHandRaw);
            while(dealerHardTotal < 17){
                dealerHand.push(shuffledDeck[ply]);
                dealerHandRaw.push(noSuits[ply]);
                dealerHardTotal = addArrayElements(dealerHandRaw);
                ply++
        }
            if(dealerHardTotal > 21){
                alert(
                    `${dealerHardTotal}. Dealer busts. You win!
                    ${dealerHand}, (${dealerHardTotal})
                    ${playerHand}, (${hardTotal})`
                )
            } else if(dealerHardTotal == 21){
                if(dealerHardTotal == hardTotal){
                alert(
                    `21. Dealer Stands. Push.
                    ${dealerHand}, (${dealerHardTotal})
                    ${playerHand}, (${hardTotal})`)
                } else {
                alert(
                    `21. Dealer Stands. You lose.
                    ${dealerHand}, (${dealerHardTotal})
                    ${playerHand}, (${hardTotal})`
                )
                }
            } else if(dealerHardTotal < 21){
                if(dealerHardTotal == hardTotal){
                alert(`${dealerHardTotal}. Dealer stands. Push.
                    ${dealerHand}, (${dealerHardTotal})
                    ${playerHand}, (${hardTotal})`)
                } else if(dealerHardTotal > hardTotal){
                alert(`${dealerHardTotal}. Dealer stands. You lose.
                    ${dealerHand}, (${dealerHardTotal})
                    ${playerHand}, (${hardTotal})`)
                } else {
                alert(
                    `${dealerHardTotal}. Dealer stands. You win.
                    ${dealerHand}, (${dealerHardTotal})
                    ${playerHand}, (${hardTotal})`
                )
                }
            }
        break;
    }
}