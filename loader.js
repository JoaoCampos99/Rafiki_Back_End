const app = require('./server');
const port = process.env.PORT || 80;
const porthttps = process.env.PORTHTTPS || 81
const http = require('http')
const https = require('https')
const { conn } = require('./mongo_connect')
const { User, userSchema } = require('./app/models/users.model')
const options = {
    
}
const serverHttps = https.createServer(options, app)

const serverHttp = http.createServer(app)
serverHttp.listen(port, () => {
    console.log(`Server http running on port :${port}`);
});

serverHttps.listen()
const arr = [{ "id": 4, "name": "lady.pond", "password": "1111", "email": "possible_chadd@yahoo.com", "exp": 951, "level": 10, "rank": [1, "grande"], "badges": [], "desc": "Again, I always go to sea as a sailor, because they make a point of paying me for my trouble, whereas they never pay passengers a single penny that I ever heard of. On the contrary, passengers themselves must pay. And there is all the difference in the world between paying and being paid. The act of paying is perhaps the most uncomfortable infliction that the two orchard thieves entailed upon us. But _being paid_,—what will compare with it? The urbane activity with which a man receives money is really marvellous, considering that we so earnestly believe money to be the root of all earthly ills, and that on no account can a monied man enter heaven. Ah! how cheerfully we consign ourselves to perdition!", "foto": "https://robohash.org/represent.png?size=300x300", "follow": [9, 10, 4], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 7, "name": "hot.shape.42", "password": "password", "email": "hope5@yahoo.com", "exp": 852, "level": 9, "rank": [2, "A começar"], "badges": [], "desc": "What of it, if some old hunks of a sea-captain orders me to get a broom and sweep down the decks? What does that indignity amount to, weighed, I mean, in the scales of the New Testament? Do you think the archangel Gabriel thinks anything the less of me, because I promptly and respectfully obey that old hunks in that particular instance? Who ain’t a slave? Tell me that. Well, then, however the old sea-captains may order me about—however they may thump and punch me about, I have the satisfaction of knowing that it is all right; that everybody else is one way or other served in much the same way—either in a physical or metaphysical point of view, that is; and so the universal thump is passed round, and all hands should rub each other’s shoulder-blades, and be content.", "foto": "https://robohash.org/morning.png?size=300x300", "follow": [10, 10, 2], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 9, "name": "nervous-leaf", "password": "superadmin", "email": "winifred@outlook.com", "exp": 804, "level": 9, "rank": [3, "A começar"], "badges": [], "desc": "But here is an artist. He desires to paint you the dreamiest, shadiest, quietest, most enchanting bit of romantic landscape in all the valley of the Saco. What is the chief element he employs? There stand his trees, each with a hollow trunk, as if a hermit and a crucifix were within; and here sleeps his meadow, and there sleep his cattle; and up from yonder cottage goes a sleepy smoke. Deep into distant woodlands winds a mazy way, reaching to overlapping spurs of mountains bathed in their hill-side blue. But though the picture lies thus tranced, and though this pine-tree shakes down its sighs like leaves upon this shepherd’s head, yet all were vain, unless the shepherd’s eye were fixed upon the magic stream before him. Go visit the Prairies in June, when for scores on scores of miles you wade knee-deep among Tiger-lilies—what is the one charm wanting?—Water—there is not a drop of water there! Were Niagara but a cataract of sand, would you travel your thousand miles to see it? Why did the poor poet of Tennessee, upon suddenly receiving two handfuls of silver, deliberate whether to buy him a coat, which he sadly needed, or invest his money in a pedestrian trip to Rockaway Beach? Why is almost every robust healthy boy with a robust healthy soul in him, at some time or other crazy to go to sea? Why upon your first voyage as a passenger, did you yourself feel such a mystical vibration, when first told that you and your ship were now out of sight of land? Why did the old Persians hold the sea holy? Why did the Greeks give it a separate deity, and own brother of Jove? Surely all this is not without meaning. And still deeper the meaning of that story of Narcissus, who because he could not grasp the tormenting, mild image he saw in the fountain, plunged into it and was drowned. But that same image, we ourselves see in all rivers and oceans. It is the image of the ungraspable phantom of life; and this is the key to it all.", "foto": "https://robohash.org/necessary.png?size=300x300", "follow": [10, 4, 7], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 8, "name": "withered-breeze", "password": "zzzz", "email": "est_demetrius@hotmail.com", "exp": 792, "level": 8, "rank": [4, "A começar"], "badges": [], "desc": "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.", "foto": "https://robohash.org/friend.png?size=300x300", "follow": [2, 5, 3], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 5, "name": "shy-wildflower", "password": "123456", "email": "jaylan@gmail.com", "exp": 759, "level": 8, "rank": [5, "A começar"], "badges": [], "desc": "No, when I go to sea, I go as a simple sailor, right before the mast, plumb down into the forecastle, aloft there to the royal mast-head. True, they rather order me about some, and make me jump from spar to spar, like a grasshopper in a May meadow. And at first, this sort of thing is unpleasant enough. It touches one’s sense of honor, particularly if you come of an old established family in the land, the Van Rensselaers, or Randolphs, or Hardicanutes. And more than all, if just previous to putting your hand into the tar-pot, you have been lording it as a country schoolmaster, making the tallest boys stand in awe of you. The transition is a keen one, I assure you, from a schoolmaster to a sailor, and requires a strong decoction of Seneca and the Stoics to enable you to grin and bear it. But even this wears off in time.", "foto": "https://robohash.org/itaque.png?size=300x300", "follow": [6, 8, 10], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 10, "name": "hearty-sky", "password": "12345", "email": "send_isac@gmail.com", "exp": 582, "level": 6, "rank": [6, "A começar"], "badges": [], "desc": "There now is your insular city of the Manhattoes, belted round by wharves as Indian isles by coral reefs—commerce surrounds it with her surf. Right and left, the streets take you waterward. Its extreme downtown is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. Look at the crowds of water-gazers there.", "foto": "https://robohash.org/sun.png?size=300x300", "follow": [6, 4, 8], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 1, "name": "young-glitter-24", "password": "1234", "email": "neque_jerome@hotmail.com", "exp": 441, "level": 5, "rank": [7, "A começar"], "badges": [], "desc": "But look! here come more crowds, pacing straight for the water, and seemingly bound for a dive. Strange! Nothing will content them but the extremest limit of the land; loitering under the shady lee of yonder warehouses will not suffice. No. They must get just as nigh the water as they possibly can without falling in. And there they stand—miles of them—leagues. Inlanders all, they come from lanes and alleys, streets and avenues—north, east, south, and west. Yet here they all unite. Tell me, does the magnetic virtue of the needles of the compasses of all those ships attract them thither?", "foto": "https://robohash.org/step.png?size=300x300", "follow": [5, 7, 4], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 2, "name": "morning-mountain", "password": "lol", "email": "list@outlook.com", "exp": 204, "level": 3, "rank": [8, "A começar"], "badges": [], "desc": "Though I cannot tell why it was exactly that those stage managers, the Fates, put me down for this shabby part of a whaling voyage, when others were set down for magnificent parts in high tragedies, and short and easy parts in genteel comedies, and jolly parts in farces—though I cannot tell why this was exactly; yet, now that I recall all the circumstances, I think I can see a little into the springs and motives which being cunningly presented to me under various disguises, induced me to set about performing the part I did, besides cajoling me into the delusion that it was a choice resulting from my own unbiased freewill and discriminating judgment.", "foto": "https://robohash.org/tempora.png?size=300x300", "follow": [8, 4, 3], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 3, "name": "willy-wood", "password": "guest", "email": "quibusdam8@gmail.com", "exp": 170, "level": 2, "rank": [9, "A começar"], "badges": [], "desc": "By reason of these things, then, the whaling voyage was welcome; the great flood-gates of the wonder-world swung open, and in the wild conceits that swayed me to my purpose, two and two there floated into my inmost soul, endless processions of the whale, and, mid most of them all, one grand hooded phantom, like a snow hill in the air.", "foto": "https://robohash.org/blanditiis.png?size=300x300", "follow": [3, 3, 4], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }, { "id": 6, "name": "princess-wave", "password": "customer", "email": "eligendi@outlook.com", "exp": 158, "level": 2, "rank": [10, "A começar"], "badges": [], "desc": "Chief among these motives was the overwhelming idea of the great whale himself. Such a portentous and mysterious monster roused all my curiosity. Then the wild and distant seas where he rolled his island bulk; the undeliverable, nameless perils of the whale; these, with all the attending marvels of a thousand Patagonian sights and sounds, helped to sway me to my wish. With other men, perhaps, such things would not have been inducements; but as for me, I am tormented with an everlasting itch for things remote. I love to sail forbidden seas, and land on barbarous coasts. Not ignoring what is good, I am quick to perceive a horror, and could still be social with it—would they let me—since it is but well to be on friendly terms with all the inmates of the place one lodges in.", "foto": "https://robohash.org/wonder.png?size=300x300", "follow": [8, 9, 2], "skill": undefined, "year": undefined, "course": undefined, "upvotes": [], "notifications": [] }]


/**
 * ALALALALALALALALALALALA.....
 * Só corram isto uma vez, se não grava as mesmas coisas
 * mais que uma vez.
 */
// async function a() {
//     for (let us of arr) {

//         let doc = userSchema
//         for (let key in us) { // Andar pelos campos do array
//             if (key != "skill" && key != "level" && key != "badges") {

//                 if (key == "rank") doc[key] = us[key][0]
//                 else if (key == "foto") {
//                     let k = "picture"
//                     doc[k] = us[key]
//                 }
//                 else if (key == "desc") {
//                     let k = "description"
//                     doc[k] = us[key]
//                 }
//                 else if (key == "exp") {
//                     let k = "experience"
//                     doc[k] = us[key]
//                 }
//                 else if (key == "upvotes") {
//                     doc[key] = 0
//                 }
//                 else {
//                     doc[key] = us[key]
//                 }

//             }
//         }
//         console.log(doc)
//         let row = new User(doc)
//         await row.save()
//     }
// }
// a()

/**
 * Undefined é igual a vazio
 * rank[0]
 * experience
 * description
 * picture
 * Not's
 *  level
 *  badges
 *  skill
 */