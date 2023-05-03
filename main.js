/*
Ricreiamo un feed social aggiungendo al layout di base fornito,
il nostro script JS in cui:

- Milestone 1 - Analizziamo la struttura dati fornita

- Milestone 2 - Prendendo come riferimento il layout di esempio
presente nell'html, stampiamo i post del nostro feed.

- Milestone 3 - Se clicchiamo sul tasto "Mi Piace"
cambiamo il colore al testo del bottone
e incrementiamo il counter dei likes relativo.

- Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.


BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo
con un elemento di fallback che contiene le iniziali dell'utente
(es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post,
se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
*/

const posts = [
	{
		id: 1,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/300?image=171",
		author: {
			name: "Phil Mangione",
			image: "https://unsplash.it/300/300?image=15",
		},
		likes: 80,
		created: "2021-06-25",
	},
	{
		id: 2,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=112",
		author: {
			name: "Sofia Perlari",
			image: "https://unsplash.it/300/300?image=10",
		},
		likes: 120,
		created: "2021-09-03",
	},
	{
		id: 3,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=234",
		author: {
			name: "Chiara Passaro",
			image: "https://unsplash.it/300/300?image=20",
		},
		likes: 78,
		created: "2021-05-15",
	},
	{
		id: 4,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=24",
		author: {
			name: "Luca Formicola",
			image: null,
		},
		likes: 56,
		created: "2021-04-03",
	},
	{
		id: 5,
		content:
			"Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		media: "https://unsplash.it/600/400?image=534",
		author: {
			name: "Alessandro Sainato",
			image: "https://unsplash.it/300/300?image=29",
		},
		likes: 95,
		created: "2021-03-05",
	},
];

// declaring DOM variables
const parentContainer = document.getElementById("container");

createPost(posts[0]);

// FUNCTIONS DEFINITION

function createPost(post) {
	// Create post container
	const postElement = document.createElement("div");
	postElement.className = "post";
	console.log(postElement);
	parentContainer.appendChild(postElement);

	// Create post header
	const postHeader = document.createElement("div");
	postHeader.className = "post__header";
	postElement.appendChild(postHeader);

	// Create post meta
	const postMeta = document.createElement("div");
	postMeta.className = "post-meta";
	postHeader.appendChild(postMeta);

	// Create post meta icon
	const postMetaIcon = document.createElement("div");
	postMetaIcon.className = "post-meta__icon";
	postMeta.appendChild(postMetaIcon);

	// Create profile picture
	const profilePic = document.createElement("img");
	profilePic.className = "profile-pic";
	profilePic.src = post.author.image;
	profilePic.alt = post.author.name;
	postMetaIcon.appendChild(profilePic);

	// Create post meta data
	const postData = document.createElement("div");
	postData.className = "post-meta__data";
	postMeta.appendChild(postData);

	// Create author name
	const authorName = document.createElement("div");
	authorName.className = "post-meta__author";
	authorName.textContent = post.author.name;
	postData.appendChild(authorName);

	// Create time with reverse date
	const time = document.createElement("div");
	time.className = "post-meta__time";
	time.innerHTML = reverseDate(post.created);
	postData.appendChild(time);

	// Create post text
	const postText = document.createElement("div");
	postText.className = "post__text";
	postText.textContent = post.content;
	postElement.appendChild(postText);

	// Create post image
	const postImage = document.createElement("div");
	postImage.className = "post__image";
	postElement.appendChild(postImage);

	// Create image
	const image = document.createElement("img");
	image.src = post.media;
	image.alt = "";
	postImage.appendChild(image);

	// Create post footer
	const postFooter = document.createElement("div");
	postFooter.className = "post__footer";
	postElement.appendChild(postFooter);
}

reverseDate("2023-05-03");
function reverseDate(oldDate) {
	const arrDate = oldDate.split("-");
	const date = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
	return date;
}
