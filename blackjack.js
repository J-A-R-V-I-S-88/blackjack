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
let playerHand = shuffledDeck[0] + ", " + shuffledDeck[2];
let dealerHand = [shuffledDeck[1], " █"];
let playerHandTotal
let playerAceValues
let playerAceSmall
let playerAceBig
let ace
if(playerHand.includes("A") == true){
    playerAceSmall = (Number(shuffledNumbers[0].slice(0,-1)) + Number(shuffledNumbers[2].slice(0,-1)));
    playerAceBig = Number(playerAceSmall) + 10;
    playerAceValues = `${playerAceSmall}` + ` or ${playerAceBig}`
    ace = true
} else {
    playerHandTotal = Number(shuffledNumbers[0].slice(0,-1)) + Number(shuffledNumbers[2].slice(0,-1));
    ace = false
}
let dealerHandTotal = Number(shuffledNumbers[1].slice(0,-1));
function getHumanChoiceAce(){
    if(playerAceBig <= 21){
        prompt(`Please type your option. You may hit or stand.
            Dealer's hand: ${dealerHand} (${dealerHandTotal})
            Your hand: ${playerHand} (${playerAceValues})`)
    } else {
        playerHandTotal = playerAceSmall
        prompt(`Please type your option. You may hit or stand.
            Dealer's hand: ${dealerHand} (${dealerHandTotal})
            Your hand: ${playerHand} (${playerHandTotal})`)
    }
}
function getHumanChoiceHard(){
        prompt(`Please type your option. You may hit or stand.
            Dealer's hand: ${dealerHand} (${dealerHandTotal})
            Your hand: ${playerHand} (${playerHandTotal})`)
}
let ply = 4
while(true){
    if(ace == true){
        getHumanChoice();
    }
}
// let ply = 3
// let ace = false
// let aceTotal
// if(ace == true){
//     ace = true
//     while(playerAceSmall <= 11){
//         if(getHumanChoice() === "hit"){
//             playerAceSmall = playerAceSmall + Number(shuffledNumbers[ply].slice(0,-1));
//             playerAceBig = playerAceBig + Number(shuffledNumbers[ply].slice(0,-1));
//             playerAceValues = `${playerAceSmall}` + ` or ${playerAceBig}`
//             playerHand = playerHand + `, ${shuffledDeck[ply]}`;
//             ply = ply + 1
//         } else {console.log("other")};
//     } if(playerAceSmall >= 11){
//         playerHandTotal = playerAceSmall;
//         ace = false;
//             while(playerHandTotal < 21){
//                 if(getHumanChoice() === "hit"){
//                     playerHandTotal = playerHandTotal + Number(shuffledNumbers[ply].slice(0,-1));
//                     playerHand = playerHand + `, ${shuffledDeck[ply]}`;
//                     ply = ply + 1
//                     if(playerHand.includes("A")){
//                         ace = true;
//                         break
//                     }
//                 }
//                     if(playerHandTotal < 21){

//                     } else if(playerHandTotal == 21){
//                         alert(
//                         `Dealer's hand: ${dealerHand} (${dealerHandTotal})
//                         Your hand: ${playerHand} (${playerHandTotal})`)
//                         continue
//                     } else if(playerHandTotal > 21){
//                         alert(`${playerHandTotal}. Bust.
//                         Dealer's hand: ${dealerHand} (${dealerHandTotal})
//                         Your hand: ${playerHand} (${playerHandTotal})`
//                         )
//                     } else {
//                         alert(
//                         `Dealer's hand: ${dealerHand} (${dealerHandTotal})
//                         Your hand: ${playerHand} (${playerHandTotal})`
//                         )
//                     }
//                 }
//     }
// } else {
//     while(playerHandTotal < 21){
//         if(getHumanChoice() === "hit"){
//             playerHandTotal = playerHandTotal + Number(shuffledNumbers[ply].slice(0,-1));
//             playerHand = playerHand + `, ${shuffledDeck[ply]}`;
//             ply = ply + 1
//             aceTotal = aceTotal + Number(shuffledNumbers[ply].slice(0,-1))
//             if(playerHand.includes("A")){
//                 ace = true;
//                 break
//             }
//         }
//             if(playerHandTotal < 21){
//             continue
//             } else if(playerHandTotal == 21){
//                 alert(
//                 `Dealer's hand: ${dealerHand} (${dealerHandTotal})
//                 Your hand: ${playerHand} (${playerHandTotal})`)
//                 continue
//             } else if(playerHandTotal > 21){
//                 alert(`${playerHandTotal}. Bust.
//                 Dealer's hand: ${dealerHand} (${dealerHandTotal})
//                 Your hand: ${playerHand} (${playerHandTotal})`
//                 )
//             } else {
//                 alert(
//                 `Dealer's hand: ${dealerHand} (${dealerHandTotal})
//                 Your hand: ${playerHand} (${playerHandTotal})`
//                 )
//             }
//         }
//     }